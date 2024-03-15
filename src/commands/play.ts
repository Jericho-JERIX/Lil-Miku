import { ApplicationCommandOptionType, GuildMember, User } from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import { playMusic } from "../modules/PlayMusic";
import { downloadMusicFromYoutube } from "../downloads/DownloadMusicFromYoutube";
import { AudioPlayer, PlayerSubscription, VoiceConnection } from "@discordjs/voice";
import { musicQueue } from "../data/MusicQueue";
import { createVoiceChannelConnection } from "../modules/CreateVoiceChannelConnection";

/*
- If there no current connection, create a new one and start the music
- If there is a connection, add the music to the queue
*/

let connection: VoiceConnection | undefined = undefined;
let player: AudioPlayer | undefined = undefined;

export const Play: SlashCommand = {
	name: "play",
	description: "Play music from Youtube!",
	options: [
		{
			name: "url",
			description: "Put Youtube video URL here",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],

	async onCommandExecuted(interaction) {
		const url = interaction.options.getString("url") as string;
		const voiceChannelId = (interaction.member as GuildMember).voice.channel
			?.id;

		await interaction.reply("Requested url: " + url);


		const downloadedMusic = await downloadMusicFromYoutube(url);
		musicQueue.add(downloadedMusic);

        // console.log("connection",connection)
        // console.log("player",player)

		if (!connection) {
			if (!interaction.channel || !interaction.guild || !voiceChannelId) {
				return;
			}
			const connectionResult = createVoiceChannelConnection(
				voiceChannelId,
				interaction.guild?.id,
				interaction.guild?.voiceAdapterCreator
			);
            connection = connectionResult.connection;
            player = connectionResult.player;

            playMusic(connection, player);
		}
        else if (player && player.state.status === "idle") {
            playMusic(connection, player);
        }
	},
};
