import type { ClassEmbed } from "@core/type/type_general";
import type {IfRepoTicketBot} from "@features/ft_ticket_bot/domain/interfaces/if_repo_ticket_bot.ts";
import {MongoDBClient} from "@core/db/mongodbClient.ts";

export class RepoTicketBot implements IfRepoTicketBot {
    private collection = MongoDBClient.getClient().db("rural_shop").collection("ticket_bot");

    async add(embed: ClassEmbed): Promise<boolean> {
        let result
        try {
        result = await this.collection.insertOne(embed);
        }catch (e) {
            console.error("e")
        }
        return result?.acknowledged ?? false;
    }

    delete(embed: ClassEmbed): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    update(embed: ClassEmbed): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    query(embed: ClassEmbed): Promise<ClassEmbed | boolean> {
        throw new Error("Method not implemented.");
    }

}