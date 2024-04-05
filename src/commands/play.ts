import { ApplicationCommandOptionType, GuildMember, User } from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import { playMusic } from "../modules/PlayMusic";
import { downloadMusicFromYoutube } from "../downloads/DownloadMusicFromYoutube";
import { AudioPlayer, PlayerSubscription, VoiceConnection } from "@discordjs/voice";
import { musicQueue } from "../data/MusicQueue";
import { createVoiceChannelConnection } from "../modules/CreateVoiceChannelConnection";
import { YoutubeGoogleAPIService, YoutubeService } from "../services/Youtube.service";
import { DownloadedMetadata } from "../types/DownloadedMetadata";
import { AddMusicEmbed } from "../templates/components/AddMusic.embed";

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
			name: "query",
			description: "You can either paste URL or search from Youtube here.",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],

	async onCommandExecuted(interaction) {
		await interaction.deferReply();

		const url = interaction.options.getString("url") as string;
		const voiceChannelId = (interaction.member as GuildMember).voice.channel
			?.id;

		const searchResult = YoutubeService.searchRecognizer(url)
		
		let downloadedMusicData: DownloadedMetadata | null = null;

		console.log(searchResult)

		switch(searchResult?.type) {
			case "SEARCH":
				const youtubeAPISearchResult = await YoutubeGoogleAPIService.search.video(searchResult.id)
				downloadedMusicData = await downloadMusicFromYoutube(youtubeAPISearchResult[0].id.videoId);
				musicQueue.add(downloadedMusicData);
				break

			case "VIDEO":
				downloadedMusicData = await downloadMusicFromYoutube(url);
				musicQueue.add(downloadedMusicData);
				break
		}

		if (!downloadedMusicData) return

		if (!interaction.channel || !interaction.guild || !voiceChannelId) {
			return;
		}

		if (!connection || connection.state.status === "disconnected") {
			const connectionResult = createVoiceChannelConnection(
				voiceChannelId,
				interaction.guild?.id,
				interaction.guild?.voiceAdapterCreator
			);
            connection = connectionResult.connection;
            player = connectionResult.player;

            playMusic(connection, player, interaction);
		}		
		
		if (player) {
			console.log("Status", player.state.status);
			if (player.state.status === "idle"){
            	playMusic(connection, player, interaction);
			}
			else if (player.state.status === "autopaused"){
				console.log("Unpausing");
				player.unpause();
			}
        }

		await interaction.editReply({
			embeds: [
				AddMusicEmbed({
					musicName: downloadedMusicData.title,
					videoId: downloadedMusicData.id
				})
			]
		})
		
	},
};
