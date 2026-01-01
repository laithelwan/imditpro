import os
import requests
import time

API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base"
HF_API_TOKEN = os.environ.get("HF_API_TOKEN")

headers = {
    "Authorization": f"Bearer {HF_API_TOKEN}"
}

def describe_image(image_path):
    if not HF_API_TOKEN:
        return "AI غير مفعّل"

    with open(image_path, "rb") as f:
        response = requests.post(API_URL, headers=headers, data=f)

    if response.status_code != 200:
        return "فشل الاتصال بالذكاء الاصطناعي"

    result = response.json()

    # إذا الموديل عم يحمل
    if isinstance(result, dict) and "error" in result:
        if "loading" in result["error"].lower():
            return "الذكاء الاصطناعي قيد التحميل، أعد المحاولة بعد دقيقة"

    if isinstance(result, list) and "generated_text" in result[0]:
        return result[0]["generated_text"]

    return "لم يتم توليد وصف"
