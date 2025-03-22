import { getGlobalVariable, setGlobalVariable } from "@core/global_variables";
import { init_data } from "@features/ft_calculator/util/util";
import { MessageFlagsBitField, type CommandInteraction } from "discord.js";

export const execute = async (interaction: CommandInteraction) => {

    if(!getGlobalVariable("calc_mode") || !(getGlobalVariable("calc_mode").has(interaction.user.id))) {
        interaction.reply ({
            content: "❌ you are not in a calc environment!",
            flags: MessageFlagsBitField.Flags.Ephemeral
        })
        return
    }

    let clacMessage: Map<any, any> = getGlobalVariable("calc_message")

    if(clacMessage.has(interaction.user.id)) {

        console.log("user:", interaction.id)
        const messages = clacMessage.get(interaction.user.id)
        for (let messageId of messages) {
            const message = await interaction.channel?.messages.fetch(messageId)
            await message?.delete()
        }
    }

    if(clacMessage.has(process.env.CLIENT_ID)) {
        console.log("bot:", interaction.id);
        
        const messages = clacMessage.get(process.env.CLIENT_ID)
        for (let messageId of messages) {
            const message = await interaction.channel?.messages.fetch(messageId)
            if(!message) continue
            await message.delete()
        }
    }

    init_data(interaction)
    await interaction.reply(
        {
            content: "✅ result cleaned successfully!",
            flags: MessageFlagsBitField.Flags.Ephemeral
        }
    )
}