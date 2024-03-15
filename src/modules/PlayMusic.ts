// import {} from '@discordjs/voice'

import {
	AudioPlayer,
	AudioPlayerStatus,
	PlayerSubscription,
	VoiceConnection,
	createAudioResource
} from "@discordjs/voice";
import { musicQueue } from "../data/MusicQueue";


export function playMusic(
	connection: VoiceConnection,
	player: AudioPlayer,
): PlayerSubscription | undefined {

	// const music = musicQueue.dequeue()

	// const resource = createAudioResource(
	// 	`src/music/${videoId}.opus`
	// );

	const initialResource = createAudioResource(
		`src/music/${musicQueue.dequeue()?.id}.opus`
	);
	player.play(initialResource)

	player.on(AudioPlayerStatus.Idle, () => {
		console.log('idle')
		console.log('playlist',musicQueue.playlist)
		if (musicQueue.empty()) {
			return
		}

		const resource = createAudioResource(
			`src/music/${musicQueue.dequeue()?.id}.opus`
		);
		player.play(resource)
	})

	// player.play(resource);
	return connection.subscribe(player);
}
