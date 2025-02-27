import {type CommandInteraction, PermissionsBitField, SlashCommandBuilder} from "discord.js";
import {regex_match} from "@core/utils/utils.ts";

const command = new SlashCommandBuilder()
    .setName("create_embed")
    .setDescription("Create customized embed")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addStringOption(option => option.setName("command_name").setDescription("the name of the custom command").setRequired(true))

const regex: RegExp = new RegExp("\"^[a-zA-Z0-9]+$\"");


const execute = async (interaction: CommandInteraction) => {
    const option = interaction.options.get('command_name')
    let option_value = option?.value?.toString() ?? ""
    if(!regex_match(regex, option_value)) {
        await interaction.reply("option value ")
    }

}



export default {
    command,
    execute,
}