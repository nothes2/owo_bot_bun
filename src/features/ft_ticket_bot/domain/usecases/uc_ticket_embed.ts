import type { TicketEmbed } from "../entities/ticket_embed";
import type {IfTicketEmbedRepo} from "@features/ft_ticket_bot/domain/interfaces/if_ticket_embed_repo.ts";

export class CreateTicketEmbed {
    constructor(private ticketEmbedRepo: IfTicketEmbedRepo) {}

    async execute(ticket_embed: TicketEmbed): Promise<boolean> {
        return this.ticketEmbedRepo.add(ticket_embed);
    }
}

export class UpdateTicketEmbed {
    constructor(private ticketEmbedRepo: IfTicketEmbedRepo) {}
    async execute(ticket_embed: TicketEmbed): Promise<boolean> {
        return this.ticketEmbedRepo.update(ticket_embed);
    }
}

export class QueryAllEmbedByUser{
    constructor(private ticketEmbedRepo: IfTicketEmbedRepo) {}
    async execute(user_id: string): Promise<Array<TicketEmbed> | null> {
        return this.ticketEmbedRepo.query_all_by_userid(user_id)
    }
}