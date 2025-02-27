import {Guild, REST, Routes, SlashCommandBuilder} from "discord.js";

import type {Feature} from "@core/type/type_general.ts";
import {file_detector} from "@core/commands/cmd_file_util.ts";
import {commands} from "@features/ft_admin/presentation/admin.ts";

const g_commands: SlashCommandBuilder[] = []

const feature_loop = (features:  Feature[] ) => {

    features.forEach((feature: Feature) => {
        g_commands.push(feature.command)
    })
}

const register_commands = async (): Promise<void> => {

    const files: Set<string> = await file_detector()
    for (const file of files) {
        try {
            const module = await import(file)
            const features: Feature[] = module.commands
            feature_loop(features)
        }catch (e) {
            console.error(e)
        }
    }


    const rest = new REST({version: "10"}).setToken(process.env.BOT_TOKEN ?? "");

    try {
        await rest.put(Routes.applicationGuildCommands(
            process.env.CLIENT_ID ?? "",
            process.env.GUILD_ID ?? ""
        ), {body: g_commands});

        console.log("✅ Successfully registered all commands!");
    } catch (e) {
        console.log(`❌ Error happened in commands Registration: ${e}`);
    }

}

export default register_commands;
