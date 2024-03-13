import { Ping } from "./commands/ping";
import { Play } from "./commands/play";
import { SlashCommand } from "./scripts/types/SlashCommand";

export const slashCommands: SlashCommand[] = [Ping,Play];
