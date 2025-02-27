import {CommandInteraction, SlashCommandBuilder} from "discord.js";

export interface Feature {
    command: SlashCommandBuilder;
    execute(interaction: CommandInteraction): Promise<void>;
}
