import {
    ActionRowBuilder,
    EmbedBuilder,
    type Interaction,
    ModalBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    TextInputBuilder,
    TextInputStyle,
} from "discord.js";
import {getGlobalVariable, image_placeholder} from "@core/global_variables.ts";
import type {ClassEmbed} from "@core/data/general.ts";

export const regex_match = (regex: RegExp, input: string): boolean => {
    return regex.test(input)
}

export const embed_builder = (embedData?: ClassEmbed) => {

    if (!embedData) {
        return new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setTitle("fill the title here")
            .setURL("http://localhost")
            .setThumbnail(`${image_placeholder}`)
            .setImage(`${image_placeholder}`)
            .setAuthor({
                name: "this is author",
                url: "http://localhost",
                iconURL: `${image_placeholder}`
            })
            .setDescription("This is a description")
            .setFields([
                {
                    name: "field name",
                    value: "field value",
                    inline: true
                }
            ]).setTimestamp(new Date()).setFooter(
                {
                    text: "afa",
                    iconURL: `${image_placeholder}`
                }
            )
    }

    const embed = new EmbedBuilder();

    if (embedData.color) embed.setColor(embedData.color);
    if (embedData.title) embed.setTitle(embedData.title);
    if (embedData.url) embed.setURL(embedData.url);
    if (embedData.thumbnail) embed.setThumbnail(embedData.thumbnail.url);
    if (embedData.image) embed.setImage(embedData.image.url);

    if (embedData.author) {
        embed.setAuthor({
            name: embedData.author.name,
            url: embedData.author.url,
            iconURL: embedData.author.iconURL,
        });
    }

    if (embedData.description) embed.setDescription(embedData.description);
    if (embedData.fields && embedData.fields.length > 0) embed.setFields(embedData.fields);
    if (embedData.timestamp) embed.setTimestamp(new Date(embedData.timestamp));

    if (embedData.footer) {
        embed.setFooter({
            text: embedData.footer.text,
            iconURL: embedData.footer.iconURL,
        });
    }

    return embed;
};

export const embed_options = [
    { label: 'command', description: 'change the command name', value: 'command' },
    { label: 'Color', description: 'Change the embed color', value: 'color' },
    { label: 'Title', description: 'Change the embed title', value: 'title' },
    { label: 'URL', description: 'Change the embed URL', value: 'url' },
    { label: 'Thumbnail', description: 'Change the thumbnail URL', value: 'thumbnail' },
    { label: 'Image', description: 'Change the image URL', value: 'image' },
    { label: 'Author', description: 'Change the author', value: 'author' },
    { label: 'Description', description: 'Change the description', value: 'description' },
    { label: 'Fields', description: 'Change the fields', value: 'fields' },
    { label: 'Timestamp', description: 'Change the timestamp', value: 'timestamp' },
    {label: 'Footer', description: 'Change the footer', value: 'footer'},
    {label: 'Menu', description: 'setting the menu option', value: 'menu'}
]

export function menu_create(command?: boolean, menu?: boolean) {
    return new StringSelectMenuBuilder()
        .setCustomId("embed")
        .setPlaceholder('choose one component to change.')
        .addOptions(
            embed_options
                .filter(option => (command || option.label !== "command") && (menu || option.label !== "Menu"))
                .map(option =>
                    new StringSelectMenuOptionBuilder()
                        .setLabel(option.label)
                        .setDescription(option.description)
                        .setValue(option.value)
                )
        )
}

export function embed_handle(interaction: Interaction) {
    if (!(interaction.isStringSelectMenu())) return

    const options = interaction.values[0];
    embed_modal(interaction, options)
}

export function embed_modal(interaction: Interaction, option: string) {

    const global = getGlobalVariable("ticket_embed");

    if (!interaction.isStringSelectMenu()) return;

    const modal = new ModalBuilder().setCustomId(option).setTitle(`Edit ${option}`);
    const rows: ActionRowBuilder<any>[] = [];

    const addTextInput = (id: string, label: string, value?: string) => {
        const input = new TextInputBuilder().setCustomId(id).setLabel(label).setStyle(TextInputStyle.Short).setValue(value?.toString() ?? "").setRequired(false);
        rows.push(new ActionRowBuilder<any>().addComponents(input));
    };

    switch (option) {
        case "author":
            addTextInput(`text_${option}_name`, "Author", global.embed.author.name);
            addTextInput(`text_${option}_url`, "URL", global.embed.author.url);
            addTextInput(`text_${option}_iconURL`, "Icon URL", global.embed.author.icon_url);
            break;

        case "fields":
        {
            let value = ""
            global.embed.fields.forEach((field: any) => {
                value += `${field.name}-${field.value}-${field.inline}\n`;
            })

            rows.push(
                new ActionRowBuilder<any>().addComponents(
                    new TextInputBuilder().setCustomId(`text_${option}`).setLabel("Add Fields").setStyle(TextInputStyle.Paragraph).setPlaceholder("name-value-[inline] [] stand for optional").setValue(value.trim()).setRequired(false)
                )
            );
        }
            break;
        case "footer":
            addTextInput(`text_${option}_text`, "Text", global.embed.footer.text);
            addTextInput(`text_${option}_iconURL`, "Icon URL", global.embed.footer.icon_url);
            break;
        case "color":
            addTextInput(`text_color`, "Color", global.embed["color"].toString(16));
            break;
        case "menu": {
            let value = ""
            global.menu_item.forEach((field: any) => {
                value += `${field.label}-${field.description}-${field.value}-${field.channel_id}\n`;
            })
            rows.push(
                new ActionRowBuilder<any>().addComponents(
                    new TextInputBuilder().setCustomId(`text_${option}_placeholder`).setLabel("Placeholder").setStyle(TextInputStyle.Short).setPlaceholder("customize your placeholder there").setValue(global.placeholder ?? "default placeholder"),
                )
            )
            rows.push(
                new ActionRowBuilder<any>().addComponents(
                    new TextInputBuilder().setCustomId(`text_${option}`).setLabel("Add menu option").setStyle(TextInputStyle.Paragraph).setPlaceholder("label-description-value").setValue(value.trim())
                )
            );
        }
            break;
        case "thumbnail":
            addTextInput(`text_${option}`, option, global.embed.thumbnail.url);
            break
        case "image":
            addTextInput(`text_${option}`, option, global.embed.image.url);
            break

        default:
            addTextInput(`text_${option}`, option, global.embed[option]);
    }

    modal.addComponents(rows);
    interaction.showModal(modal);
}

export function isValidHexColor(hex: string): boolean {
    const hexRegex = /^[0-9A-Fa-f]{6}$/;
    return !!hex.match(hexRegex);
}

export function isValidFieldData(data: string): boolean {
    const field = /([^-\n]+)-([^-\n]+)-([^-\n]+)-([^-\n]+)/g;
    return !!data.match(field);
}

export function isValidURL(url: string): boolean {
    const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+(\.[a-z]{2,})+([\/\w .-]*)*\/?$/;
    return regex.test(url);
}

export function create_custom_menu(actions: any[]) {
    const menu: StringSelectMenuOptionBuilder[] = []
    actions.forEach((action) => {
        menu.push(new StringSelectMenuOptionBuilder(
        ).setLabel(action.label).setDescription(action.description).setValue(action.value))
    })

    return menu;
}

export function format_ticket_code(ticket_code: number, len: number): string {
    return ticket_code.toString().padStart(len, '0');
}