import { EmbedBuilder } from "discord.js";

export function AlreadyInQueueEmbed({
    musicName="music-name",
    videoId
}:{
    musicName?: string
    videoId:string
}):EmbedBuilder {
    return new EmbedBuilder()
        .setColor("Random")
        .setDescription(`❌ **[${musicName}](https://www.youtube.com/watch?v=${videoId})** has already in queue!`)
        // .setDescription(`asdw`)
}