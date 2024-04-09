import { EmbedBuilder } from "discord.js";
import { randomEmbedColor } from "../../modules/RandomColor";

export function NowPlayingEmbed({
    musicName="music-name",
    videoId
}:{
    musicName?: string
    videoId:string
}):EmbedBuilder{
    return new EmbedBuilder()
    .setColor(randomEmbedColor())
    .setDescription(`\\🔴 **Now Playing: [${musicName}](https://www.youtube.com/watch?v=${videoId})**`)
}