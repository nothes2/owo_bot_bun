import {ActionRowBuilder, Message, MessageFlagsBitField, StringSelectMenuBuilder} from "discord.js";
import {getGlobalVariable, setGlobalVariable} from "@core/global_variables.ts";
import type {TicketEmbed} from "@features/ft_ticket_bot/domain/entities/ticket_embed.ts";
import {create_custom_menu, embed_builder} from "@core/utils/utils.ts";
import {addMessageController} from "@features/ft_ticket_bot/presentation/controller/c_message.ts";

export const execute = async (interaction: any) => {
    const option = interaction.options.getString("index")

    if(!option) {
        const global = await getGlobalVariable("ticket_embed")

        if(!global) {
            interaction.reply({
                content: "❌ data can not be found.",
                flags: MessageFlagsBitField.Flags.Ephemeral
            })
            return
        }

        await check_embed(global.placeholder, interaction)

        const action = create_custom_menu(global.menu_item)
        let actionMenu = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder().setCustomId("ticket_menu").setPlaceholder(global.placeholder).addOptions(
                action
            ))

        const embed = embed_builder(global.embed)

        await interaction.reply({
            embeds: [embed],
            components: [actionMenu],
        })
        return
    }


    if(!(typeof parseInt(option) === "number")) {
        await interaction.reply({
            content: "❌ please enter a valid number!",
            flags: MessageFlagsBitField.Flags.Ephemeral
        })
        return
    }

    const data_group = getGlobalVariable("ticket_embed_group")

    const data_item = data_group.find((data: {data: TicketEmbed, index: number}) => data.index === parseInt(option));

    if (!data_group || !data_item) {
        await interaction.reply({
            content: "❌ can't find any embed, are you sure u listed all embed before use this ?",
            flags: MessageFlagsBitField.Flags.Ephemeral
        })
        return
    }

    await check_embed(data_item.data.placeholder, interaction)

    setGlobalVariable("ticket_embed", data_item.data)

    const action = create_custom_menu(data_item.data.menu_item)
    let actionMenu = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        new StringSelectMenuBuilder().setCustomId("ticket_menu").setPlaceholder(data_item.data.placeholder).addOptions(
            action
    ))

    const embed = embed_builder(data_item.data.embed)
    const response = await interaction. reply({
        embeds: [embed],
        components: [actionMenu],
        withResponse: true
    })

    if(!await addMessageController(response.resource.message)) {
        console.warn("⚠️ message data failed to save, u can't use the message component sent after restart the bot!")
        return
    }

    console.info("ℹ️ message data saved successfully.")
}

async function check_embed(placeholder: string, interaction: any) {
    if(placeholder === "default placeholder") {
        await interaction.reply({
            content: "❓ you didn't edit this embed before use this! the dropdown menu would not work!",
            flags: MessageFlagsBitField.Flags.Ephemeral
        })
    }
}