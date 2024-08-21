import sys
import youtube_dl
import subprocess
import whisper

def download_audio(youtube_url, output_path):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': output_path
    }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([youtube_url])

def convert_to_wav(input_path, output_path):
    subprocess.run([
        'ffmpeg',
        '-i', input_path,
        '-ac', '1',
        '-ar', '16000',
        output_path
    ])

def transcribe_audio(input_path):
    model = whisper.load_model("base")
    result = model.transcribe(input_path)
    return result['text']

if __name__ == "__main__":
    youtube_url = sys.argv[1]
    audio_file = 'audio.mp4'
    wav_file = 'audio.wav'

    download_audio(youtube_url, audio_file)
    convert_to_wav(audio_file, wav_file)
    text = transcribe_audio(wav_file)
    print(text)
