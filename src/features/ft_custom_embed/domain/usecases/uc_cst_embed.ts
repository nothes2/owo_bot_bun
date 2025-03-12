import type {IfEmbedRepo} from "@features/ft_custom_embed/domain/interfaces/if_embed_repo.ts";
import {type CustomEmbed} from "@features/ft_custom_embed/domain/entities/custom_embed.ts";
export class CreateEmbed {
    constructor(private embedRepo: IfEmbedRepo) {}

    async execute(custom_embed: CustomEmbed): Promise<boolean> {
        return this.embedRepo.add(custom_embed);
    }
}

export class QueryEmbed {
    constructor(private embedRepo: IfEmbedRepo) {}
    async execute(command: string): Promise<CustomEmbed | null> {
        return this.embedRepo.query(command)
    }
}