import { musicQueue } from "../data/MusicQueue";
import { convertSecondToHHMMSS } from "../modules/TimeFormat";
import { emojiedNumber } from "../modules/NumberEmoji";
import { SlashCommand } from "../scripts/types/SlashCommand";
import { MusicDashboardEmbed } from "../templates/components/MusicQueue.embed";

export const Queue: SlashCommand = {
    name: "queue",
    description: "Show the current queue of music",
    options: [],

    async onCommandExecuted(interaction) {
        const queue = musicQueue.getPlaylist();

        const currentSong = musicQueue.getCurrent();
        const queueString = queue.map((song, index) => {
            return `${emojiedNumber(index+1)} ${song.title}`;
        }).join("\n");

        const durationString = queue.map((song, index) => {
            return `\`${convertSecondToHHMMSS(song.duration)}\``;
        }).join("\n")

        // await interaction.reply("```\n"+`Current Playing: ${musicQueue.getCurrent()?.title}\n`+ queueString + "\n```");
        console.log("-------")
        console.log("WORK")
        console.log(!!queueString ? queueString : "*No music in queue*")
        console.log("-------")
        await interaction.reply({
            embeds:[
                MusicDashboardEmbed({
                    nowPlaying: currentSong?.title || "*No music playing*",
                    queue: !!queueString ? queueString : "*No music in queue*",
                    duration: durationString ? durationString : "-"
                })
            ]
        })
    }
}