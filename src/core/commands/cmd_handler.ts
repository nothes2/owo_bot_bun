import {Client} from "discord.js";

import {commands} from "@features/ft_admin/presentation/admin.ts"
import type {Feature} from "@core/type/type_general.ts";
import {feature_loop, file_detector} from "@core/commands/cmd_file_util.ts";

const g_commands: Feature[] = [];

async function setupCommandHandler(client: Client) {
    const files: Set<string> = await file_detector()

    for (const file of files) {
        try {
            const module = await import(file)
            const features: Feature[] = module.commands
            feature_loop(features, g_commands)
        } catch (e) {
            console.error(e)
        }
    }

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isCommand()) return;

        if (!commands) {
            interaction.reply(
                "❌ Not a command!",
            )
            return;
        }

        try {
            for (const command of g_commands) {
                if (interaction.commandName === command.command.name) {
                    await command.execute(interaction);
                    return
                }
            }
        } catch (error) {
            console.error(`❌ Error executing ${interaction.commandName}:`, error);
            await interaction.reply({
                content: "❌ There was an error executing the command, please try again later.",
            });
        }
    });
}

export default setupCommandHandler;
