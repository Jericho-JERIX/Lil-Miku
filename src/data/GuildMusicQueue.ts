import { MusicQueue } from './MusicQueue';

class GuildMusicQueue {

    musicQueue: {[guildId:string]: MusicQueue}

    constructor() {
        this.musicQueue = {}
    }

    getOrCreateMusicQueue(guildId:string): MusicQueue {
        if (!(guildId in this.musicQueue)) this.musicQueue[guildId] = new MusicQueue()
        return this.musicQueue[guildId]
    }

    // createMusicQueue(guildId:string): MusicQueue {
    //     this.musicQueue[guildId] = new MusicQueue()
    //     return this.musicQueue[guildId]
    // }
}

export const GuildMusicQueueData = new GuildMusicQueue()