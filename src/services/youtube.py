import sys
from yt_dlp import YoutubeDL

def download_music(url, path, filename):
    ydl_opts = {
    'format': 'bestaudio/best',
    'paths': {'home': '{}'.format(path)},
    'outtmpl': filename,
    'postprocessors': [{
        'key': 'FFmpegExtractAudio'
    }]
}
    URLS = url
    with YoutubeDL(ydl_opts) as ydl:
        ydl.download(URLS)

if __name__ == '__main__':
    url = sys.argv[1]
    filename = sys.argv[2]
    download_music(url,'src/music',filename)