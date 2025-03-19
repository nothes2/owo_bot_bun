import register_command from "./core/commands/cmd_register.ts";
import setupCommandHandler from "./core/commands/cmd_handler.ts";
import {global_client} from "@core/bot_client.ts";
import * as process from "node:process";
import {mongoConnect} from "@core/db/mongo.ts";
import {handle_modal_submit, handle_select_menu} from "@features/ft_ticket_bot/presentation/components/comp_event_handler.ts";
import {setGlobalVariable} from "@core/global_variables.ts";
import {format_ticket_code} from "@core/utils/utils.ts";

(async function startBot() {
    try {
        console.log("⏳ Waiting for MongoDB connection...");
        await mongoConnect(); 
        console.log("✅ MongoDB is connected!");

        const client = global_client();

        client.on("ready", async client => {
            await register_command().catch(err => console.log(err));
            let ticket_code = 1;
            setGlobalVariable("ticket_code", format_ticket_code(ticket_code, 4));
            console.log(`🚀 The bot ${client.user.username} is ready!`);
        });

        await setupCommandHandler(client).catch(err => console.log(err));
        handle_select_menu(client);
        handle_modal_submit(client);

        await client.login(process.env.BOT_TOKEN);
        console.log("✅ Bot logged in successfully!");
    } catch (error) {
        console.error("❌ Fatal Error during startup:", error);
        process.exit(1);
    }
})()

// TODO added comment in TicketEmbed plz also add it in modal to update