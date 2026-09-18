import cv2
import numpy as np
import torch
import torchvision.models as models
import torchvision.transforms as T
import joblib
import os
import argparse
from PIL import Image

class Classifier:
    def __init__(self, param_path):
        if os.path.exists(param_path):
            self.clfs = joblib.load(param_path)
        else:
            print(f"⚠️ Warning: Model {param_path} tidak ditemukan.")
            self.clfs = []
        
    def predict(self, X):
        if not self.clfs:
            return -1
        # Mengembalikan nilai 1 jika terdeteksi laser, -1 jika bukan
        y_predict = sum(clf.predict(X) for clf in self.clfs)
        return 1 if y_predict > 0 else -1

class Detector:
    def __init__(self, 
                 classifier_param='Checkpoint/Ensemble.model', 
                 network_param_pth='Checkpoint/mobilenet_v3_small.pth', 
                 range_of_filter=None, 
                 grad_thresh=50, 
                 args_in_CDBPS=None, 
                 output_is_circle=False, 
                 structure_size=7,
                 **kwargs):
        
        # Terapkan nilai default HLS terbaik Anda
        if range_of_filter is None:
            range_of_filter = [{'low': [0, 243, 0], 'up': [179, 255, 255]}]
        if args_in_CDBPS is None:
            args_in_CDBPS = {'minVar': 5, 'minRadius': 3, 'maxRadius': 15}

        self.classifier_param = classifier_param
        self.network_param_pth = network_param_pth
        self.range_of_filter = range_of_filter
        self.grad_thresh = grad_thresh
        self.minVar = args_in_CDBPS['minVar']
        self.minRadius = args_in_CDBPS['minRadius']
        self.maxRadius = args_in_CDBPS['maxRadius']
        self.output_is_circle = output_is_circle
        self.structure = (structure_size, structure_size)

        # Setup Device (GPU jika tersedia, jika tidak gunakan CPU)
        self.device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        
        # Muat Backbone MobileNetV3 yang ringan dan cepat
        self.model = models.mobilenet_v3_small(weights=models.MobileNet_V3_Small_Weights.DEFAULT)
        self.model.eval()
        self.model.to(self.device)
        
        # Muat model Ensemble (AdaBoost + LinearSVC) hasil training Anda
        self.clf = Classifier(self.classifier_param)

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
        # Konversi warna ke HLS agar cocok dengan nilai tuning interaktif
        hls = cv2.cvtColor(raw_img, cv2.COLOR_BGR2HLS)
        thresh = np.zeros(hls.shape[:2], dtype=np.uint8)
        for temp in self.range_of_filter:
            low_bound = np.array(temp['low'])
            up_bound = np.array(temp['up'])
            thresh = thresh | cv2.inRange(hls, low_bound, up_bound)
            
        # HACK 1: Tambahkan Dilation untuk menambal cahaya laser yang terbelah garis hitam
        thresh = cv2.dilate(thresh, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)), iterations=1)
        thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, self.structure))
        
        # HACK 2: Abaikan Sobel Gradient, kembalikan thresh murni
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
            
            # HACK 3: Matikan aturan Variance (kebulatan bentuk). Langsung loloskan berdasarkan ukuran!
            if minRadius < radius < maxRadius:
                result.append(contours[i])
        return result
        
    def img_trans(self, img):
        trans = T.ToTensor()
        input_img = trans(img).unsqueeze_(0)
        return input_img.to(self.device)

    def detect(self, frame):
        img = self.adjust(frame)
        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        Sobel = self.Sobel_preprocess(gray_img)
        preprocessed = self.combine_Gradient_with_SpecificColor(frame, Sobel)
        
        candidate_regions = self.Circle_detect(preprocessed, minVar=self.minVar, minRadius=self.minRadius, maxRadius=self.maxRadius)
        
        result = frame.copy()
        rects = []
        for i in range(len(candidate_regions)):
            if self.output_is_circle:
                center, radius = cv2.minEnclosingCircle(candidate_regions[i])
                rects.append((center, radius))
                result = cv2.circle(result, (int(center[0]), int(center[1])), int(radius), (0, 255, 0), -1)
            else:
                x, y, w, h = cv2.boundingRect(candidate_regions[i])
                new_x = max(0, x - w)
                new_y = max(0, y - h)
                new_w = 3 * w
                new_h = 3 * h
                new_x_ = min(frame.shape[1], new_x + new_w)
                new_y_ = min(frame.shape[0], new_y + new_h)
                temp = frame[new_y: new_y_, new_x: new_x_].copy()
                
                # Cegah error jika hasil crop berada di luar batas frame (kosong)
                if temp.size == 0: 
                    continue
                
                temp = cv2.resize(temp, (32, 32))
                temp_img = Image.fromarray(cv2.cvtColor(temp, cv2.COLOR_BGR2RGB)).convert('RGB')
                
                # Ekstrak fitur menggunakan MobileNetV3
                input_tensor = self.img_trans(temp_img)
                output = self.model(input_tensor)
                feature = output.cpu().detach().numpy()
                
                # Gunakan Ensemble Classifier untuk verifikasi final
                if self.clf.predict(feature) == 1:
                    rects.append((new_x, new_y, new_x_, new_y_))
                    
                    # VISUAL FIX: Gambar TITIK BULAT (bukan kotak) tepat di tengah target
                    pusat_x = x + (w // 2)
                    pusat_y = y + (h // 2)
                    result = cv2.circle(result, (pusat_x, pusat_y), 4, (0, 255, 0), -1)
                    
        return result, rects

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Test Laser Detector pada sebuah folder secara interaktif")
    parser.add_argument('-i', '--input', type=str, default="datasets_real_robot", help="Folder berisi gambar uji (default: datasets_real_robot)")
    args = parser.parse_args()

    # Pastikan folder ada
    if not os.path.exists(args.input):
        print(f"❌ Error: Folder '{args.input}' tidak ditemukan.")
        exit()

    # Ambil semua file gambar di dalam folder
    valid_exts = ('.jpg', '.jpeg', '.png')
    image_list = sorted([os.path.join(args.input, f) for f in os.listdir(args.input) if f.lower().endswith(valid_exts)])

    if not image_list:
        print(f"❌ Tidak ada gambar (.jpg, .png) di dalam folder '{args.input}'")
        exit()

    detector = Detector()
    print(f"\n🚀 AI Laser Tester Aktif!")
    print(f"Memuat {len(image_list)} gambar dari '{args.input}'...\n")

    window_name = "Laser Detector Results"
    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL | cv2.WINDOW_GUI_NORMAL)

    img_idx = 0
    while True:
        # Batasi indeks agar tidak kelebihan (Out of bounds)
        if img_idx < 0: img_idx = 0
        if img_idx >= len(image_list): img_idx = len(image_list) - 1
        
        img_path = image_list[img_idx]
        frame = cv2.imread(img_path)
        
        if frame is None:
            print(f"Gagal memuat gambar: {img_path}")
            img_idx += 1
            continue

        # Jalankan AI pendeteksi pada frame
        result_img, rects = detector.detect(frame)

        # Tulis teks panduan di pojok kiri atas
        text = f"Img: {img_idx+1}/{len(image_list)} | Target: {len(rects)} | N: Next | P: Prev | ESC: Keluar"
        
        # Buat background hitam tipis agar teks selalu terbaca terang
        cv2.rectangle(result_img, (5, 5), (650, 40), (0, 0, 0), -1)
        cv2.putText(result_img, text, (15, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        cv2.imshow(window_name, result_img)
        
        # Tunggu respon input keyboard
        key = cv2.waitKey(0) & 0xFF
        if key == 27: # Tekan ESC untuk keluar
            break
        elif key == ord('n') or key == ord(' '): # N atau Spasi untuk gambar selanjutnya
            img_idx += 1
        elif key == ord('p'): # P untuk kembali ke gambar sebelumnya
            img_idx -= 1

    cv2.destroyAllWindows()
    print("Selesai mengecek!")