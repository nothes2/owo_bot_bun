import {AddTicketEmbed} from "@features/ft_ticket_bot/domain/usecases/sc_ticket_bot.ts";
import {RepoTicketBot} from "@features/ft_ticket_bot/data/repositories/repo_ticket_bot.ts";
import type {ClassEmbed} from "@core/type/type_general.ts";

const ticketEmbedRepo = new RepoTicketBot()

export const addTicketController = (embed: ClassEmbed) => {
    const add_ticket_embed = new AddTicketEmbed(ticketEmbedRepo)
    return add_ticket_embed.execute(embed)
}