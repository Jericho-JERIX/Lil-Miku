// import {} from '@discordjs/voice'

import {
	AudioPlayer,
	AudioPlayerStatus,
	PlayerSubscription,
	VoiceConnection,
	createAudioResource,
} from "@discordjs/voice";
import { MusicQueue } from "../data/MusicQueue";
import { DownloadedMetadata } from "../types/DownloadedMetadata";
import { ChatInputCommandInteraction } from "discord.js";
import { NowPlayingEmbed } from "../templates/components/NowPlaying.embed";
import { GuildMusicQueueData } from "../data/GuildMusicQueue";

export function playMusic(
	connection: VoiceConnection,
	player: AudioPlayer,
	interaction: ChatInputCommandInteraction
): PlayerSubscription | undefined {
	let initialResource;
	let initialResourceMeta: DownloadedMetadata | undefined;

	if (!interaction.guildId) return;

	const musicQueue = GuildMusicQueueData.get(
		interaction.guildId
	);

	if (!musicQueue) return

	console.log("Init play -> ",musicQueue.getCurrent() , !musicQueue.getFinished())
	if (musicQueue.getCurrent() && !musicQueue.getFinished()) {
		console.log(1)
		initialResourceMeta = musicQueue.getCurrent();
		if (!initialResourceMeta) return
		initialResource = createAudioResource(
			`src/music/${initialResourceMeta.id}.opus`
		);
	} else {
		console.log(2)
		initialResourceMeta = musicQueue.dequeue();
		initialResource = createAudioResource(
			`src/music/${initialResourceMeta?.id}.opus`
		);
	}

	player.play(initialResource);

	if (initialResourceMeta) {
		interaction.channel?.send({
			embeds: [
				NowPlayingEmbed({
					musicName: initialResourceMeta.title,
					videoId: initialResourceMeta.id,
				}),
			],
		});
	}

	player.on(AudioPlayerStatus.Idle, () => {
		console.log("idle");

		musicQueue.markAsFinished()
		// console.log("playlist", musicQueue.playlist);
		if (musicQueue.empty()) {
			console.log("Queue Empty")
			return;
		}

		let resourceMeta = musicQueue.dequeue();
		const resource = createAudioResource(
			`src/music/${resourceMeta?.id}.opus`
		);

		player.play(resource);
		if (resourceMeta) {
			const embed = NowPlayingEmbed({
				musicName: resourceMeta.title,
				videoId: resourceMeta.id,
			});
			interaction.channel?.send({
				embeds: [embed],
			});
		}
	});

	// player.play(resource);
	return connection.subscribe(player);
}
