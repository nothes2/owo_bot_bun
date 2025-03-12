import {
    CommandInteraction,
    PermissionsBitField,
    SlashCommandBuilder
} from "discord.js";
import create_embed from "@features/ft_custom_embed/presentation/components/cmp_create_cmd.ts";
import cmd_query from "@features/ft_custom_embed/presentation/components/cmp_query_cmd.ts";

const command = new SlashCommandBuilder()
    .setName("cstembed")
    .setDescription("Create customized embed")
    .addSubcommand(command => command.setName("create")
        .setDescription("create a new embed")
        .addStringOption(option => option.setName("command_name").setDescription("custom command name").setRequired(true)))
    .addSubcommand(command => command.setName("query").setDescription("query customized embed").addStringOption(option => option.setName("command_name").setDescription("query by command name").setRequired(false)))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)

const execute = async (interaction: CommandInteraction) => {
    if(interaction.options.getSubcommand() === "create")
    {
        const command_name = interaction.options.get("command_name")

        await create_embed(interaction, command_name?.value?.toString())
    }

    if(interaction.options.getSubcommand() === "query") {
        const command_name = interaction.options.get("command_name")

        await cmd_query(interaction, command_name?.value?.toString())
    }

    const query = interaction.options.get('query')

}

export default {
    command,
    execute
}