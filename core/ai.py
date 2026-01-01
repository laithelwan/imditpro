import os
import requests

HF_API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base"

HF_API_TOKEN = os.environ.get("HF_API_TOKEN")

headers = {
    "Authorization": f"Bearer {HF_API_TOKEN}"
}

def describe_image(image_path):
    if not HF_API_TOKEN:
        return "AI غير مفعّل حالياً"

    with open(image_path, "rb") as f:
        response = requests.post(
            HF_API_URL,
            headers=headers,
            data=f
        )

    if response.status_code != 200:
        return "فشل تحليل الصورة"

    result = response.json()

    if isinstance(result, list) and "generated_text" in result[0]:
        return result[0]["generated_text"]

    return "لا يوجد وصف"
