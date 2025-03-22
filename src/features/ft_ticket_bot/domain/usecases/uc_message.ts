import {MessageRepo} from "@features/ft_ticket_bot/data/repositories/repo_message.ts";
import type {Message} from "discord.js";

export class addMessage{
    constructor(private messageRepo: MessageRepo) {}

    async execute(message: Message): Promise<boolean> {
        return this.messageRepo.add(message);
    }

}

export class removeMessage {
    constructor(private messageRepo: MessageRepo) {

    }

    async execute(messageID: string, channelID: string): Promise<boolean> {
        return this.messageRepo.delete(messageID, channelID);
    }
}

export class queryMessage {
    constructor(private messageRepo: MessageRepo) {

    }

    async execute(guildID?: string) {
        return this.messageRepo.query(guildID)
    }
}
