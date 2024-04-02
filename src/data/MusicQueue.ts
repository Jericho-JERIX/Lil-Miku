import { DownloadedMetadata } from "../types/DownloadedMetadata";

class MusicQueue {

    current: DownloadedMetadata | null
    playlist: DownloadedMetadata[]

    constructor() {
        this.current = null;
        this.playlist = [
            {id: "zf8hXUUkVOs", title: "Bling",duration: 214},
            {id: "HWUnpsUvnFo", title: "คนไทย",duration: 185},
            {id: "Sz_kQuEM0mI", title: "Bye Bye",duration: 124},
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