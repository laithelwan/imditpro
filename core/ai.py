import os
import requests

HF_API_TOKEN = os.getenv("HF_API_TOKEN")

API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base"

headers = {
    "Authorization": f"Bearer {HF_API_TOKEN}"
}

def describe_image(image_path):
    if not HF_API_TOKEN:
        raise Exception("HF_API_TOKEN غير موجود")

    with open(image_path, "rb") as f:
        image_bytes = f.read()

    response = requests.post(
        API_URL,
        headers=headers,
        data=image_bytes,
        timeout=60
    )

    if response.status_code != 200:
        raise Exception(response.text)

    result = response.json()

    # شكل الرد يكون قائمة
    if isinstance(result, list) and "generated_text" in result[0]:
        return result[0]["generated_text"]

    return "لم يتم توليد وصف للصورة"
