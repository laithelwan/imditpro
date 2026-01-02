import os
import requests

API_URL = "https://router.huggingface.co/hf-inference/models/Salesforce/blip-image-captioning-base"

def describe_image(image_path):
    hf_token = os.getenv("HF_API_TOKEN")

    if not hf_token:
        raise Exception("HF_API_TOKEN غير موجود في متغيرات البيئة")

    headers = {
        "Authorization": f"Bearer {hf_token}"
    }

    with open(image_path, "rb") as f:
        image_bytes = f.read()

    response = requests.post(
        API_URL,
        headers=headers,
        data=image_bytes,
        timeout=60
    )

    # 🔍 لو رجع HTML أو خطأ
    if response.status_code != 200:
        raise Exception(
            f"HF error {response.status_code}: {response.text[:300]}"
        )

    result = response.json()

    if isinstance(result, list) and result and "generated_text" in result[0]:
        return result[0]["generated_text"]

    return "لم يتم توليد وصف للصورة"
