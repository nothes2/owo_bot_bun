import { getGlobalVariable, setGlobalVariable } from "@core/global_variables";
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
        const messages = clacMessage.get(interaction.user.id)
        for (let messageId of messages) {
            const message = await interaction.channel?.messages.fetch(messageId)
            await message?.delete()
        }
    }

    if(clacMessage.has(process.env.CLIENT_ID)) {
        const messages = clacMessage.get(process.env.CLIENT_ID)
        for (let messageId of messages) {
            console.log("getting bot message: ", messageId);
            const message = await interaction.channel?.messages.fetch(messageId)
            await message?.delete()
        }
    }

    setGlobalVariable("calc_message", new Map())
    setGlobalVariable("calc_result", new Map())
    await interaction.reply(
        {
            content: "✅ result cleaned successfully!",
            flags: MessageFlagsBitField.Flags.Ephemeral
        }
    )
}