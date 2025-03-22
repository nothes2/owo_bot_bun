import type {Message} from "discord.js";
import type {MessageSave} from "@features/ft_ticket_bot/domain/entities/MessageSave.ts";

export interface MessageInterface {
    query(guildID?: string): Promise<Array<MessageSave> | null>;
    add(message: Message): Promise<boolean>;
    delete(messageID: string, channelID: string): Promise<boolean>;
    update(embed: Message): Promise<boolean>;
}