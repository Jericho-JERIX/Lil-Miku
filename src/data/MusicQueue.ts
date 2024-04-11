import { AudioPlayer, VoiceConnection } from "@discordjs/voice";
import { DownloadedMetadata } from "../types/DownloadedMetadata";
import { createVoiceChannelConnection } from "../modules/CreateVoiceChannelConnection";
import { GuildMember, InternalDiscordGatewayAdapterCreator } from "discord.js";

export class MusicQueue {
	// current: DownloadedMetadata | null
	playlist: DownloadedMetadata[];
	index: number;
	finished: boolean;
	connection: VoiceConnection | undefined = undefined;
	player: AudioPlayer | undefined = undefined;

	constructor(
        channelId: string,
        guildId: string,
        voiceAdapterCreator: InternalDiscordGatewayAdapterCreator
    ) {
		// this.current = null;
		this.playlist = [
			// {id: "zf8hXUUkVOs", title: "Bling",duration: 214},
			// {id: "HWUnpsUvnFo", title: "คนไทย",duration: 185},
			// {id: "Sz_kQuEM0mI", title: "Bye Bye",duration: 124},
		];
		this.index = -1;
		this.finished = false;
		const connectionResult = createVoiceChannelConnection(
			channelId,
            guildId,
            voiceAdapterCreator
		);
        this.connection = connectionResult.connection
        this.player = connectionResult.player
	}

	markAsFinished(): void {
		this.finished = true;
	}

	add(song: DownloadedMetadata): void {
		this.playlist.push(song);
	}

	dequeue(): DownloadedMetadata | undefined {
		// this.current = this.playlist[0]
		// return this.playlist.shift()
		// if (this.empty()) return
		this.index += 1;
		this.finished = false;
		return this.playlist[this.index];
	}

	empty(): boolean {
		// return this.playlist.length === 0
		return this.index === this.playlist.length - 1;
	}

	getPlaylist(): DownloadedMetadata[] {
		return this.playlist.slice(this.index + 1);
	}

	getCurrent(): DownloadedMetadata | undefined {
		// return this.current
		return this.playlist[this.index];
	}

	getFinished(): boolean {
		return this.finished;
	}

	alreadyInQueue(item: string | DownloadedMetadata): boolean {
		if (typeof item === "string") {
			return this.playlist.map((music) => music.id).includes(item);
		} else {
			return this.playlist.includes(item);
		}
	}

	get(id: string): DownloadedMetadata | undefined {
		if (this.getCurrent()?.id === id) return this.getCurrent();
		const result = this.playlist
			.slice(this.index)
			.filter((music) => music.id === id);
		if (result.length === 0) return;
		return result[0];
	}
}

// export const musicQueue = new MusicQueue()
