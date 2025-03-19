import { TicketEmbedRepo } from "@features/ft_ticket_bot/data/repositories/repo_ticket_embed";
import {TicketEmbed} from "@features/ft_ticket_bot/domain/entities/ticket_embed.ts";
import {
    CreateTicketEmbed,
    QueryAllEmbedByUser,
    UpdateTicketEmbed
} from "@features/ft_ticket_bot/domain/usecases/uc_ticket_embed";

export const addTicketController = async (embed: TicketEmbed) => {
    const ticketEmbedRepo = new TicketEmbedRepo()
    const create_embed = new CreateTicketEmbed(ticketEmbedRepo)
   
    return await create_embed.execute(embed)
}

export const updateTicketEmbedController = async (embed: TicketEmbed) => {
    const ticketEmbedRepo = new TicketEmbedRepo()
    const update_embed = new UpdateTicketEmbed(ticketEmbedRepo)

    return await update_embed.execute(embed)
}

export const queryTicketController = async (user_id: string) => {
    const ticketEmbedRepo = new TicketEmbedRepo()
    const query_embed = new QueryAllEmbedByUser(ticketEmbedRepo)
    return await query_embed.execute(user_id)
}