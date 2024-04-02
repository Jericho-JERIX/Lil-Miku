import { EmbedBuilder } from "discord.js";
import { musicQueue } from "../../data/MusicQueue";

export function MusicDashboardEmbed({
    nowPlaying,
    queue,
    duration,
}:{
    nowPlaying:string,
    queue:string,
    duration:string
}):EmbedBuilder{

    return new EmbedBuilder()
        .setTitle("\\🎵 Music Queue")
        .addFields([
            {name:"\\🔴 Now Playing:",value: nowPlaying,inline:false},
        ])
        .addFields([
            {name:"Queue",value: queue,inline:true},
            {name:"Duration",value:duration,inline:true},
        ])
}