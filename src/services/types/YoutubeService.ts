import { ExecException } from "child_process";
import { DownloadFunction } from "../../types/DownloadFunction";
import { DownloadedMetadata } from "../../types/DownloadedMetadata";
import { AxiosResponse } from "axios";

export type YoutubeSearchRecognizerResult = {
    type: 'VIDEO' | 'PLAYLIST' | 'SEARCH',
    id: string
}

export type DownloadMusicFromYoutubeAfterDownloadCallback = (
	error: ExecException | null,
	stdout: string,
	stderr: string
) => void;

export type YTDLPDownloadedMetadata = {
	id: string,
	title: string,
	duration: number,
}

export type YoutubeGoogleAPISearchResult = {
    id: { kind:string, videoId:string },
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: any,
        channelTitle: string;
        liveBroadcastContent: string;
        publishTime: string;
    }
}

export type YoutubeGoogleAPIServiceInterface = {
    search: {
        playlist: (id:string) => Promise<YoutubeGoogleAPISearchResult[]>
        video: (keyword:string) => Promise<YoutubeGoogleAPISearchResult[]>
    }
    // getVideoData: (id:string) => Promise<YoutubeGoogleAPISearchResult>
}

export type YoutubeServiceInterface = {
    extractURL: (url:string) => string,
    extractPlaylistURL: (url:string) => string,
    searchRecognizer: (input: string) => YoutubeSearchRecognizerResult | undefined
    download: (id:string) => Promise<DownloadedMetadata>
}