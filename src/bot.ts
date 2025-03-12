import register_command from "./core/commands/cmd_register.ts";
import setupCommandHandler from "./core/commands/cmd_handler.ts";
import {global_client} from "@core/bot_client.ts";
import * as process from "node:process";
import {mongoConnect} from "@core/db/mongo.ts";
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, type CommandInteraction, type Interaction } from "discord.js";
import { handle_select_menu } from "@core/commands/cmd_select_menu_handler.ts";

const client = global_client()

await mongoConnect()

client.on("ready", async client => {
    await register_command().catch(err => console.log(err));
    console.log(`🚀 The bot ${client.user.username} is ready!`)
})

client.on("guildCreate", async guild => {
    try {
        const serverID = guild.id;

    }catch(err) {
        console.error(err)
    }
})

setupCommandHandler(client).catch(err => console.log(err));
handle_select_menu(client)

client.login(process.env.BOT_TOKEN)
    .catch( err => console.log(err))