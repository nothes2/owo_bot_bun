import type { TicketEmbed } from "../entities/ticket_embed";

export interface TicketEmbedInterface {
    query_all_by_userid(command: string): Promise<Array<TicketEmbed> | null>;
    add(embed: TicketEmbed): Promise<boolean>;
    delete(embed: TicketEmbed): Promise<boolean>;
    update(embed: TicketEmbed): Promise<boolean>;
}