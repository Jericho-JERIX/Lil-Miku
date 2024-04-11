import { ApplicationCommandOptionType, GuildMember, User } from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import { playMusic } from "../modules/PlayMusic";
import { downloadMusicFromYoutube } from "../downloads/DownloadMusicFromYoutube";
import {
	AudioPlayer,
	PlayerSubscription,
	VoiceConnection,
} from "@discordjs/voice";
// import { musicQueue } from "../data/MusicQueue";
import { createVoiceChannelConnection } from "../modules/CreateVoiceChannelConnection";
import {
	YoutubeGoogleAPIService,
	YoutubeService,
} from "../services/Youtube.service";
import { DownloadedMetadata } from "../types/DownloadedMetadata";
import { AddMusicEmbed } from "../templates/components/AddMusic.embed";
import { GuildMusicQueueData } from "../data/GuildMusicQueue";
import { AlreadyInQueueEmbed } from "../templates/components/AlreadyInQueue.embed";

/*
- If there no current connection, create a new one and start the music
- If there is a connection, add the music to the queue
*/



export const Play: SlashCommand = {
	name: "play",
	description: "Play music from Youtube!",
	options: [
		{
			name: "query",
			description:
				"You can either paste URL or search from Youtube here.",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],

	async onCommandExecuted(interaction) {
		await interaction.deferReply();

		if (!interaction.guildId) return;

		let connection: VoiceConnection | undefined = undefined;
		let player: AudioPlayer | undefined = undefined;
		const url = interaction.options.getString("query") as string;
		const searchResult = YoutubeService.searchRecognizer(url);

		const voiceChannelId = (interaction.member as GuildMember).voice.channel
			?.id;

		let musicQueue = GuildMusicQueueData.get(
			interaction.guildId
		);

		if (!musicQueue) {
			if (voiceChannelId && interaction.guild) {

				musicQueue = GuildMusicQueueData.create(
					voiceChannelId,
					interaction.guild.id,
					interaction.guild.voiceAdapterCreator
				)
				
			}
			else {
				console.log("Music queuee not found")
				return
			}
		}
		
		connection = musicQueue.connection
		player = musicQueue.player

		let downloadedMusicData: DownloadedMetadata | null = null;
		let videoId = "";
		switch (searchResult?.type) {
			case "SEARCH":
				const youtubeAPISearchResult =
					await YoutubeGoogleAPIService.search.video(searchResult.id);
				videoId = youtubeAPISearchResult[0].id.videoId;
				break;

			case "VIDEO":
				videoId = url;
				break;
		}

		const musicInQueue = musicQueue.get(YoutubeService.extractURL(url));
		if (musicInQueue) {
			const alreadyInQueueEmbed = AlreadyInQueueEmbed({
				musicName: musicInQueue.title,
				videoId: musicInQueue.id,
			});
			await interaction.editReply({
				embeds: [alreadyInQueueEmbed],
			});
			console.log("Allreay havee this music in queueu")
			return
		}

		downloadedMusicData = await YoutubeService.download(videoId);
		// downloadedMusicData = {id: "djK5-jtc8fc",title: "Test", duration:100};
		musicQueue.add(downloadedMusicData);

		if (
			!connection ||
			!player
		) {
			console.log("No player or connection",!connection,!player)
			return ;
		}

		if (!connection || connection.state.status === "disconnected") {
			// const connectionResult = createVoiceChannelConnection(
			// 	voiceChannelId,
			// 	interaction.guild?.id,
			// 	interaction.guild?.voiceAdapterCreator
			// );
			// connection = connectionResult.connection;
			// player = connectionResult.player;
			console.log("Just conected");
			playMusic(connection, player, interaction);
		}

		if (player) {
			console.log("Status", player.state.status);
			if (player.state.status === "idle") {
				console.log("Idle -> playmusic");
				playMusic(connection, player, interaction);
			} else if (player.state.status === "autopaused") {
				console.log("Unpausing");
				player.unpause();
			}
		}

		const addMusicEmbed = AddMusicEmbed({
			musicName: downloadedMusicData.title,
			videoId: downloadedMusicData.id,
		});
		console.log("Sending embed")
		await interaction.editReply({
			embeds: [addMusicEmbed],
			// content: `Add [${downloadedMusicData.title}](https://www.youtube.com/watch?v=${downloadedMusicData.id})`
		});
	},
};
