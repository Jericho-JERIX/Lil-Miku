import { musicQueue } from "../data/MusicQueue";
import { SlashCommand } from "../scripts/types/SlashCommand";

export const Queue: SlashCommand = {
    name: "queue",
    description: "Show the current queue of music",
    options: [],

    async onCommandExecuted(interaction) {
        const queue = musicQueue.getPlaylist();
        const queueString = queue.map((song, index) => {
            return `${index + 1}. ${song.title}`;
        }).join("\n");
        await interaction.reply("```\n"+`Current Playing: ${musicQueue.getCurrent()?.title}\n`+ queueString + "\n```");
    }
}