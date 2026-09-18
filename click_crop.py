import cv2
import os
import argparse
import time

# Variabel Global
current_img = None
clone_img = None
pos_dir = ""
neg_dir = ""
CROP_SIZE = 32

def click_and_crop(event, x, y, flags, param):
    global current_img, clone_img
    
    # Deteksi klik kiri (Positif/Laser) atau klik kanan (Negatif/Bukan Laser)
    if event == cv2.EVENT_LBUTTONDOWN or event == cv2.EVENT_RBUTTONDOWN:
        half = CROP_SIZE // 2
        
        # Hitung batas crop (mencegah error jika klik di pinggir gambar)
        x1, y1 = max(0, x - half), max(0, y - half)
        x2, y2 = min(current_img.shape[1], x + half), min(current_img.shape[0], y + half)
        
        crop = current_img[y1:y2, x1:x2].copy()
        if crop.size == 0:
            return
            
        # Pastikan ukurannya persis 32x32 untuk MobileNetV3
        crop = cv2.resize(crop, (CROP_SIZE, CROP_SIZE))
        
        # Buat nama file unik berdasarkan waktu
        filename = f"crop_{int(time.time()*1000)}.jpg"
        
        if event == cv2.EVENT_LBUTTONDOWN:
            filepath = os.path.join(pos_dir, filename)
            cv2.imwrite(filepath, crop)
            print(f"✅ POSITIF (Laser) disimpan: {filepath}")
            color = (0, 255, 0) # Kotak hijau
        elif event == cv2.EVENT_RBUTTONDOWN:
            filepath = os.path.join(neg_dir, filename)
            cv2.imwrite(filepath, crop)
            print(f"❌ NEGATIF (Bukan Laser) disimpan: {filepath}")
            color = (0, 0, 255) # Kotak merah
            
        # Gambar kotak di layar sebagai tanda visual bahwa gambar telah dipotong
        cv2.rectangle(clone_img, (x1, y1), (x2, y2), color, 2)
        cv2.imshow("Interactive Cropper", clone_img)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Alat potong gambar interaktif untuk Dataset AI")
    parser.add_argument('-i', '--input', type=str, default="datasets_real_robot", help="Folder gambar sumber")
    parser.add_argument('-p', '--positive', type=str, default="Data/TrainingSet/positive", help="Folder output positif")
    parser.add_argument('-n', '--negative', type=str, default="Data/TrainingSet/negative", help="Folder output negatif")
    args = parser.parse_args()

    pos_dir = args.positive
    neg_dir = args.negative

    # Buat folder jika belum ada
    os.makedirs(pos_dir, exist_ok=True)
    os.makedirs(neg_dir, exist_ok=True)

    if not os.path.exists(args.input):
        print(f"❌ Error: Folder sumber '{args.input}' tidak ditemukan.")
        exit()

    valid_exts = ('.jpg', '.jpeg', '.png')
    image_list = sorted([os.path.join(args.input, f) for f in os.listdir(args.input) if f.lower().endswith(valid_exts)])

    if not image_list:
        print(f"❌ Tidak ada gambar di dalam folder '{args.input}'")
        exit()

    window_name = "Interactive Cropper"
    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL | cv2.WINDOW_GUI_NORMAL)
    cv2.setMouseCallback(window_name, click_and_crop)

    print("\n✂️  Alat Potong Dataset Aktif!")
    print("👉 KLIK KIRI: Potong sebagai Laser (Positif)")
    print("👉 KLIK KANAN: Potong sebagai Bukan Laser (Negatif)")
    print("👉 N / SPASI: Gambar Selanjutnya")
    print("👉 P: Gambar Sebelumnya")
    print("👉 ESC: Keluar\n")

    img_idx = 0
    while True:
        if img_idx < 0: img_idx = 0
        if img_idx >= len(image_list): img_idx = len(image_list) - 1
        
        current_img = cv2.imread(image_list[img_idx])
        if current_img is None:
            img_idx += 1
            continue
            
        clone_img = current_img.copy()

        # Teks Bantuan
        text = f"Img: {img_idx+1}/{len(image_list)} | Klik KIRI: Positif | Klik KANAN: Negatif"
        cv2.rectangle(clone_img, (5, 5), (650, 40), (0, 0, 0), -1)
        cv2.putText(clone_img, text, (15, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

        cv2.imshow(window_name, clone_img)

        key = cv2.waitKey(0) & 0xFF
        if key == 27: # ESC
            break
        elif key == ord('n') or key == ord(' '):
            img_idx += 1
        elif key == ord('p'):
            img_idx -= 1

    cv2.destroyAllWindows()
    print("Selesai memotong data!")
