import {
	AudioPlayer,
	VoiceConnection,
	createAudioPlayer,
	joinVoiceChannel,
} from "@discordjs/voice";
import { InternalDiscordGatewayAdapterCreator } from "discord.js";

export function createVoiceChannelConnection(
	channelId: string,
	guildId: string,
	voiceAdapterCreator: InternalDiscordGatewayAdapterCreator
	// ):{connection:ReturnType<typeof joinVoiceChannel>,player:ReturnType<typeof createAudioPlayer>} {
): { connection: VoiceConnection; player: AudioPlayer } {
    
	const connection = joinVoiceChannel({
		channelId: channelId,
		guildId: guildId,
		adapterCreator: voiceAdapterCreator,
	});

	const player = createAudioPlayer();

	return { connection, player };
}
