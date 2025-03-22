import { setGlobalVariable } from "@core/global_variables";
import { MessageFlagsBitField, type CommandInteraction } from "discord.js";

export const execute = async (interaction: CommandInteraction) => {
    const calcMode = new Map()
    const calcMessage: Map<any, any> = new Map()
    
    calcMessage.set(interaction.user.id, [])
    calcMessage.set(process.env.CLIENT_ID, [])
    calcMode.set(interaction.user.id, true)
    calcMode.set(process.env.CLIENT_ID, true)
    setGlobalVariable("calc_mode", calcMode)
    setGlobalVariable("calc_message", calcMessage)

    await interaction.reply({
        content: "ℹ️ entered calculator mode! Enter the calculation to display the result.",
        flags: MessageFlagsBitField.Flags.Ephemeral
    })
}