from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from .ai import describe_image  # API فقط – بدون تحميل موديل

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

        # وصف الصورة عبر API (أو رسالة تجريبية)
        try:
         description = describe_image(image_path)
        except Exception as e:
         description = f"❌ فشل تحليل الصورة: {e}"


    return render(request, 'home.html', {
        'image_url': image_url,
        'description': description
    })


def edit(request):
    return render(request, 'edit.html')
