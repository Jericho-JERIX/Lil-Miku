// import {} from '@discordjs/voice'

import {
	AudioPlayer,
	AudioPlayerStatus,
	PlayerSubscription,
	VoiceConnection,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} from "@discordjs/voice";
import {
	BaseInteraction,
	CacheType,
	InternalDiscordGatewayAdapterCreator,
	TextBasedChannel,
} from "discord.js";
import { musicQueue } from "./queues/MusicQueue";


export function playMusic(
	connection: VoiceConnection,
	player: AudioPlayer,
): PlayerSubscription | undefined {

	// const music = musicQueue.dequeue()

	// const resource = createAudioResource(
	// 	`src/music/${videoId}.opus`
	// );

	player.on(AudioPlayerStatus.Idle, () => {

		if (musicQueue.empty()) {
			return
		}

		const resource = createAudioResource(
			`src/music/${musicQueue.dequeue()?.videoId}.opus`
		);
		player.play(resource)
	})

	// player.play(resource);
	return connection.subscribe(player);
}
