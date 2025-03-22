import { getGlobalVariable, setGlobalVariable } from "@core/global_variables";
import { MessageFlagsBitField, type CommandInteraction } from "discord.js";

export const execute = async (interaction: CommandInteraction) => {
    const user: Map<string, boolean> = getGlobalVariable("calc_mode")

    if(!user || !(user.has(interaction.user.id))) {
        await interaction.reply(
            {
                content: "⚠️ 你沒有進入計算模式!",
                flags: MessageFlagsBitField.Flags.Ephemeral
            }
        )
        return
    }

    user.delete(interaction.user.id)
    setGlobalVariable("calc_mode", user)

    await interaction.reply(
        {
             content: "✅ 成功退出計算模式!",
             flags: MessageFlagsBitField.Flags.Ephemeral
        }
    )
}