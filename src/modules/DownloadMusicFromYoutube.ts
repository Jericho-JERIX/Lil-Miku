import { ExecException, exec } from "child_process";
import { error } from "console";

export type DownloadMusicFromYoutubeAfterDownload = (
    error:ExecException | null,
    stdout:string,
    stderr:string
) => void;

export function downloadMusicFromYoutube(url:string,afterDownload: DownloadMusicFromYoutubeAfterDownload) {
    exec(`python src/services/youtube.py ${url}`,(error, stdout, stderr) => {
        afterDownload(error, stdout, stderr);
    })
}