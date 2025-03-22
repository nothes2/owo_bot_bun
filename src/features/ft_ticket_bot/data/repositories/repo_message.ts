import type {MessageSave} from "@features/ft_ticket_bot/domain/entities/MessageSave";
import type {MessageInterface} from "@features/ft_ticket_bot/domain/interfaces/if_message.ts";
import {ButtonComponent, type Message, StringSelectMenuComponent} from "discord.js";
import {MongoDBClient} from "@core/db/mongodbClient.ts";
import {type ClassStringMenuSelection, ClassStringSelectMenuOption} from "@core/data/general.ts";
import {row} from "mathjs";

export class MessageRepo implements MessageInterface {
    private collection
    private client

    constructor() {
        this.client = MongoDBClient.getClient()
        this.collection = this.client.db("rural_shop").collection("message")
    }

    async query(guildID?: string): Promise<Array<MessageSave> | null> {
        let result
        if (!guildID) {
            result = await this.collection.find().toArray()
        } else {
            result = await this.collection.find({guildID}).toArray();
        }

        return result.map(messageSave => ({
            ...messageSave,
            _id: messageSave._id.toString(),
        })) as MessageSave[]
    }

    async add(message: Message): Promise<boolean> {

        let messageData: ClassStringMenuSelection = {custom_id: "", placeholder: "", options: []}

        message.components.forEach(component => {
            component.components.forEach(component => {
                messageData.custom_id = component.customId ?? ""
                if (!(component instanceof ButtonComponent)) {
                    messageData.placeholder = component.placeholder ?? ""
                }
                messageData.disabled = component.disabled

                if (component instanceof StringSelectMenuComponent) {
                    component.options.forEach(option => {
                        messageData.options.push({
                            label: option.label,
                            value: option.value,
                            description: option.description ?? "",
                            emoji: option.emoji?.id ?? "",
                            isDefault: option.default
                        })
                    })
                }


            })
        })

        const result = await this.collection.insertOne({
            messageId: message.id,
            channelId: message.channelId,
            content: message.content,
            embeds: message.embeds.map(embed => embed.toJSON()),
            guildID: message.guild?.id,
            components: messageData
        });

        return !!result.acknowledged;
    }

    async delete(messageID: string, channelID: string): Promise<boolean> {
        const result = await this.collection.deleteOne({
            messageId: messageID,
            channelID: channelID,
        })
        return !!result.acknowledged;
    }

    update(embed: Message): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}