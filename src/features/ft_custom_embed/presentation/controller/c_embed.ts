import {EmbedRepo} from "@features/ft_custom_embed/data/repositories/embed_repo.ts";
import {CreateEmbed, QueryEmbed} from "@features/ft_custom_embed/domain/usecases/uc_cst_embed.ts";
import {CustomEmbed} from "@features/ft_custom_embed/domain/entities/custom_embed.ts";
import type {ClassEmbed} from "@core/type/type_general.ts";

const embed_repo = new EmbedRepo()


export const createEmbedController  = async (command: string, embed: ClassEmbed) => {
    const create_embed = new CreateEmbed(embed_repo);
    const custom_embed = new CustomEmbed()
    custom_embed.command = command
    custom_embed.embed = embed
    return await create_embed.execute(custom_embed);
}

export const queryEmbedController  = async (command: string) => {
    const query_embed = new QueryEmbed(embed_repo)
    return await query_embed.execute(command)
}