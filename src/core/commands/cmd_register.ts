import {REST, Routes, SlashCommandBuilder, type SlashCommandOptionsOnlyBuilder} from "discord.js";

import type {Feature} from "@core/data/general.ts";
import {file_detector} from "@core/utils/cmd_file_util.ts";

const g_commands: SlashCommandBuilder[] = []

const feature_loop = (features:  Feature[]) => {

    features.forEach((feature: Feature) => {

        if(feature && feature.command) {
            g_commands.push(feature.command)
        }
    })
}

const register_command = async (): Promise<void> => {

    const files: Set<string> = await file_detector()
    for (const file of files) {
        try {
            const module = await import(file)
            const features: Feature[] = module.commands
            feature_loop(features)
        }catch (e) {
            console.error(e, file)
        }
    }

    const rest = new REST({version: "10"}).setToken(process.env.BOT_TOKEN ?? "");
    try {
        await rest.put(Routes.applicationCommands(
            process.env.CLIENT_ID ?? ""
        ), {body: g_commands});
        console.info("✅ Successfully registered all commands!");
    } catch (e) {
        console.error(`❌ Error happened in commands Registration: ${e}`);
    }

}

export default register_command;
