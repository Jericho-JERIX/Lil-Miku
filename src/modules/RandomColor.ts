import { ColorResolvable } from "discord.js";

const ColorPool = [
    "Purple", "Aqua", "Blue", "Green", "Yellow", "Orange", "Red"
]

export function randomEmbedColor():ColorResolvable {
    return ColorPool[Math.floor(Math.random()*(ColorPool.length+1))] as ColorResolvable
}