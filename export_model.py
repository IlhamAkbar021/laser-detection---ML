import json
import joblib
import numpy as np
import torch
import torchvision.models as models

# 1. Export MobileNetV3 ke ONNX
print("📦 Converting MobileNetV3 to ONNX...")
device = torch.device('cpu')
model = models.mobilenet_v3_small(weights=models.MobileNet_V3_Small_Weights.DEFAULT)
model.eval()

dummy_input = torch.randn(1, 3, 32, 32)
torch.onnx.export(
    model, 
    dummy_input, 
    "mobilenet_v3_small.onnx",
    input_names=['input'], 
    output_names=['output'],
    dynamic_axes={'input': {0: 'batch_size'}, 'output': {0: 'batch_size'}}
)
print("✅ Output: mobilenet_v3_small.onnx")

# 2. Export Bobot Ensemble (StandardScaler + AdaBoost/LinearSVC) ke JSON
print("📦 Extracting Ensemble Weights to JSON...")
clfs = joblib.load('Checkpoint/Ensemble.model')
ensemble_data = []

for clf in clfs:
    scaler = clf.named_steps['standardscaler']
    ada = clf.named_steps['adaboostclassifier']
    
    estimators_data = []
    # Mengambil estimator_weights_ jika ada, atau default ke 1.0
    weights_list = getattr(ada, 'estimator_weights_', [1.0] * len(ada.estimators_))
    
    for est, w in zip(ada.estimators_, weights_list):
        estimators_data.append({
            "coef": est.coef_[0].tolist(),
            "intercept": float(est.intercept_[0]),
            "weight": float(w)
        })
    
    ensemble_data.append({
        "scaler_mean": scaler.mean_.tolist(),
        "scaler_scale": scaler.scale_.tolist(),
        "estimators": estimators_data
    })

with open('ensemble_weights.json', 'w') as f:
    json.dump(ensemble_data, f)

print("✅ Output: ensemble_weights.json")
print("🎉 Model siap digunakan di Browser!")
