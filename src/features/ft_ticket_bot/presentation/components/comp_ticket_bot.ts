import {type CommandInteraction, SlashCommandBuilder} from "discord.js";
import {execute as setEmbedExec} from "@features/ft_ticket_bot/presentation/components/comp_set_ticket_emebed.ts"
import {execute as showEmbedExec} from "@features/ft_ticket_bot/presentation/components/comp_show_ticket_embed.ts"


const command = new SlashCommandBuilder()
    .setName("ticket_bot")
    .setDescription("ticket bot command list")
    .addSubcommand(
        command => command
            .setName("set_ticket_embed")
            .setDescription("init a embed for ur ticket bot"))
    .addSubcommand(
        command => command
            .setName("query_embed")
            .setDescription("query the embed u created")
            .addStringOption(
                option => option
                    .setName("title")
                    .setDescription(("query the embed by title"))
                    .setRequired(false)))
    .addSubcommand(
        command => command
            .setName("show_ticket_embed")
            .setDescription("show the ticket embed")
            .addStringOption(option => option
                .setName("title")
                .setDescription("query the embed by title")
                .setRequired(false))
    )


const execute = async (interaction: any) => {

    if (!(interaction.commandName === "ticket_bot")) {
        return
    }

    const sub_command = interaction.options.getSubcommand()

    await command_resolve(sub_command, interaction)

}


const command_resolve = async (subcommand: string, interaction: CommandInteraction) => {
    switch (subcommand) {
        case "set_ticket_embed":
            await setEmbedExec(interaction);
            break
        case "show_ticket_embed":
            await showEmbedExec(interaction);

    }
}

export default {
    command,
    execute
}

