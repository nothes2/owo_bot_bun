import {type CommandInteraction, EmbedBuilder} from "discord.js";
import {queryEmbedController} from "@features/ft_custom_embed/presentation/controller/c_embed.ts";

export default async function cmd_query(interaction: CommandInteraction, command_name?: string) {
    if(!command_name) {
        await interaction.reply("please provide the command name to query")
        return
    }

    const data = await queryEmbedController(command_name)

    if(!(data && data.embed)) {
        await interaction.reply("command not found!")
        return
    }

    const embedEntries = Object.entries(data.embed)
    const embed = new EmbedBuilder()
   data_detect(embedEntries, embed)

    await interaction.reply({
        content: `command ${command_name} found! this is embed.`,
        embeds: [embed]
    })
}

function data_detect(entries: any, embed: EmbedBuilder) {
    for(let [key, value] of entries) {
        if(value === null || value === undefined) {
            console.warn(`command ${key} not found.`)
            continue
        }

        switch(key) {
            case "color": embed.setColor(value); break
            case "title": embed.setTitle(value); break
            case "thumbnail": embed.setThumbnail(value.url); break
            case "description": embed.setDescription(value); break
            case "image": embed.setImage(value.url); break
            case "url": embed.setURL(value); break
            case "author": embed.setAuthor({
                name: value.name,
                iconURL: value.iconURL ?? undefined,
                url: value.url ?? undefined
            }); break
            case "fields": embed.setFields(value); break
            case "timestamp": embed.setTimestamp(new Date(value)); break
            case "footer": embed.setFooter({
                text: value.text,
                iconURL: value.iconURL ?? undefined
            }); break
            default:
                console.warn("Unknown embed key: " + key)
        }
    }
}