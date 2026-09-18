import cv2
import os
import numpy as np
import joblib
import torchvision.models as models
import torchvision.transforms as T
import torch
import copy
from PIL import Image


class Ensemble:
    def __init__(self, param):
        if isinstance(param, str):
            if os.path.exists(param):
                self.clfs = joblib.load(param)
            else:
                self.clfs = None
        elif isinstance(param, list):
            self.clfs = param
        else:
            self.clfs = None

    def assign(self, param):
        if isinstance(param, str):
            self.clfs = joblib.load(param)
        elif isinstance(param, list):
            self.clfs = copy.deepcopy(param)
        else:
            raise ValueError("Invalid param! The param must be a string or list!")

    def predict(self, x):
        result = 0
        for clf in self.clfs:
            result += clf.predict(x)
        return np.sign(result)


class Detector:
    def __init__(self, classifier_param, network_param_pth, range_of_filter, grad_thresh, args_in_CDBPS,
                 output_is_circle, structure_size):
        self.device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')
        
        # PERBAIKAN: Menggunakan MobileNetV3 (bukan ResNet50) dan langsung memuat bobot bawaan
        self.model = models.mobilenet_v3_small(weights=models.MobileNet_V3_Small_Weights.DEFAULT)
        self.model.to(self.device)
        self.model.eval()
        
        self.clf = Ensemble(classifier_param)
        self.range_of_filter = range_of_filter
        self.grad_thresh = grad_thresh
        self.minVar = args_in_CDBPS['minVar']
        self.minRadius = args_in_CDBPS['minRadius']
        self.maxRadius = args_in_CDBPS['maxRadius']
        self.output_is_circle = output_is_circle
        self.structure = (structure_size, structure_size)

    def adjust(self, raw_image):
        img = raw_image.astype(np.float32) / 255.0
        hls_img = cv2.cvtColor(img, cv2.COLOR_BGR2HLS)
        gamma = 3
        s = 100
        MAX_VALUE = 100
        hls_img[:, :, 1] = np.power(hls_img[:, :, 1], gamma)
        hls_img[:, :, 2] = (1.0 + s / float(MAX_VALUE)) * hls_img[:, :, 2]
        hls_img[:, :, 2][hls_img[:, :, 2] > 1] = 1
        adjusted_img = cv2.cvtColor(hls_img, cv2.COLOR_HLS2BGR) * 255
        return adjusted_img.astype(np.uint8)

    def Sobel_preprocess(self, img):
        dx = cv2.Sobel(img, cv2.CV_32F, 1, 0)
        dy = cv2.Sobel(img, cv2.CV_32F, 0, 1)
        mag = cv2.magnitude(dx, dy)
        mag = cv2.convertScaleAbs(mag)
        return mag

    def combine_Gradient_with_SpecificColor(self, raw_img, grad):
        # Memastikan konversi warna menggunakan HLS
        hls = cv2.cvtColor(raw_img, cv2.COLOR_BGR2HLS)
        thresh = np.zeros(hls.shape[:2], dtype=np.uint8)
        for temp in self.range_of_filter:
            low_bound = np.array(temp['low'])
            up_bound = np.array(temp['up'])
            thresh = thresh | cv2.inRange(hls, low_bound, up_bound)
            
        # HACK 1: Tambahkan Dilation. 
        # Ini akan "melelehkan" piksel cahaya agar titik laser yang terbelah oleh garis hitam menyatu kembali.
        thresh = cv2.dilate(thresh, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)), iterations=1)
        thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, self.structure))
        
        # HACK 2: Bypass Sobel Gradient sama sekali. 
        # Kita langsung kembalikan gambar hasil filter HLS murni agar tidak ada laser redup yang terhapus.
        return thresh

    def Variance_compute(self, center, contours):
        points = contours.reshape((-1, 2))
        distance = np.linalg.norm(points - center, axis=1)
        variance = np.var(distance)
        return variance

    def Circle_detect(self, img, minVar, minRadius, maxRadius):
        result = []
        contours, hierarchy = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        for i in range(len(contours)):
            center, radius = cv2.minEnclosingCircle(contours[i])
            
            # HACK 3: Matikan aturan Variance (kebulatan bentuk).
            # Selama ada cahaya ukurannya sesuai (radius masuk akal), langsung kirim ke AI!
            if minRadius < radius < maxRadius:
                result.append(contours[i])
        return result

    def detect(self, frame):
        img = self.adjust(frame)
        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        Sobel = self.Sobel_preprocess(gray_img)
        preprocessed = self.combine_Gradient_with_SpecificColor(frame, Sobel)
        candidate_regions = self.Circle_detect(preprocessed, minVar=self.minVar, minRadius=self.minRadius,
                                               maxRadius=self.maxRadius)
        result = frame.copy()
        rects = []
        for i in range(len(candidate_regions)):
            if self.output_is_circle:
                center, radius = cv2.minEnclosingCircle(candidate_regions[i])
                rects.append((center, radius))
                result = cv2.circle(result, center, int(radius), (0, 255, 0), -1)
            else:
                x, y, w, h = cv2.boundingRect(candidate_regions[i])
                new_x = max(0, x - w)
                new_y = max(0, y - h)
                new_w = 3 * w
                new_h = 3 * h
                new_x_ = min(frame.shape[1], new_x + new_w)
                new_y_ = min(frame.shape[0], new_y + new_h)
                temp = frame[new_y: new_y_, new_x: new_x_].copy()
                
                # Cegah error jika crop kosong
                if temp.size == 0: continue
                
                temp = cv2.resize(temp, (32, 32))
                temp_img = Image.fromarray(cv2.cvtColor(temp, cv2.COLOR_BGR2RGB)).convert('RGB')
                input = self.img_trans(temp_img)
                output = self.model(input)
                feature = output.cpu().detach().numpy()
                if self.clf.predict(feature) == 1:
                    rects.append((new_x, new_y, new_x_, new_y_))
                    result = cv2.rectangle(result, (new_x, new_y), (new_x_, new_y_), (0, 255, 0), 2)
        return result, rects

    def img_trans(self, img):
        trans = T.ToTensor()
        input_img = trans(img).unsqueeze_(0)
        return input_img.to(self.device)


if __name__ == '__main__':
    detector = Detector(
        classifier_param='Checkpoint/Ensemble.model',
        network_param_pth='Checkpoint/mobilenet_v3_small.pth',
        range_of_filter=[{'low': [0, 137, 216], 'up': [179, 255, 255]}], 
        grad_thresh=50,
        args_in_CDBPS = {'minVar': 15, 'minRadius': 2, 'maxRadius': 25},
        output_is_circle=False,
        structure_size=7
    )
    
    input_path = 'TestSet/TestData/01_0285.jpg'
    output_path = '285_detected.jpg'
    
    if os.path.exists(input_path):
        frame = cv2.imread(input_path)
        result, _ = detector.detect(frame)
        cv2.imwrite(output_path, result)
        print(f"✅ Deteksi berhasil, gambar disimpan di {output_path}")
    else:
        print(f"❌ Error: Gambar uji '{input_path}' tidak ditemukan.")