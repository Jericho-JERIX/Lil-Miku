import { Ping } from "./commands/ping";
import { Play } from "./commands/play";
import { Queue } from "./commands/queue";
import { SlashCommand } from "./scripts/types/SlashCommand";

export const slashCommands: SlashCommand[] = [Play,Ping,Queue];
