import {
    ActionRowBuilder,
    type ActionRowData, type AnyComponentBuilder,
    type APIMessageActionRowComponent, ButtonBuilder,
    type Client,
    EmbedBuilder, type JSONEncodable,
    type Message, StringSelectMenuBuilder,
    TextChannel
} from "discord.js";
import {queryMessageController} from "@features/ft_ticket_bot/presentation/controller/c_message.ts";

export const revive_message = async (client: Client) => {

    const messages = await queryMessageController()
    if(!messages || messages.length === 0) {
        console.info("ℹ️ can't find any message from this server, skip the message revive step.")
        return
    }

    for(const data of messages) {
        const guild = client.guilds.cache.get(data.message.guildID)
        if(!guild) {
            console.info("ℹ️ channel not found, deleting the message from database.")
            continue
        }

        const channel = guild.channels.cache.get(data.message.channelID) as TextChannel
        if(!channel) {
            console.info("ℹ️ channel not found, deleting the message from database.")
            continue
        }

        const message: Message | null = await channel.messages.fetch(data.message.messageId);

        if(!message) {
            console.info("ℹ️ message not found, deleting the message from database.")
            continue
        }

        const newEmbeds = data.message.embeds.map((embedData: any) => EmbedBuilder.from(embedData));

        const actionRow = new ActionRowBuilder().addComponents(
            // new StringSelectMenuBuilder().setCustomId(),
        )

        await message.edit({
            embeds: newEmbeds,
            // components:
        })
    }


}