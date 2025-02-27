import register_command from "./core/commands/cmd_register.ts";
import setupCommandHandler from "./core/commands/cmd_handler.ts";
import createClient from "@core/bot_client.ts";
import * as process from "node:process";

const client = createClient()


client.on("ready", async client => {
    await register_command().catch(err => console.log(err));
    console.log(`🚀 The bot ${client.user.username} is ready!`)
})

setupCommandHandler(client).catch(err => console.log(err));

client.login(process.env.BOT_TOKEN)
    .catch( err => console.log(err))

