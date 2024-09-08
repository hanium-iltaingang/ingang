import io
import sys
import yt_dlp
import subprocess
import whisper
import os
import re
import warnings

#오디오 다운로드
def download_audio(youtube_url, output_path):
    ydl_opts = {
        'format': 'bestaudio/best', #오디오 품질 선택
        'outtmpl': output_path, #다운로드된 파일이 정될 경로, 파일명 설정
        'noplaylist': True,
        'quiet': True,
        'nooverWrites': True
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl: #다운로드 객체 생성
            ydl.download([youtube_url]) #오디오 다운로드
    except Exception as e:
        print(f"Error downloading audio: {e}", file=sys.stderr)
        sys.exit(1)


#오디오 파일 변환
def convert_to_wav(input_path, output_path):
    try:
        subprocess.run([
            'ffmpeg',
            '-i', input_path, #입력 파일 경로 지정
            '-ac', '1',
            '-ar', '16000',
            '-loglevel', 'error',
            output_path #변환된 파일 저장할 경로
        ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except subprocess.CalledProcessError as e:
        print(f"Error converting to WAV: {e}", file=sys.stderr)
        sys.exit(1)

def suppress_stderr(func):
    def wrapper(*args, **kwargs):
        stderr_backup = sys.stderr
        sys.stderr = io.StringIO()
        try:
            return func(*args, **kwargs)
        finally:
            sys.stderr = stderr_backup
    return wrapper
def suppress_pytorch_warnings():
    warnings.filterwarnings("ignore", category=UserWarning, module='torch')
    warnings.filterwarnings("ignore", category=FutureWarning, module='torch')

#음성 텍스트 변환
@suppress_stderr
def transcribe_audio(input_path, target_language='ko'):
    try:
        suppress_pytorch_warnings() #경고 무시
        model = whisper.load_model("base")
        result = model.transcribe(input_path, language=target_language) #입력된 wav파일 텍스트로 변환
        return result['text']
    except Exception as e:
        print(f"Error transcribing audio: {e}", file=sys.stderr)
        sys.exit(1)


#텍스트 파일 저장
def save_transcription_to_file(text, file_path):
    try:
        with open(file_path, 'w') as f: #file_path에 파일을 쓰기모드로 열고 텍스트 저장
            f.write(text)
    except Exception as e:
        print(f"Error saving transcription: {e}", file=sys.stderr)
        sys.exit(1)


def clean_transcription(text):
    patterns = [
        r'\[youtube\].*?\n',
        r'\[download\].*?\n',
        r'ffmpeg version.*?\n',
        r'^\[.*\] .*?\n',
        r'^\s*\n',
    ]
    cleaned_text = text
    for pattern in patterns:
        cleaned_text = re.sub(pattern, '', cleaned_text, flags=re.DOTALL | re.MULTILINE)
    cleaned_text = cleaned_text.strip()
    return cleaned_text

#메인 실행 흐름
if __name__ == "__main__":
    youtube_url = sys.argv[1] #유튜브 url 가져오기
    audio_file = 'a.mp4' #다운로드된 오디오 파일, wav파일, 자막 파일 설정
    wav_file = 'a.wav'
    transcript_file = 'stt.txt'

    original_stdout = sys.stdout
    sys.stdout = io.StringIO()

    download_audio(youtube_url, audio_file) #유튜브 오디오 다룬로드
    convert_to_wav(audio_file, wav_file) #오디오 파일 wav로 변환

    sys.stdout = original_stdout

    text = transcribe_audio(wav_file) #wav파일 텍스트로 변환
    save_transcription_to_file(text, transcript_file) #변환된 텍스트를 파일에 저장


    os.remove(audio_file) #오디오 파일, wav파일 삭제
    os.remove(wav_file)

    text = clean_transcription(text)

    print(text) #자막 파일 출력
