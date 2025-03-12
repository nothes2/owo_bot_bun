import {CustomEmbed} from "@features/ft_custom_embed/domain/entities/custom_embed.ts";

export interface IfEmbedRepo {
    query(command: string): Promise<CustomEmbed | null>;
    add(embed: CustomEmbed): Promise<boolean>;
    delete(embed: CustomEmbed): Promise<boolean>;
    update(embed: CustomEmbed): Promise<boolean>;
}