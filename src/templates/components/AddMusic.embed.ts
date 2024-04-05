import { EmbedBuilder } from "discord.js";
import { randomEmbedColor } from "../../modules/RandomColor";

export function AddMusicEmbed({
    musicName="[music name]",
    videoId
}:{
    musicName?: string
    videoId:string
}):EmbedBuilder {
    return new EmbedBuilder()
        .setColor(randomEmbedColor())
        .setDescription(`✅ **[${musicName}](https://www.youtube.com/watch?v=${videoId})** has been added to queue`)
}