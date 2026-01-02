import requests
import os

API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base"

def describe_image(image_path):
    token = os.environ.get("HF_API_TOKEN")

    if not token:
        return "⚠️ لم يتم ضبط مفتاح الذكاء الصناعي"

    headers = {
        "Authorization": f"Bearer {token}"
    }

    with open(image_path, "rb") as f:
        response = requests.post(
            API_URL,
            headers=headers,
            data=f.read()
        )

    if response.status_code != 200:
        return "❌ فشل تحليل الصورة"

    result = response.json()

    if isinstance(result, list) and "generated_text" in result[0]:
        return result[0]["generated_text"]

    return "❌ لم يتم توليد وصف"
