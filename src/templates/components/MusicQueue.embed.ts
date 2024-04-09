import { EmbedBuilder } from "discord.js";
import { randomEmbedColor } from "../../modules/RandomColor";
import { MusicQueue } from "../../data/MusicQueue";
import { emojiedNumber } from "../../modules/NumberEmoji";
import { convertSecondToHHMMSS } from "../../modules/TimeFormat";

export function MusicDashboardEmbed({
	musicQueue,
}: {
	musicQueue: MusicQueue;
}): EmbedBuilder {
	const queue = musicQueue.getPlaylist();
	const currentSong = musicQueue.getCurrent();
	const queueString = queue
		.map((song, index) => {
			return `${emojiedNumber(index + 1)} ${song.title}`;
		})
		.join("\n");

	const durationString = queue
		.map((song, index) => {
			return `\`${convertSecondToHHMMSS(song.duration)}\``;
		})
		.join("\n");

	// console.log(nowPlaying,queue,duration)

	return new EmbedBuilder()
		.setColor("Random")
		.setTitle("\\🎵 Music Queue")
		.addFields([
			{
				name: "\\🔴 Now Playing:",
				value: currentSong?.title || "*No music playing*",
				inline: false,
			},
		])
		.addFields([
			{ name: "📄 Queue", value: !!queueString ? queueString : "*No music in queue*", inline: true },
			{ name: "Duration", value: durationString ? durationString : "-", inline: true },
		]);
}
