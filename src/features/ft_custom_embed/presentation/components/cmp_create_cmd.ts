import {
    ActionRowBuilder,
    CommandInteraction,
    EmbedBuilder,
    StringSelectMenuBuilder,
} from "discord.js";
import {embed_builder, menu_create, regex_match} from "@core/utils/utils";
import {createEmbedController} from "@features/ft_custom_embed/presentation/controller/c_embed.ts";
import {handle_option} from "@features/ft_custom_embed/presentation/components/cmp_embed_selection.ts";
import {embed_data} from "@core/data/general.ts";

export default async function create_embed(interaction: CommandInteraction, command_name?: string) {

    if (!command_name) {
        await interaction.reply("command name not found")
        return
    }

    if (!command_format_detection(command_name)) {
        await interaction.reply("command format is not supported!")
        return
    }

    const embed: EmbedBuilder = embed_builder()
    const embed_entities = embed_data(embed)

    let flag = await createEmbedController(command_name, embed_entities)

    if (!flag) {
        await interaction.reply("error when creating embed")
        return
    }

    const menu = menu_create(true, false)
    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        menu
    )

    const response = await interaction.reply({
        embeds: [embed],
        components: [row.toJSON()],
        withResponse: true
    })

    await handle_option(response, command_name)
}

// extracted function
function command_format_detection(command: string) {
    const regex: RegExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regex_match(regex, command);
}