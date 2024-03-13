import { ExecException, exec } from "child_process";
import { error } from "console";

export type DownloadMusicFromYoutubeAfterDownload = (
    error:ExecException | null,
    stdout:string,
    stderr:string
) => void;

let switcher = 0

export function downloadMusicFromYoutube(url:string,afterDownload: DownloadMusicFromYoutubeAfterDownload) {
    exec(`python src/services/youtube.py ${url} youtube_music_${switcher}`,(error, stdout, stderr) => {
        afterDownload(error, stdout, stderr);
        switcher = switcher === 0 ? 1 : 0
    })
}