export type DownloadedMusic = {
    title: string,
    videoId: string,
}

class MusicQueue {

    playlist: DownloadedMusic[]

    constructor() {
        this.playlist = [];
    }

    add(song: DownloadedMusic) {
        this.playlist.push(song)
    }

    dequeue() {
        return this.playlist.shift()
    }

    empty() {
        return this.playlist.length === 0
    }
}

export const musicQueue = new MusicQueue()