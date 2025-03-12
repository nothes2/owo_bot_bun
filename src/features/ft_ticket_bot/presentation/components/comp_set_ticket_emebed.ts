import {
    ActionRowBuilder,
    type CommandInteraction,
    MessageFlagsBitField,
    type StringSelectMenuBuilder
} from "discord.js";
import {embed_builder, menu_create} from "@core/utils/utils.ts";
import {ClassEmbed, embed_data} from "@core/type/type_general.ts";
import {
    addTicketController
} from "@features/ft_ticket_bot/presentation/controller/c_ticket_bot.ts";

const embed = embed_builder()
let class_embed: ClassEmbed = embed_data(embed)
let menu = menu_create()

let action_row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu)

export const execute = async (interaction: CommandInteraction) => {

    if(!(await addTicketController(class_embed))) {
        await interaction.reply({
            content: "server error, embed save failed!",
            flags: MessageFlagsBitField.Flags.Ephemeral,
        })
        return
    }

    const response = await interaction.reply({
        embeds: [embed],
        flags: MessageFlagsBitField.Flags.Ephemeral,
        components: [action_row.toJSON()],
        withResponse: true
    })
}

// TODO save the data to database and write reset, update function

