import { DownloadedMetadata } from "../types/DownloadedMetadata";

export class MusicQueue {

    current: DownloadedMetadata | null
    playlist: DownloadedMetadata[]

    constructor() {
        this.current = null;
        this.playlist = [
            // {id: "zf8hXUUkVOs", title: "Bling",duration: 214},
            // {id: "HWUnpsUvnFo", title: "คนไทย",duration: 185},
            // {id: "Sz_kQuEM0mI", title: "Bye Bye",duration: 124},
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

    alreadyInQueue(item:string | DownloadedMetadata):boolean {
        if (typeof item === "string") {
            return this.playlist.map((music) => music.id).includes(item)
        }
        else {
            return this.playlist.includes(item)
        }
    }

    get(id:string): DownloadedMetadata | undefined {
        if (this.current?.id === id) return this.current
        const result = this.playlist.filter((music) => music.id === id)
        if (result.length === 0) return
        return result[0]
    }

}

// export const musicQueue = new MusicQueue()