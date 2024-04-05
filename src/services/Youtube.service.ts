import { exec } from "child_process";
import { YoutubeGoogleAPISearchResult, YoutubeGoogleAPIServiceInterface, YoutubeServiceInterface } from "./types/YoutubeService";
import { YTDLPDownloadedMetadata } from "../downloads/DownloadMusicFromYoutube";
import { readFileSync } from "fs";
import { DownloadFunction } from "../types/DownloadFunction";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config()
const CREDENTIAL = process.env.YOUTUBE_API_KEY

export const YoutubeGoogleAPIService: YoutubeGoogleAPIServiceInterface = {
    search: {
        async video(keyword) {
            const {data} = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?q=${keyword}&type=video&maxResults=10&part=snippet&key=${CREDENTIAL}`)
            
            if ('error' in data) {
                return []
            }

            return data.items.map(({id,snippet}:YoutubeGoogleAPISearchResult) => ({id,snippet}))

        },

        async playlist(id) {
            const {data} = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&key=${CREDENTIAL}`)
            
            if ('error' in data) {
                return []
            }

            return data.items.map(({id,snippet}:YoutubeGoogleAPISearchResult) => ({id,snippet}))
        },
    },

    // getVideoData: async (id:string) => {
    //     const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${CREDENTIAL}`)

    //     const snippet = response.data

    //     // if ('error' in snippet) {
    //     //     return 
    //     // }



    //     return {
    //         id: {
    //             kind: "",
    //             videoId: id
    //         },
    //         snippet: {

    //             publishedAt: 
    //             channelId: 
    //             title: snippet['items'][0]['snippet']['title'],
    //             description: 
    //             thumbnails: 
    //             channelTitle: 
    //             liveBroadcastContent: 
    //             publishTime: 

    //             title: snippet['items'][0]['snippet']['title'],
    //             channel_title: snippet['items'][0]['snippet']['channelTitle'],
    //             description: snippet['items'][0]['snippet']['description'],
    //             thumbnail: snippet['items'][0]['snippet']['thumbnails']['medium']['url'],
    //             url: id,
    //         }
    //     }
    // }
}

export const YoutubeService: YoutubeServiceInterface = {
	extractURL(url) {
		if (url.includes("youtu.be")) {
			let url_div = url.split("youtu.be/");
			return url_div[1];
		} else {
			let url_div = url.split("?v=");
			if (url_div.length !== 1) {
				let query_div = url_div[1].split("&");
				return query_div[0];
			} else {
				return url_div[0];
			}
		}
	},

	extractPlaylistURL(url) {
		if (url.includes("youtube.com")) {
			const playlistReg = /list=.*&|list=.*/;
			if (!playlistReg.exec(url)) {
				return "";
			}
			let result = playlistReg.exec(url);

			if (!result) {
				return "";
			}

			let slicedResult = result[0].slice(5);

			if (slicedResult[slicedResult.length - 1] === "&") {
				slicedResult = slicedResult.slice(0, -1);
			}
			return slicedResult;
		} else {
			return url;
		}
	},

	searchRecognizer(input) {
		let result;
        let matchedResult;
		if (input.includes("youtu.be")) {
            return {
                type: "VIDEO",
                id: input.split("/")[3]
            }
		} else if (input.includes("list=")) {
			const videoReg = /list=(.*?)&|list=(.*?)/;
			result = videoReg.exec(input);
            
            if (!result) {
                return
            }
            matchedResult = result[0]

			if (matchedResult[matchedResult.length - 1] === "&") {
                return {
                    type: "PLAYLIST",
                    id: matchedResult.slice(5, -1)
                }
			} else {
                return {
                    type: "PLAYLIST",
                    id: matchedResult.slice(5)
                }
			}
		} else if (input.includes("v=")) {
			const videoReg = /v=.*&|v=.*/;
			result = videoReg.exec(input);
            
            if (!result) {
                return
            }
            matchedResult = result[0]

			if (matchedResult[matchedResult.length - 1] === "&") {
                return {
                    type: "VIDEO",
                    id: matchedResult.slice(2, -1)
                }
			} else {
                return {
                    type: "VIDEO",
                    id: matchedResult.slice(2)
                }
			}
		} else {
			return {
                type: "SEARCH",
                id: input
            }
		}
	},

    download(id) {
        return new Promise((resolve, reject) => {
            exec(
                `python src/services/youtube.py ${id} youtube_music`,
                (error, stdout, stderr) => {
    
                    const result:YTDLPDownloadedMetadata = JSON.parse(readFileSync('src/dumps/result.txt','utf-8'))
    
                    if (error) {
                        console.warn(error);
                    }
                    if (result) {                        
                        resolve({
                            id: result.id,
                            title: result.title,
                            duration: result.duration
                        })
                    }
                    else {
                        reject({
                            id: "",
                            title: "",
                            duration: 0
                        })
                    }
                }
            );
        });
    },
};
