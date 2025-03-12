import {
    type APIEmbedImage,
    type APIEmbedThumbnail,
    CommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder
} from "discord.js";

export interface Feature {
    command: SlashCommandBuilder;
    execute(interaction: CommandInteraction): Promise<void>;
}

export type hexColor = number
export type url = string

export class ClassEmbed {
    constructor(
        public color?: hexColor,
        public title?: string,
        public thumbnail?: APIEmbedThumbnail,
        public image?: APIEmbedImage,
        public url?: url,
        public author?: {
            name: string;
            url?: string;
            iconURL?: string;
        },
        public description?: string,
        public fields?: Array<{ name: string; value: string; inline?: boolean }>,
        public timestamp?: string,
        public footer?: {
            text: string;
            iconURL?: string;
        }
    ) {

    }
}

export const  embed_data = (embed: EmbedBuilder) => {
    return new ClassEmbed(
        embed.data.color,
        embed.data.title,
        embed.data.thumbnail,
        embed.data.image,
        embed.data.url,
        embed.data.author,
        embed.data.description,
        embed.data.fields,
        embed.data.timestamp,
        embed.data.footer)
}
