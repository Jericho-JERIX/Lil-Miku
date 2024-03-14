// import {} from '@discordjs/voice'

import {
	AudioPlayer,
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

let switcher = 0;

export function playMusic(
	channelId: string,
	guildId: string,
	voiceAdapterCreator: InternalDiscordGatewayAdapterCreator
): PlayerSubscription | undefined {
	const connection = joinVoiceChannel({
		channelId: channelId,
		guildId: guildId,
		adapterCreator: voiceAdapterCreator,
	});

	const player = createAudioPlayer();
	const resource = createAudioResource(
		`src/music/youtube_music_${switcher}.opus`
	);

	switcher = switcher === 0 ? 1 : 0;

	player.play(resource);
	return connection.subscribe(player);
}
