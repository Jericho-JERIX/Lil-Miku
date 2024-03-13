import { ApplicationCommandOptionType, GuildMember, User } from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import { playMusic } from "../modules/PlayMusic";
import { downloadMusicFromYoutube } from "../modules/DownloadMusicFromYoutube";

export const Play: SlashCommand = {
    name: "play",
    description: "Play music from Youtube!",
    options: [
        {
            name: "url",
			description: "Type something here",
			type: ApplicationCommandOptionType.String,
			required: true
        }
    ],

    async onCommandExecuted(interaction) {

        const url = interaction.options.getString("url") as string
        const voiceChannelId = (interaction.member as GuildMember).voice.channel?.id;

        if (!interaction.channel || !interaction.guild || !voiceChannelId) {
            return
        }

        downloadMusicFromYoutube(url)
        playMusic(
            voiceChannelId,
            interaction.guild?.id,
            interaction.guild?.voiceAdapterCreator
        )
        
    },
}