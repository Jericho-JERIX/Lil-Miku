import { InternalDiscordGatewayAdapterCreator } from "discord.js";
import { MusicQueue } from "./MusicQueue";

class GuildMusicQueue {
	musicQueue: { [guildId: string]: MusicQueue };

	constructor() {
		this.musicQueue = {};
	}

	// getOrCreateMusicQueue(guildId: string): MusicQueue {
	// 	if (!(guildId in this.musicQueue))
	// 		this.musicQueue[guildId] = new MusicQueue();
	// 	return this.musicQueue[guildId];
	// }

	create(
		channelId: string,
		guildId: string,
		voiceAdapterCreator: InternalDiscordGatewayAdapterCreator
	): MusicQueue {
		this.musicQueue[guildId] = new MusicQueue(
			channelId,
			guildId,
			voiceAdapterCreator
		);
		return this.musicQueue[guildId];
	}

    get(
        guildId:string
    ):MusicQueue | undefined {
        return this.musicQueue[guildId];
    }
}

export const GuildMusicQueueData = new GuildMusicQueue();
