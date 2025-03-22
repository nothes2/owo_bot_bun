import { setGlobalVariable } from "@core/global_variables";
import { init_data } from "@features/ft_calculator/util/util";
import { MessageFlagsBitField, type CommandInteraction } from "discord.js";

export const execute = async (interaction: CommandInteraction) => {
    init_data(interaction)
    await interaction.reply({
        content: "ℹ️ entered calculator mode! Enter the calculation to display the result.",
        flags: MessageFlagsBitField.Flags.Ephemeral
    })
}