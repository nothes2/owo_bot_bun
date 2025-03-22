import { getGlobalVariable, setGlobalVariable } from "@core/global_variables";
import { init_data } from "@features/ft_calculator/util/util";
import { MessageFlagsBitField, type CommandInteraction } from "discord.js";

export const execute = async (interaction: CommandInteraction) => {

    if(!getGlobalVariable("calc_mode") || !(getGlobalVariable("calc_mode").has(interaction.user.id))) {
        interaction.reply ({
            content: "❌ 你沒有在計算模式!",
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
            const message = await interaction.channel?.messages.fetch(messageId)
            if(!message) continue
            await message.delete()
        }
    }

    init_data(interaction)
    await interaction.reply(
        {
            content: "✅ 成功清除紀錄.",
            flags: MessageFlagsBitField.Flags.Ephemeral
        }
    )
}