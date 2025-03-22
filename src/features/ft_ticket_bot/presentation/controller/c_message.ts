import type {Message} from "discord.js";
import {MessageRepo} from "@features/ft_ticket_bot/data/repositories/repo_message.ts";
import {addMessage, queryMessage, removeMessage} from "@features/ft_ticket_bot/domain/usecases/uc_message.ts";

export const addMessageController = async (message: Message) => {
    const messageRepo = new MessageRepo();
    const addMessageUC = new addMessage(messageRepo);
    return await addMessageUC.execute(message)
}

export const removeMessageController = async (messageID: string, channelID: string) => {
    const messageRepo = new MessageRepo();
    const removeMessageUC = new removeMessage(messageRepo);
    return await removeMessageUC.execute(messageID, channelID)
}

export const queryMessageController = async (guildID?: string) => {
    const messageRepo = new MessageRepo();
    const queryMessageUC = new queryMessage(messageRepo)
    return await queryMessageUC.execute(guildID)
}