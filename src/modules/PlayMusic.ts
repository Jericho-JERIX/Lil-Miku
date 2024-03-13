// import {} from '@discordjs/voice'

import { AudioPlayer, createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import { BaseInteraction, CacheType, InternalDiscordGatewayAdapterCreator, TextBasedChannel } from "discord.js";

export function playMusic(channelId:string,guildId:string,voiceAdapterCreator:InternalDiscordGatewayAdapterCreator) {

    const connection = joinVoiceChannel({
        channelId: channelId,
        guildId: guildId,
        adapterCreator: voiceAdapterCreator,
    });

    const player = createAudioPlayer()
    const resource = createAudioResource("src/music/youtube_music.opus")

    console.log(resource)

    player.play(resource)
    connection.subscribe(player)

}
