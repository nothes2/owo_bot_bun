import type { TicketEmbed } from "../entities/ticket_embed";
import type {TicketEmbedInterface} from "@features/ft_ticket_bot/domain/interfaces/if_ticket_embed.ts";

export class CreateTicketEmbed {
    constructor(private ticketEmbedRepo: TicketEmbedInterface) {}

    async execute(ticket_embed: TicketEmbed): Promise<boolean> {
        return this.ticketEmbedRepo.add(ticket_embed);
    }
}

export class UpdateTicketEmbed {
    constructor(private ticketEmbedRepo: TicketEmbedInterface) {}
    async execute(ticket_embed: TicketEmbed): Promise<boolean> {
        return this.ticketEmbedRepo.update(ticket_embed);
    }
}

export class QueryAllEmbedByUser{
    constructor(private ticketEmbedRepo: TicketEmbedInterface) {}
    async execute(user_id: string): Promise<Array<TicketEmbed> | null> {
        return this.ticketEmbedRepo.query_all_by_userid(user_id)
    }
}