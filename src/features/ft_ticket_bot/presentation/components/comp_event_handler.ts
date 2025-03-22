import {
    create_custom_menu,
    embed_builder,
    embed_handle,
    embed_options, format_ticket_code,
    isValidFieldData,
    isValidHexColor,
} from "@core/utils/utils.ts";
import {
    ActionRowBuilder,
    Client, GuildChannel,
    type Interaction, MessageFlagsBitField,
    StringSelectMenuBuilder,
    ChannelType,
} from "discord.js";
import {getGlobalVariable, setGlobalVariable} from "@core/global_variables.ts";
import {updateTicketEmbedController} from "@features/ft_ticket_bot/presentation/controller/c_ticket_bot.ts";
import type {SelectItem} from "@features/ft_ticket_bot/data/type/general.ts";

let global


export async function handle_select_menu(client: Client) {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if(!(interaction.isStringSelectMenu())) return
        console.log(interaction.customId);
        switch (interaction.customId) {
            case "embed":
                embed_handle(interaction);break
            case "ticket_menu":
                await ticket_menu_handle(interaction); break
            default:
                break;
        }
    })
    
}

async function ticket_menu_handle(interaction: Interaction) {
    if(!interaction.isStringSelectMenu()) return;

    let ticket_code_str = getGlobalVariable("ticket_code");
    let ticket_code = parseInt(ticket_code_str)
    ticket_code++
    setGlobalVariable("ticket_code", format_ticket_code(ticket_code, 4));

    const global = getGlobalVariable("ticket_embed").menu_item;
    const value = interaction.values
    const item = global.find((item: SelectItem) => item.value === value[0])
    const channel_id = item.channel_id

    const user_id = interaction.user.id
    const user = await interaction.guild?.members.fetch(user_id)

    const new_channel = await interaction.guild?.channels.create({
        name: `${value[0]} ${ticket_code_str}`,
        type: ChannelType.GuildText,
        parent: channel_id,
    })

    if(!new_channel) {
        await interaction.reply({
            content: "❌ Failed to create channel.",
            flags: MessageFlagsBitField.Flags.Ephemeral,
        })
        return
    }

    await new_channel.permissionOverwrites.edit(interaction.guild!.roles.everyone, {
        ViewChannel: false,
    });
    await new_channel.permissionOverwrites.edit(user!, {
        ViewChannel: true,
        SendMessages: true
    })

    new_channel.send(`new ticket create successfully !`)
}

export function handle_modal_submit(client: Client) {
    const handlers: Record<string, (interaction: Interaction) => void> = Object.fromEntries(
        embed_options.map(({value}) => [value, (interaction) => generic_handle(interaction, value)])
    );

    client.on("interactionCreate", async (interaction: Interaction) => {
        if (!interaction.isModalSubmit()) return;

        const handler = handlers[interaction.customId];
        if (handler) {
            handler(interaction);
        } else {
            console.warn(`No handler found for modal submit: ${interaction.customId}`);
        }
    });
}

async function generic_handle(interaction: any, type: string) {
    const fieldKeys: Record<string, string[]> = {
        author: ["text_author_name", "text_author_url", "text_author_iconURL"],
        footer: ["text_footer_text", "text_footer_iconURL"],
        menu: ["text_menu_placeholder", "text_menu"]
    };

    const keys = fieldKeys[type] || [`text_${type}`];

    const values = keys.map(key => interaction.fields.getTextInputValue(key) || null);

    console.log(`Handling modal for: ${type}`, values);

    switch (type) {
        case "author":
            await handle_author(interaction, values);
            break;
        case "footer":
            await handle_footer(interaction, values);
            break;
        case "fields":
            await handle_fields(interaction, values[0]);
            break;
        case "color":
            await handle_color(interaction, values[0]);
            break;
        case "thumbnail":
            await handle_thumbnail(interaction, values[0]);
            break;
        case "menu":
            await handle_menu_item(interaction, values);
            break;
        case "comment":
            await handle_comment(interaction, values[0]);
            break;
        default:
            await handle_generic(type, interaction, values[0]);
            break;
    }
}
async function handle_comment(interaction: any, value: string | null) {
    global = getGlobalVariable("ticket_embed");
    if(!value) {
        interaction.reply({
            content: "❌ you need a comment !",
            flags: MessageFlagsBitField.Flags.Ephemeral,
        })
        return
    }

    global.comment = value
    setGlobalVariable("ticket_embed", global)
    if (!await updateTicketEmbedController(global)) {
        console.error("modified error")
        return
    }

    interaction.update({
        embeds: [embed_builder(global.embed)]
    })
}

async function handle_color(interaction: any, value: string | null) {
    global = getGlobalVariable('ticket_embed')

    if (!value) {
        delete global.embed.color
    } else {
        if (!isValidHexColor(value)) {
            interaction.reply("the hex value of the color is illegal !")
            return
        }
        global.embed.color = value
    }

    setGlobalVariable("ticket_embed", global)
    if (!await updateTicketEmbedController(global)) {
        console.error("modified error")
        return
    }

    interaction.update({
        embeds: [embed_builder(global.embed)]
    })
}

async function handle_thumbnail(interaction: any, value: string | null) {
    global = getGlobalVariable('ticket_embed')

    if (!value) {
        delete global.embed.thumbnail
    } else {
        global.embed.thumbnail.url = value;
    }

    if (!await updateTicketEmbedController(global)) {
        console.error("modified error")
        return
    }

    interaction.update({
        embeds: [embed_builder(global.embed)]
    })
}

async function handle_fields(interaction: any, values: string) {
    global = getGlobalVariable('ticket_embed')
    const fields: { name: string, value: string, inline: boolean }[] = [];

    if (!values) {
        delete global.embed.fields
    } else {
        if (!isValidFieldData(values)) {
            interaction.reply("format is not valid!")
        }

        const regex = /([^-\n]+)-([^-\n]+)-([^-\n]+)/g;

        let match
        while ((match = regex.exec(values)) !== null) {
            const [_, name, value, inline] = match;
            fields.push({name, value, inline: inline === "true"});
        }

    }

    global.embed.fields = fields;
    if (!await updateTicketEmbedController(global)) {
        console.error("modified error")
        return
    }

    interaction.update({
        embeds: [embed_builder(global.embed)]
    })
}

async function handle_author(interaction: any, values: (string | null)[]) {
    global = getGlobalVariable('ticket_embed')

    if (!values[0]) {
        delete global.embed.author

    } else {
        global.embed.author = {name: values[0] ?? "", url: values[1], iconURL: values[2]};
    }

    if (!await updateTicketEmbedController(global)) {
        console.log("modified error")
        return
    }
    interaction.update({
        embeds: [embed_builder(global.embed)]
    })
}

async function handle_generic(type: string, interaction: any, value: (string | null)) {
    global = getGlobalVariable('ticket_embed')

    if (type === "description" && !value) {
        interaction.reply(`u should give a ${type} !`)
    }

    if (!value) {
        delete global.embed[type];
    } else {
        global.embed[type] = value
    }

    if (!await updateTicketEmbedController(global)) {
        console.error("modified error")
        return
    }

    interaction.update({
        embeds: [embed_builder(global.embed)]
    })

}

async function handle_footer(interaction: any, values: (string | null)[]) {
    global = getGlobalVariable('ticket_embed')

    if (!values[0]) {
        delete global.embed.footer
    } else {
        global.embed.footer = {text: values[0] ?? ""};

        if (!values[1]) {
            delete global.embed.footer.iconURL
        } else {
            global.embed.footer.iconURL = values[1]
        }
    }

    if (!await updateTicketEmbedController(global)) {
        console.log("modified error")
        return
    }
    interaction.update({
        embeds: [embed_builder(global.embed)]
    })
}

async function handle_menu_item(interaction: any, values: (string | null)[]) {
    global = getGlobalVariable('ticket_embed')
    const select_item: {label: string, description: string, value: string, channel_id: string }[] = [];

    if(!values[0]) {
        interaction.reply("you should set the option!")
    }
    console.log(values[1])
    if (!isValidFieldData(values[1]!)) {
        interaction.reply({
            content: "❌ item format error, plz check ur format!",
            flags: MessageFlagsBitField.Flags.Ephemeral,
        })
        return
    }

    const regex = /([^-\n]+)-([^-\n]+)-([^-\n]+)-([^-\n]+)/g;

    let match
    while ((match = regex.exec(values[1]!)) !== null) {
        const [_, label, description, value, channel_id] = match;
        select_item.push({label, description, value, channel_id});
    }

    for (const item of select_item) {
        const category = interaction.guild.channels.cache.find((channel: GuildChannel) => channel.id === item.channel_id && channel.type === 4)

        if(!category) {
            interaction.reply({content: `❌ category ID ${item.channel_id} cannot be found! please make sure u choose the right category`, flags: MessageFlagsBitField.Flags.Ephemeral,})
            return
        }
    }

    global.menu_item = select_item
    global.placeholder = values[0]
    if (!await updateTicketEmbedController(global)) {
        console.log("modified error")
        return
    }

    const custom_menu = create_custom_menu(global.menu_item);
    const menu = new StringSelectMenuBuilder().setCustomId("ticket_menu").setPlaceholder(values[0] ?? "").addOptions(
        custom_menu
    )
    const row = new ActionRowBuilder().addComponents(menu)

    await interaction.update({
        embeds: [embed_builder(global.embed)],
        components: [row.toJSON(), getGlobalVariable('update_row')],
    })
}