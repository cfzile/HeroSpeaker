from django.shortcuts import render

from . import constance, settings
from . import model
from .forms import UploadFileForm


def handle_uploaded_file(f, filename):
    with open(filename, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)


def get_full_context(request, context):
    return {**context}


def home(request):
    form = UploadFileForm()
    return render(request, 'pages/main.html',
                  get_full_context(request, {'PAGE_NAME': constance.HOME_PAGE_NAME, 'form': form}))


def load_data(request):
    if request.method == 'POST':
        filename = '/static/tmp.mp3'
        handle_uploaded_file(request.FILES['file'], settings.BASE_DIR.__str__() + filename)
        text = request.POST.get('text')
        file_path = filename
        audio_path = model.fit(file_path, text)
        return render(request, 'pages/results.html',
                      get_full_context(request, {'PAGE_NAME': constance.HOME_PAGE_NAME, 'audio_path': audio_path}))
