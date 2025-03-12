
import type {ClassEmbed} from "@core/type/type_general.ts";
import type {IfRepoTicketBot} from "@features/ft_ticket_bot/domain/interfaces/if_repo_ticket_bot.ts";

export class AddTicketEmbed {
    constructor(private embedRepo: IfRepoTicketBot) {}

    async execute(embed: ClassEmbed) {
        return this.embedRepo.add(embed)
    }
}
