from django.shortcuts import render
from pydub import AudioSegment

from . import constance, settings
from .model import our_tts as model
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
        audio_format = request.FILES['file'].name
        audio_format = audio_format[audio_format.rfind('.') + 1:]
        filename = f'static/audio/{request.POST["csrfmiddlewaretoken"]}'
        handle_uploaded_file(request.FILES['file'], f'{filename}.{audio_format}')
        sound = AudioSegment.from_file(f'{filename}.{audio_format}', f"{audio_format}")
        sound.export(f'{filename}.wav', format="wav")
        text = request.POST.get('text')
        file_path = f'{filename}.wav'
        out_path = f'static/out/{request.POST["csrfmiddlewaretoken"]}.wav'
        audio_path = model.fit([file_path], text, out_path)
        return render(request, 'pages/results.html',
                      get_full_context(request, {'PAGE_NAME': constance.HOME_PAGE_NAME, 'audio_path': audio_path, 'text': text}))
