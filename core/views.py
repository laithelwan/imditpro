from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
from .ai import describe_image

# تحميل الموديل مرة واحدة عند بدء السيرفر
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

def home(request):
    image_url = None
    description = None

    if request.method == 'POST' and request.FILES.get('image'):
        image = request.FILES['image']

        # حفظ الصورة
        fs = FileSystemStorage()
        filename = fs.save(image.name, image)
        image_path = fs.path(filename)
        image_url = fs.url(filename)
        description = describe_image(image_path)

        # فتح الصورة لتحليلها
        img = Image.open(fs.path(filename)).convert("RGB")

        # توليد وصف باستخدام الذكاء الاصطناعي
        inputs = processor(images=img, return_tensors="pt")
        out = model.generate(**inputs)
        description = processor.decode(out[0], skip_special_tokens=True)

    return render(request, 'home.html', {
        'image_url': image_url,
        'description': description
    })


def edit(request):
    return render(request, 'edit.html')
