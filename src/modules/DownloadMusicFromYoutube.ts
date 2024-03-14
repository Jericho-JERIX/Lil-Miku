import { ExecException, exec } from "child_process";
import { error } from "console";

export type DownloadMusicFromYoutubeAfterDownloadCallback = (
	error: ExecException | null,
	stdout: string,
	stderr: string
) => void;


export function downloadMusicFromYoutube(
	url: string,
	afterDownload: DownloadMusicFromYoutubeAfterDownloadCallback
) {
	exec(
		`python src/services/youtube.py ${url} youtube_music`,
		(error, stdout, stderr) => {
			afterDownload(error, stdout, stderr);
		}
	);
}
