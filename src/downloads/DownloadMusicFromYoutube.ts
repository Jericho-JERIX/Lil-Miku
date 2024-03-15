import { ExecException, exec } from "child_process";
import { error } from "console";
import { DownloadFunction } from "../types/DownloadFunction";

export type DownloadMusicFromYoutubeAfterDownloadCallback = (
	error: ExecException | null,
	stdout: string,
	stderr: string
) => void;

export const downloadMusicFromYoutube:DownloadFunction = async (query) => {
	return new Promise((resolve, reject) => {
		exec(
			`python src/services/youtube.py ${query} youtube_music`,
			(error, stdout, stderr) => {
				if (error) {
					console.warn(error);
				}
				if (stdout) {
					console.log(stdout)
					resolve({
						id: stdout.split("[video_id]")[1],
						title: stdout.split("[video_title]")[1],
					})
				}
				else {
					reject({
						id: "",
						title: "",
					})
				}
			}
		);
	});
}