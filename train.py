import os
import argparse
import json
import numpy as np
import pandas as pd
from PIL import Image
import joblib
import torch
import torchvision.transforms as T
import torchvision.transforms.functional as Fc
import torchvision.models as models
from sklearn.model_selection import train_test_split
from sklearn.ensemble import AdaBoostClassifier
from sklearn.svm import LinearSVC
from sklearn.metrics import accuracy_score
from tqdm import tqdm

def parse_args():
    parser = argparse.ArgumentParser(description='Train Lightweight Laser Spot Detector')
    parser.add_argument('--config', help='Config file path', default='Config/config.json')
    parser.add_argument('-p', '--positive_path', help='Input path of positive training images')
    parser.add_argument('-n', '--negative_path', help='Input path of negative training images')
    parser.add_argument('--max_iter', type=int, help='Max SVC iterations', default=2000)
    parser.add_argument('-e', '--extract', action='store_true', help='Extract features into CSVs')
    parser.add_argument('-o', '--output', help='Output path of trained model', default='Checkpoint/Ensemble.model')
    return parser.parse_args()

def img_trans(img, device):
    trans = T.ToTensor()
    input_img = trans(img).unsqueeze_(0)
    return input_img.to(device)

def augmentation(img, name, output_path):
    """Memutarkan gambar pada 8 sudut berbeza untuk memperbanyakkan data latihan."""
    if name.lower().endswith('.jpg') or name.lower().endswith('.png'):
        file_name = name.rsplit('.', 1)[0]
    else:
        file_name = name
        
    rotated = [Fc.rotate(img, angle) for angle in range(0, 360, 45)]
    for i, angle in enumerate(range(0, 360, 45)):
        save_name = f"{file_name}_{str(angle).zfill(3)}.jpg"
        rotated[i].save(os.path.join(output_path, save_name), quality=95)

def augment_dataset(input_path):
    """Menjalankan augmentasi pada semua gambar dalam folder dan menyimpannya di folder baru."""
    output_path = input_path + '_augmented'
    os.makedirs(output_path, exist_ok=True)
    
    valid_exts = ('.jpg', '.jpeg', '.png')
    img_names = [f for f in os.listdir(input_path) if f.lower().endswith(valid_exts)]
    
    print(f"🔄 Menjalankan Augmentasi pada {len(img_names)} gambar di '{input_path}'...")
    for name in tqdm(img_names, desc="Augmenting Data", unit="img"):
        img_file = os.path.join(input_path, name)
        img = Image.open(img_file).convert('RGB')
        augmentation(img, name, output_path)
        
    return output_path

def extract_feature(path, device, cnn_model):
    """Extracts CNN features into a CSV dataset using a standalone model."""
    valid_exts = ('.jpg', '.jpeg', '.png')
    img_names = [f for f in os.listdir(path) if f.lower().endswith(valid_exts)]
    feature_path = f'{path}.csv'

    dataset = pd.DataFrame(np.ones((len(img_names), 1001)), index=img_names)
    dataset = dataset.rename(columns={0: 'label'})

    print(f"📦 Extracting features for {len(img_names)} images in '{path}'...")
    
    for name in tqdm(img_names, desc=f"Extracting {os.path.basename(path)}", unit="img"):
        img_file = os.path.join(path, name)
        img = Image.open(img_file).convert('RGB')
        input_tensor = img_trans(img, device)
        output = cnn_model(input_tensor)
        feature = output.cpu().detach().numpy()
        dataset.loc[name, 1:1000] = feature.copy()

    dataset.to_csv(feature_path)
    print(f"💾 Saved feature CSV to: {feature_path}\n")

def feature_preprocess(p_path, n_path, output_path, max_iter, under_sample=5):
    p_features_path = p_path + '.csv'
    n_features_path = n_path + '.csv'

    # Menggunakan laluan augmented secara automatik jika ia wujud
    if not os.path.exists(p_features_path) and os.path.exists(p_path + '_augmented.csv'):
        p_features_path = p_path + '_augmented.csv'
        print(f"✅ Menggunakan data positif yang telah diaugmentasi: {p_features_path}")

    positive = pd.read_csv(p_features_path, index_col=0)
    negative = pd.read_csv(n_features_path, index_col=0)

    positive.loc[:, 'label'] = 1
    negative.loc[:, 'label'] = -1

    train_positive, test_positive = train_test_split(positive, test_size=0.2, random_state=42)
    train_negative, test_negative = train_test_split(negative, test_size=0.2, random_state=42)

    clfs = []
    print("⚡ Training Lightweight AdaBoost Ensemble...")

    for i in tqdm(range(under_sample), desc="Training Models", unit="model"):
        try:
            clf = AdaBoostClassifier(
                estimator=LinearSVC(max_iter=max_iter, random_state=42, dual='auto'),
                n_estimators=5,
                algorithm='SAMME', 
                random_state=i
            )
        except TypeError:
            clf = AdaBoostClassifier(
                base_estimator=LinearSVC(max_iter=max_iter, random_state=42, dual='auto'),
                n_estimators=10,
                algorithm='SAMME', 
                random_state=i
            )

        train_sub_negative = train_negative.sample(n=train_positive.shape[0], replace=True, random_state=i)
        combined_data = pd.concat((train_positive, train_sub_negative)).sample(frac=1, random_state=i)

        X = combined_data.iloc[:, 1:]
        y = combined_data.iloc[:, 0]
        clf.fit(X, y)
        clfs.append(clf)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    joblib.dump(clfs, output_path)
    print(f"\n✅ Trained model saved to: {output_path}")

    # Evaluate accuracy
    test = pd.concat((test_positive, test_negative)).sample(frac=1, random_state=42)
    X_test = test.iloc[:, 1:]
    y_test = test.iloc[:, 0]
    
    y_predict = sum(clf.predict(X_test) for clf in clfs)
    y_predict = [1 if val > 0 else -1 for val in y_predict]
    print(f'🎯 Validation Accuracy: {accuracy_score(y_test, y_predict) * 100:.2f}%')

if __name__ == '__main__':
    args = parse_args()

    assert os.path.exists(args.positive_path), f"Positive path not found at {args.positive_path}"
    assert os.path.exists(args.negative_path), f"Negative path not found at {args.negative_path}"

    if args.extract:
        device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        print(f"📥 Loading MobileNetV3 architecture on [{device.type.upper()}] for extraction...")
        cnn_model = models.mobilenet_v3_small(weights=models.MobileNet_V3_Small_Weights.DEFAULT).to(device)
        cnn_model.eval()
        
        # 1. Jalankan augmentasi pada folder positif terlebih dahulu
        augmented_positive_path = augment_dataset(args.positive_path)
        
        # 2. Ekstrak ciri (feature) daripada folder yang telah diperbanyakkan
        extract_feature(augmented_positive_path, device, cnn_model)
        extract_feature(args.negative_path, device, cnn_model)

    feature_preprocess(args.positive_path, args.negative_path, args.output, args.max_iter)