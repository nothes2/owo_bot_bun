import {
    ActionRowBuilder,
    type CommandInteraction,
    MessageFlagsBitField,
    StringSelectMenuBuilder, StringSelectMenuOptionBuilder
} from "discord.js";
import { embed_builder, menu_create } from "@core/utils/utils.ts";
import { ClassEmbed, ClassStringSelectMenuOption, embed_data } from "@core/data/general.ts";
import {
    addTicketController
} from "@features/ft_ticket_bot/presentation/controller/c_ticket_bot.ts";
import { setGlobalVariable } from "@core/global_variables.ts";
import { TicketEmbed } from "@features/ft_ticket_bot/domain/entities/ticket_embed.ts";

let action =
{
    label: "label",
    description: "description",
    value: "value",
    channel_id: "channel_id",
}

let placeholder = "default placeholder"
const embed = embed_builder()
let class_embed: ClassEmbed = embed_data(embed)
let menu = menu_create(false, true)

let actionMenu = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder().setCustomId("test").setPlaceholder(placeholder).addOptions(new StringSelectMenuOptionBuilder(
    ).setLabel(action.label).setDescription(action.description).setValue(action.value))
)
let test_row = new ActionRowBuilder<StringSelectMenuBuilder>(actionMenu)
let update_row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    menu
)

export const execute = async (interaction: CommandInteraction) => {
    let ticket_embed: TicketEmbed = new TicketEmbed(interaction.user.id, class_embed, [action], "default comment",placeholder)

    if (!(await addTicketController(ticket_embed))) {
        await interaction.reply({
            content: "server error, embed save failed!",
            flags: MessageFlagsBitField.Flags.Ephemeral,
        })
        return
    }

    setGlobalVariable("ticket_embed", ticket_embed)
    setGlobalVariable("update_row", update_row.toJSON())
    await interaction.reply({
        embeds: [embed],
        flags: MessageFlagsBitField.Flags.Ephemeral,
        components: [test_row.toJSON(), update_row.toJSON()],
        withResponse: true
    })
}
