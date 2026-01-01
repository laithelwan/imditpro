from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from .ai import describe_image

def home(request):
    image_url = None
    description = None

    if request.method == 'POST' and request.FILES.get('image'):
        image = request.FILES['image']

        fs = FileSystemStorage()
        filename = fs.save(image.name, image)
        image_path = fs.path(filename)
        image_url = fs.url(filename)

        description = describe_image(image_path)

    return render(request, 'home.html', {
        'image_url': image_url,
        'description': description
    })
