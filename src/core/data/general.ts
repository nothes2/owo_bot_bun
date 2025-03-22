import {type APIEmbedImage, type APIEmbedThumbnail, type APIEmbed, type APIActionRowComponent, type APIMessageActionRowComponent,EmbedBuilder, SlashCommandBuilder} from "discord.js";

export type hexColor = number
export type url = string

export interface Feature {
    command: SlashCommandBuilder;

    execute(interaction: any): Promise<void>;
}

export class ClassMessage {

    constructor(
        public messageId: string,
        public channelID: string,
        public content: string,
        public embeds: APIEmbed[],
        public guildID: string,
        public components: ClassStringMenuSelection
    ) {}
}


export class ClassStringMenuSelection {
    constructor(
        public custom_id: string,
        public placeholder: string,
        public options: ClassStringSelectMenuOption[],
        public disabled?: boolean,
    ) {
    }
}

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

export class ClassStringSelectMenuOption {
    constructor(
        public label: string,
        public description: string,
        public value: string,
        public emoji: string,
        public isDefault?: boolean,
        public channel_id?: string
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
