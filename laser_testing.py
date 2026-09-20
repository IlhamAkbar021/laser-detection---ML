import cv2
import os
import argparse
import math
from Laser_Detector import Detector 

def merge_close_rects(rects, min_dist=30):
    """
    Fungsi NMS yang sudah diperbaiki untuk membaca format koordinat 
    (xmin, ymin, xmax, ymax) maupun (x, y, w, h).
    """
    merged_centers = []
    for r in rects:
        # Pengecekan format koordinat
        if len(r) == 4:
            val1, val2, val3, val4 = r
            
            # Jika elemen ke-3 (val3) lebih kecil dari koordinat X awal atau ukurannya wajar untuk sebuah lebar
            if val3 < val1 or val3 < 100: 
                cx, cy = val1 + (val3 / 2), val2 + (val4 / 2)
            # Jika elemen ke-3 besar, itu pasti format (xmin, ymin, xmax, ymax)
            else:
                cx, cy = (val1 + val3) / 2, (val2 + val4) / 2
        else:
            cx, cy = r[0], r[1]

        # Logika Penggabungan Jarak (NMS)
        if not merged_centers:
            merged_centers.append((cx, cy))
            continue
        
        is_merged = False
        for i, (mcx, mcy) in enumerate(merged_centers):
            dist = math.hypot(cx - mcx, cy - mcy)
            if dist < min_dist:
                new_cx = (cx + mcx) / 2
                new_cy = (cy + mcy) / 2
                merged_centers[i] = (new_cx, new_cy)
                is_merged = True
                break
        
        if not is_merged:
            merged_centers.append((cx, cy))
            
    return [(int(cx), int(cy)) for cx, cy in merged_centers]

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Test Laser Detector pada sebuah folder secara interaktif")
    parser.add_argument('-i', '--input', type=str, default="datasets_real_robot", help="Folder gambar uji")
    parser.add_argument('-c', '--config', type=str, default="Config/config.json", help="Path ke config.json")
    args = parser.parse_args()

    if not os.path.exists(args.input):
        print(f"❌ Error: Folder '{args.input}' tidak ditemukan.")
        exit()

    valid_exts = ('.jpg', '.jpeg', '.png')
    image_list = sorted([os.path.join(args.input, f) for f in os.listdir(args.input) if f.lower().endswith(valid_exts)])

    if not image_list:
        print(f"❌ Tidak ada gambar di dalam folder '{args.input}'")
        exit()

    # Memuat detector secara otomatis menggunakan nilai dari config.json
    detector = Detector(config_path=args.config)
    
    print(f"\n🚀 AI Laser Tester Aktif!")
    print(f"Memuat {len(image_list)} gambar. Filter diambil dari '{args.config}'...\n")

    window_name = "Laser Detector Results"
    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL | cv2.WINDOW_GUI_NORMAL)

    img_idx = 0
    while True:
        img_idx = max(0, min(img_idx, len(image_list) - 1))
        
        frame = cv2.imread(image_list[img_idx])
        if frame is None:
            img_idx += 1
            continue

        # 1. Jalankan deteksi (mengabaikan gambar hasil bawaan yang menumpuk)
        _, rects = detector.detect(frame)

        # 2. Siapkan kanvas yang bersih dari frame asli
        display_img = frame.copy()

        # 3. Terapkan NMS/Penggabungan Jarak pada koordinat deteksi
        final_laser_centers = merge_close_rects(rects, min_dist=30)

        # 4. Gambar titik hijau tepat di tengah
        for (cx, cy) in final_laser_centers:
            cv2.circle(display_img, (cx, cy), 5, (0, 255, 0), -1)

        # Teks panduan (menampilkan jumlah target setelah disaring NMS)
        text = f"Img: {img_idx+1}/{len(image_list)} | Target: {len(final_laser_centers)} | N: Next | P: Prev | ESC: Keluar"
        cv2.rectangle(display_img, (5, 5), (650, 40), (0, 0, 0), -1)
        cv2.putText(display_img, text, (15, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        cv2.imshow(window_name, display_img)
        
        key = cv2.waitKey(0) & 0xFF
        if key == 27: break # ESC
        elif key in [ord('n'), ord(' ')]: img_idx += 1
        elif key == ord('p'): img_idx -= 1

    cv2.destroyAllWindows()
