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


export function playMusic(
	channelId: string,
	guildId: string,
	voiceAdapterCreator: InternalDiscordGatewayAdapterCreator,
	videoId: string,
): PlayerSubscription | undefined {
	const connection = joinVoiceChannel({
		channelId: channelId,
		guildId: guildId,
		adapterCreator: voiceAdapterCreator,
	});

	const player = createAudioPlayer();
	const resource = createAudioResource(
		`src/music/${videoId}.opus`
	);


	player.play(resource);
	return connection.subscribe(player);
}
