import { ExecException, exec } from "child_process";
import { error } from "console";
import { DownloadFunction } from "../types/DownloadFunction";
import {readFileSync} from 'fs'

export type DownloadMusicFromYoutubeAfterDownloadCallback = (
	error: ExecException | null,
	stdout: string,
	stderr: string
) => void;

export type YTDLPDownloadedMetadata = {
	id: string,
	title: string,
}

export const downloadMusicFromYoutube:DownloadFunction = async (query) => {
	return new Promise((resolve, reject) => {
		exec(
			`python src/services/youtube.py ${query} youtube_music`,
			(error, stdout, stderr) => {

				const result:YTDLPDownloadedMetadata = JSON.parse(readFileSync('src/dumps/result.txt','utf-8'))

				if (error) {
					console.warn(error);
				}
				if (result) {
					// console.log('reesultl',result)
					
					resolve({
						id: result.id,
						title: result.title
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