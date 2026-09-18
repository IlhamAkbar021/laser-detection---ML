import cv2
import numpy as np
import argparse
import os

def nothing(x):
    pass

def tune_color(input_path):
    # Cek apakah input berupa file tunggal atau seluruh folder
    if os.path.isfile(input_path):
        image_list = [input_path]
    elif os.path.isdir(input_path):
        valid_exts = ('.jpg', '.jpeg', '.png')
        image_list = sorted([os.path.join(input_path, f) for f in os.listdir(input_path) if f.lower().endswith(valid_exts)])
    else:
        print(f"❌ Error: Path '{input_path}' tidak ditemukan!")
        return

    if not image_list:
        print(f"❌ Error: Tidak ada gambar di '{input_path}'")
        return

    window_name = "HLS Color Tuner"
    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL | cv2.WINDOW_GUI_NORMAL)
    cv2.resizeWindow(window_name, 700, 450)

    # Buat Trackbar HLS (Nilai bawaan saya set mendekati temuan terbaik Anda)
    cv2.createTrackbar('H Min', window_name, 0, 179, nothing)
    cv2.createTrackbar('L Min', window_name, 200, 255, nothing) 
    cv2.createTrackbar('S Min', window_name, 0, 255, nothing)
    cv2.createTrackbar('H Max', window_name, 179, 179, nothing)
    cv2.createTrackbar('L Max', window_name, 255, 255, nothing)
    cv2.createTrackbar('S Max', window_name, 255, 255, nothing)

    print("🎛️ HLS Color Tuner Interaktif Aktif!")
    print("👉 Geser slider untuk mencari warna.")
    print("👉 Tekan 'N' atau SPASI untuk gambar selanjutnya.")
    print("👉 Tekan 'P' untuk gambar sebelumnya.")
    print("👉 Tekan 'C' untuk cetak kode, atau 'ESC' untuk keluar.\n")

    img_idx = 0
    last_idx = -1
    image = None
    hls_image = None

    while True:
        # Batasi indeks agar tidak error
        if img_idx < 0: img_idx = 0
        if img_idx >= len(image_list): img_idx = len(image_list) - 1

        # Hanya baca file gambar dari disk jika indeksnya berubah (agar slider tidak lag)
        if img_idx != last_idx:
            img_path = image_list[img_idx]
            image = cv2.imread(img_path)
            
            if image is None:
                img_idx += 1
                last_idx = img_idx
                continue

            h, w = image.shape[:2]
            if w > 800:
                image = cv2.resize(image, (800, int(h * (800/w))))

            hls_image = cv2.cvtColor(image, cv2.COLOR_BGR2HLS)
            last_idx = img_idx

        # Ambil nilai saat ini dari semua slider
        h_min = cv2.getTrackbarPos('H Min', window_name)
        l_min = cv2.getTrackbarPos('L Min', window_name)
        s_min = cv2.getTrackbarPos('S Min', window_name)
        
        h_max = cv2.getTrackbarPos('H Max', window_name)
        l_max = cv2.getTrackbarPos('L Max', window_name)
        s_max = cv2.getTrackbarPos('S Max', window_name)

        lower_bound = np.array([h_min, l_min, s_min])
        upper_bound = np.array([h_max, l_max, s_max])

        # Buat Masker dan gabungkan
        mask = cv2.inRange(hls_image, lower_bound, upper_bound)
        result = cv2.bitwise_and(image, image, mask=mask)

        mask_bgr = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)
        stacked_images = np.hstack((mask_bgr, result))
        
        # Panel Teks (Hitam transparan)
        overlay = stacked_images.copy()
        cv2.rectangle(overlay, (10, 10), (550, 120), (0, 0, 0), -1)
        stacked_images = cv2.addWeighted(overlay, 0.7, stacked_images, 0.3, 0)
        
        # Tulis nilai dan instruksi navigasi
        text_min = f"MIN -> H: {h_min:3d} | L: {l_min:3d} | S: {s_min:3d}"
        text_max = f"MAX -> H: {h_max:3d} | L: {l_max:3d} | S: {s_max:3d}"
        text_nav = f"Img {img_idx+1}/{len(image_list)} | N: Next | P: Prev | C: Cetak Kode"
        
        cv2.putText(stacked_images, text_min, (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        cv2.putText(stacked_images, text_max, (20, 75), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
        cv2.putText(stacked_images, text_nav, (20, 110), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

        cv2.imshow(window_name, stacked_images)

        # Kontrol Keyboard
        key = cv2.waitKey(1) & 0xFF
        if key == 27: # Tekan ESC
            break
        elif key == ord('n') or key == ord(' '): # N atau Spasi untuk lanjut
            img_idx += 1
        elif key == ord('p'): # P untuk mundur
            img_idx -= 1
        elif key == ord('c') or key == ord('C'):
            print(f"\n✅ Hasil Tuning pada {os.path.basename(img_path)}:")
            print(f"lower_color = np.array([{h_min}, {l_min}, {s_min}])")
            print(f"upper_color = np.array([{h_max}, {l_max}, {s_max}])\n")

    cv2.destroyAllWindows()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Tuning warna HLS interaktif")
    # Default otomatis mengarah ke folder dataset Anda
    parser.add_argument('-i', '--input', default="datasets_real_robot", help="Path ke file gambar atau folder")
    args = parser.parse_args()

    tune_color(args.input)
