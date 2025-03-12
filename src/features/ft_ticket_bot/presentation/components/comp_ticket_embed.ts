import {
    ActionRowBuilder,
    type CommandInteraction,
    EmbedBuilder,
    PermissionsBitField,
    SlashCommandBuilder
} from "discord.js";

const command = new SlashCommandBuilder()
    .setName("show_panel")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)

// embed
const embed = new EmbedBuilder(

)

// Action Row
const row = ActionRowBuilder

const execute = async (interaction: CommandInteraction) => {
    await interaction.reply({
        embeds: [embed],
    })
}