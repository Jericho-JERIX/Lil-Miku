import { exec } from "child_process";

export function downloadMusicFromYoutube(url:string) {
    exec(`python src/services/youtube.py ${url}`)
}