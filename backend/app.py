import torch
from torchvision import models, transforms
from PIL import Image
from transformers import ViTModel
from flask import Flask, request, jsonify
import io
import torch.nn as nn
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Define the hybrid model
# Define the hybrid model
class HybridViTDR(nn.Module):
    def __init__(self, num_classes=5):
        super(HybridViTDR, self).__init__()

        # CNN Backbone
        self.cnn = models.resnet50(pretrained=True)
        self.cnn.fc = nn.Identity()  # Remove the final classification layer

        # Vision Transformer
        self.vit = ViTModel.from_pretrained('google/vit-base-patch16-224-in21k')
        self.vit_fc = nn.Linear(self.vit.config.hidden_size, 256)

        # Fusion and Classifier
        self.fc1 = nn.Linear(2048 + 256, 512)  # ResNet (2048) + ViT (256)
        self.fc2 = nn.Linear(512, num_classes)
        self.dropout = nn.Dropout(0.3)
        self.relu = nn.ReLU()

    def forward(self, x):
        # CNN Feature Extraction
        cnn_features = self.cnn(x)

        # ViT Feature Extraction
        vit_features = self.vit(pixel_values=x)['last_hidden_state']
        vit_features = vit_features.mean(dim=1)  # Average pooling
        vit_features = self.vit_fc(vit_features)

        # Fusion
        fused_features = torch.cat((cnn_features, vit_features), dim=1)

        # Classification
        x = self.relu(self.fc1(fused_features))
        x = self.dropout(x)
        x = self.fc2(x)
        return x


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # model = load_model()

        if 'image' not in request.files:
            return jsonify({'error': 'no file found'}), 400

        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'no file found'}), 400

        import timm
        # model = HybridViTDR(num_classes=5).to(device)
        
        MODEL_NAME = "swinv2_small_window16_256"
        model= timm.create_model(MODEL_NAME, pretrained=True, num_classes=5)

        # print("Image ",img)
        model.load_state_dict(torch.load('C:/Users/likhi/OneDrive/Desktop/pdfs/DRDetector/aptos2019/swinv2_small_window16_256_epoch_24.pt',map_location=torch.device('cpu')))
        model.eval()
        from torchvision import transforms,models

        transform = transforms.Compose([
            transforms.Resize((256, 256)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

        img = Image.open(io.BytesIO(file.read())).convert('RGB')
        img = transform(img).unsqueeze(0)

        with torch.no_grad():
            output = model(img)

        _, predicted = torch.max(output, 1)
        print("Predicted output", predicted.item())

        classes = ['class1', 'class2', 'class3', 'class4', 'class5']
        ans = classes[predicted.item()]

        return jsonify({'prediction': ans})
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
