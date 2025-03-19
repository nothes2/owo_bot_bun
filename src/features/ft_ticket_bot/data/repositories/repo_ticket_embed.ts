import {MongoDBClient} from "@core/db/mongodbClient";
import type {TicketEmbed} from "@features/ft_ticket_bot/domain/entities/ticket_embed";
import type {IfTicketEmbedRepo} from "@features/ft_ticket_bot/domain/interfaces/if_ticket_embed_repo.ts";
import {getGlobalVariable, setGlobalVariable} from "@core/global_variables.ts";

export class TicketEmbedRepo implements IfTicketEmbedRepo {

    private collection
    private client
    constructor() {
         this.client = MongoDBClient.getClient()
        this.collection = this.client.db("rural_shop").collection("ticket_embed")
    }
    async query_all_by_userid(user_id: string): Promise<Array<TicketEmbed> | null> {
        const tickets_embed = await this.collection.find({user_id}).toArray()
        return tickets_embed.map(ticketEmbed => ({
            ...ticketEmbed,
        _id: ticketEmbed._id.toString()
        })) as TicketEmbed[]
    }
    async add(embed: TicketEmbed): Promise<boolean> {

        const result = await this.collection.insertOne({
            user_id: embed.user_id,
            embed: embed.embed,
            menu_item: embed.menu_item,
            placeholder: embed.placeholder
        })

        if(!result.acknowledged) {
            return false;
        }

        setGlobalVariable("current_ticket_embed_id", result.insertedId);
        return true
    }
    delete(embed: TicketEmbed): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async update(embed: TicketEmbed): Promise<boolean> {
        const id = getGlobalVariable("current_ticket_embed_id");

        const update_data = {
            $set: {
                "user_id": embed.user_id,
                "embed": embed.embed,
                "menu_item": embed.menu_item,
                "placeholder": embed.placeholder
            }
        }

        const result = await this.collection.updateOne({
            _id: id
        }, update_data);

        return result.modifiedCount > 0
    }
}