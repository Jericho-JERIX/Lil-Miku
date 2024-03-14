import { musicQueue } from "./queues/MusicQueue";

export function AddMusic() {
    musicQueue.add({
        title: "test",
        videoId: "test"
    })
}