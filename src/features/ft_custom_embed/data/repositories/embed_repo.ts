import {type IfEmbedRepo} from "@features/ft_custom_embed/domain/interfaces/if_embed_repo.ts";
import {CustomEmbed} from "@features/ft_custom_embed/domain/entities/custom_embed.ts";
import {MongoDBClient} from "@core/db/mongodbClient.ts";

export class EmbedRepo implements IfEmbedRepo {
    private collection = MongoDBClient.getClient().db("rural_shop").collection("custom_embeds");

    constructor() {
    }

    delete(embed: CustomEmbed): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    update(embed: CustomEmbed): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async add(embed: CustomEmbed): Promise<boolean> {
        const result = await this.collection.insertOne(embed);
        return result.acknowledged;
    }

    async query(command: string): Promise<CustomEmbed | null> {
        try {
            const query = {
                command
            }

            const doc = await this.collection.findOne(query)

            if (!doc) {
                return null
            }

            const embed = new CustomEmbed();
            embed.command = doc.command;
            embed.embed = doc.embed;

            return embed;
        } catch (e) {
            console.error(e)
            return null
        }
    }

}