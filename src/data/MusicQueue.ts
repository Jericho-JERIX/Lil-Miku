import { DownloadedMetadata } from "../types/DownloadedMetadata";

class MusicQueue {

    current: DownloadedMetadata | null
    playlist: DownloadedMetadata[]

    constructor() {
        this.current = null;
        this.playlist = [
            {id: "zf8hXUUkVOs", title: "Bling"},
            {id: "HWUnpsUvnFo", title: "คนไทย"},
            {id: "Sz_kQuEM0mI", title: "Bye Bye"}
        ];
    }

    add(song: DownloadedMetadata) {
        this.playlist.push(song)
    }

    dequeue() {
        this.current = this.playlist[0]
        return this.playlist.shift()
    }

    empty() {
        return this.playlist.length === 0
    }

    getPlaylist() {
        return this.playlist
    }

    getCurrent() {
        return this.current
    }
}

export const musicQueue = new MusicQueue()