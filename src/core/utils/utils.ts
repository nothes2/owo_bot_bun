import { ActionRowBuilder, EmbedBuilder, ModalBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputBuilder, TextInputStyle, type Interaction } from "discord.js";
import { image_placeholder } from "@core/global_variables.ts";

export const regex_match = (regex: RegExp, input: string): boolean => {
    return regex.test(input)
}

export const embed_builder = () => {
    return new EmbedBuilder()
        .setColor(0xFFFFFF)
        .setTitle("fill the title here")
        .setURL("http://localhost")
        .setThumbnail(`${image_placeholder}`)
        .setImage(`${image_placeholder}`)
        .setAuthor({
            name: "this is author",
            iconURL: `${image_placeholder}`,
            url: "http://localhost"
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
    { label: 'Footer', description: 'Change the footer', value: 'footer' }
]

export function menu_create(command?: boolean) {

    return new StringSelectMenuBuilder()
        .setCustomId("embed")
        .setPlaceholder('choose one component to change.')
        .addOptions(
            embed_options
                .filter(option => command || option.label !== "command")
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
    if (!(interaction.isStringSelectMenu())) return

    const modal = new ModalBuilder().setCustomId(option).setTitle(`Edit ${option}`)

    const row_input = new TextInputBuilder().setCustomId(`text_${option}`)
        .setLabel(option)

        // TODO set the style when choose to the specific option
        if (["command", "color", "timestamp"].includes(option)) {
            row_input.setStyle(TextInputStyle.Short)
        } else
        {
            row_input.setStyle(TextInputStyle.Paragraph)
        }
        
        const row = new ActionRowBuilder<TextInputBuilder>().addComponents(row_input)
        modal.addComponents(row)

    interaction.showModal(modal)
}