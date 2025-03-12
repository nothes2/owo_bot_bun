import { embed_handle } from "@core/utils/utils";
import { type Interaction, Client } from "discord.js";

export function handle_select_menu(client: Client) {
    
    client.on("interactionCreate", async (interaction: Interaction) => {
        if(!(interaction.isStringSelectMenu())) return 
        switch (interaction.customId) {
            case "embed":
                embed_handle(interaction);break
            default:
                break;
        }
    })
    
}