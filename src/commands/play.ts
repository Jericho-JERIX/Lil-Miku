import { ApplicationCommandOptionType, GuildMember, User } from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import { playMusic } from "../modules/PlayMusic";
import { downloadMusicFromYoutube } from "../modules/DownloadMusicFromYoutube";
import { PlayerSubscription, VoiceConnection } from "@discordjs/voice";

let subscription: PlayerSubscription | undefined = undefined

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

        await interaction.channel?.send("Requested url: " + url)

        downloadMusicFromYoutube(url,(error, stdout, stderr) => {
            
            if (!interaction.channel || !interaction.guild || !voiceChannelId) {
                return
            }

            if (error) {
                interaction.channel.send(stderr.slice(0,990) + "..." + error.message.slice(-1000))
                return
            }
            else {
                interaction.channel.send(stdout.slice(0,2000))
            }

            console.log("Play music")
            if (subscription) {
                subscription.unsubscribe()
            }

            subscription = playMusic(
                voiceChannelId,
                interaction.guild?.id,
                interaction.guild?.voiceAdapterCreator
            )
        })
        
        
    },
}