import {type CommandInteraction, PermissionsBitField, SlashCommandBuilder} from "discord.js";
import {execute as calcEnterExec} from "@features/ft_calculator/presentation/components/comp_calc_enter"
import {execute as calcExitExec} from "@features/ft_calculator/presentation/components/comp_calc_exit"
import {execute as calcHistroyExec} from "@features/ft_calculator/presentation/components/comp_calc_history"
import {execute as calcCleanExec} from "@features/ft_calculator/presentation/components/comp_calc_clean"
const command = new SlashCommandBuilder().setName("calc").setDescription("enter the calc mode")
    .addSubcommand(command => command.setName("enter").setDescription("enter the calc mode"))
    .addSubcommand(command => command.setName("exit").setDescription("exit calc mode"))
    .addSubcommand(command => command.setName("clean").setDescription("clean the result"))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)

const execute = async (interaction: any) => {
    if(!(interaction.commandName === "calc")) return

    const sub_command = interaction.options.getSubcommand()

    await command_resolve(sub_command, interaction)
}

const command_resolve = async (subcommand: string, interaction: CommandInteraction) => {
    switch (subcommand) {
        case "enter":
            await calcEnterExec(interaction);
            break
        case "exit":
            await calcExitExec(interaction);
            break;
        case "history":
            await calcHistroyExec(interaction);
            break;
        case "clean":
            await calcCleanExec(interaction);


    }
}

export default {
    command,
    execute,
}