import { EmbedBuilder } from "discord.js";
import { randomEmbedColor } from "../../modules/RandomColor";

export function MusicDashboardEmbed({
    nowPlaying,
    queue,
    duration,
}:{
    nowPlaying:string,
    queue:string,
    duration:string
}):EmbedBuilder{

    console.log(nowPlaying,queue,duration)

    return new EmbedBuilder()
        .setColor("Random")
        .setTitle("\\🎵 Music Queue")
        .addFields([
            {name:"\\🔴 Now Playing:",value: nowPlaying,inline:false},
        ])
        .addFields([
            {name:"📄 Queue",value: queue,inline:true},
            {name:"Duration",value:duration,inline:true},
        ])
}