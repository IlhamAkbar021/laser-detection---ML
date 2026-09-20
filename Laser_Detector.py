import cv2
import os
import json
import numpy as np
import joblib
import torchvision.models as models
import torchvision.transforms as T
import torch
import copy
from PIL import Image

class Ensemble:
    def __init__(self, param):
        if isinstance(param, str) and os.path.exists(param):
            self.clfs = joblib.load(param)
        elif isinstance(param, list):
            self.clfs = param
        else:
            print(f"⚠️ Warning: Model {param} tidak ditemukan.")
            self.clfs = []

    def predict(self, x):
        if not self.clfs: return -1
        # Menggunakan np.sum untuk menjumlahkan output array dengan aman
        result = np.sum([clf.predict(x) for clf in self.clfs])
        
        # Melonggarkan batas ke >= -1 
        # (Minimal 2 model bilang POSITIF, 3 model bilang NEGATIF = 2 - 3 = -1)
        # Ini akan sangat membantu menangkap laser yang agak redup di kamera
        return 1 if result >= -1 else -1

class Detector:
    def __init__(self, config_path='Config/config.json'):
        if not os.path.exists(config_path):
            raise FileNotFoundError(f"❌ Error: File {config_path} tidak ditemukan!")
            
        with open(config_path, 'r') as f:
            config = json.load(f)

        self.classifier_param = config.get('classifier_param', 'Checkpoint/Ensemble.model')
        self.range_of_filter = config.get('range_of_filter', [])
        self.grad_thresh = config.get('grad_thresh', 50)
        
        args_in_CDBPS = config.get('args_in_CDBPS', {'minVar': 5, 'minRadius': 3, 'maxRadius': 15})
        self.minVar = args_in_CDBPS['minVar']
        # Pastikan minRadius cukup kecil agar sisa pantulan laser redup tidak terbuang
        self.minRadius = args_in_CDBPS['minRadius'] 
        self.maxRadius = args_in_CDBPS['maxRadius']
        
        self.output_is_circle = config.get('output_is_circle', False)
        structure_size = config.get('structure_size', 7)
        self.structure = (structure_size, structure_size)

        self.device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')
        self.model = models.mobilenet_v3_small(weights=models.MobileNet_V3_Small_Weights.DEFAULT)
        self.model.to(self.device)
        self.model.eval()
        self.clf = Ensemble(self.classifier_param)

    def adjust(self, raw_image):
        img = raw_image.astype(np.float32) / 255.0
        hls_img = cv2.cvtColor(img, cv2.COLOR_BGR2HLS)
        hls_img[:, :, 1] = np.power(hls_img[:, :, 1], 3)
        hls_img[:, :, 2] = (1.0 + 100 / 100.0) * hls_img[:, :, 2]
        hls_img[:, :, 2][hls_img[:, :, 2] > 1] = 1
        return (cv2.cvtColor(hls_img, cv2.COLOR_HLS2BGR) * 255).astype(np.uint8)

    def Sobel_preprocess(self, img):
        dx, dy = cv2.Sobel(img, cv2.CV_32F, 1, 0), cv2.Sobel(img, cv2.CV_32F, 0, 1)
        return cv2.convertScaleAbs(cv2.magnitude(dx, dy))

    def combine_Gradient_with_SpecificColor(self, raw_img, grad):
        # Format HLS: Hue, Lightness, Saturation
        hls = cv2.cvtColor(raw_img, cv2.COLOR_BGR2HLS)
        thresh = np.zeros(hls.shape[:2], dtype=np.uint8)
        for temp in self.range_of_filter:
            thresh |= cv2.inRange(hls, np.array(temp['low']), np.array(temp['up']))
            
        thresh = cv2.dilate(thresh, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)), iterations=1)
        return cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, self.structure))

    def Circle_detect(self, img, minRadius, maxRadius):
        result = []
        contours, _ = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        for cnt in contours:
            _, radius = cv2.minEnclosingCircle(cnt)
            if minRadius < radius < maxRadius:
                result.append(cnt)
        return result

    def img_trans(self, img):
        return T.ToTensor()(img).unsqueeze_(0).to(self.device)

    def detect(self, frame):
        img = self.adjust(frame)
        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        preprocessed = self.combine_Gradient_with_SpecificColor(frame, self.Sobel_preprocess(gray_img))
        candidate_regions = self.Circle_detect(preprocessed, self.minRadius, self.maxRadius)
        
        result = frame.copy()
        rects = []
        for region in candidate_regions:
            x, y, w, h = cv2.boundingRect(region)
            new_x, new_y = max(0, x - w), max(0, y - h)
            new_x_, new_y_ = min(frame.shape[1], new_x + 3 * w), min(frame.shape[0], new_y + 3 * h)
            temp = frame[new_y:new_y_, new_x:new_x_].copy()
            
            if temp.size == 0: continue
            
            temp_img = Image.fromarray(cv2.cvtColor(cv2.resize(temp, (32, 32)), cv2.COLOR_BGR2RGB))
            if self.clf.predict(self.model(self.img_trans(temp_img)).cpu().detach().numpy()) == 1:
                rects.append((new_x, new_y, new_x_, new_y_))
                result = cv2.circle(result, (x + (w // 2), y + (h // 2)), 4, (0, 255, 0), -1)
                
        return result, rects

if __name__ == '__main__':
    detector = Detector(config_path='Config/config.json')
    input_path = 'TestSet/TestData/01_0285.jpg'
    if os.path.exists(input_path):
        res, _ = detector.detect(cv2.imread(input_path))
        cv2.imwrite('285_detected.jpg', res)
        print("✅ Deteksi berhasil disimpan!")
