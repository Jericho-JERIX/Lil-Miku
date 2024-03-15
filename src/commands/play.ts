import { ApplicationCommandOptionType, GuildMember, User } from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import { playMusic } from "../modules/PlayMusic";
import { downloadMusicFromYoutube } from "../modules/DownloadMusicFromYoutube";
import { PlayerSubscription, VoiceConnection } from "@discordjs/voice";

/*
- If there no current connection, create a new one and start the music
- If there is a connection, add the music to the queue
*/

export const Play: SlashCommand = {
    name: "play",
    description: "Play music from Youtube!",
    options: [
        {
            name: "url",
			description: "Put Youtube video URL here",
			type: ApplicationCommandOptionType.String,
			required: true
        }
    ],

    async onCommandExecuted(interaction) {

        const url = interaction.options.getString("url") as string
        const voiceChannelId = (interaction.member as GuildMember).voice.channel?.id;

        await interaction.channel?.send("Requested url: " + url)

        downloadMusicFromYoutube(url,(error, stdout, stderr) => {
            
            if (!interaction.channel || !interaction.guild || !voiceChannelId) {
                return
            }

            let logMessage = ""
            if (error) {
                logMessage += stderr.slice(0,980) + "\n...\n" + error.message.slice(-980)
                return
            }
            else {
                logMessage += stdout.slice(0,1900)
            }
            interaction.channel.send("```\n" + logMessage +"\n```")

            console.log("Play music")
            
            playMusic(
                voiceChannelId,
                interaction.guild?.id,
                interaction.guild?.voiceAdapterCreator,
                stdout.split("[video_id]")[1]
            )
        })
        
        
    },
}