import sys
import yt_dlp
import subprocess
import whisper
import os

def download_audio(youtube_url, output_path):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': output_path
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([youtube_url])
    except Exception as e:
        print(f"Error downloading audio: {e}")
        sys.exit(1)

def convert_to_wav(input_path, output_path):
    try:
        subprocess.run([
            'ffmpeg',
            '-i', input_path,
            '-ac', '1',
            '-ar', '16000',
            output_path
        ], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error converting to WAV: {e}")
        sys.exit(1)

def transcribe_audio(input_path):
    try:
        model = whisper.load_model("base")
        result = model.transcribe(input_path)
        return result['text']
    except Exception as e:
        print(f"Error transcribing audio: {e}")
        sys.exit(1)


if __name__ == "__main__":
    youtube_url = sys.argv[1]
    audio_file = 'audio.mp4'
    wav_file = 'audio.wav'

    download_audio(youtube_url, audio_file)
    convert_to_wav(audio_file, wav_file)
    text = transcribe_audio(wav_file)

    os.remove(audio_file)
    os.remove(wav_file)

    print(text)
