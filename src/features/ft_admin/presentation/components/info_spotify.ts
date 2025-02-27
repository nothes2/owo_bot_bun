import {type CommandInteraction, EmbedBuilder, PermissionsBitField, SlashCommandBuilder} from "discord.js";
import {
    gif_announcement,
    icon_spotify,
    iconURL,
    title,
    trail_channel
} from "@features/ft_admin/domain/entities/global_variables.ts";


const command = new SlashCommandBuilder()
    .setName("spotify")
    .setDescription("show spotify embed")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)

const embed = new EmbedBuilder()
    .setColor('#FF13F0')
    .setAuthor({
        name: title,
        iconURL,
    })
    .setDescription(`
    # ${title}
    # ${gif_announcement} 𝐒𝐩𝐨𝐭𝐢𝐟𝐲購買注意事項
    ### ${icon_spotify} 𝐒𝐩𝐨𝐭𝐢𝐟𝐲需要將登入方式改為一般登入
    ### ${icon_spotify} 若不知道如何更改請至 <#${trail_channel}> 查看
        `
    )
    .setFooter({
        text: "𝐑𝐮𝐫𝐚𝐥𝐒𝐡𝐨𝐩田園小賣部 - 𝐍𝐢𝐭𝐫𝐨購買注意事項",
        iconURL,
    }).setThumbnail(iconURL)

const execute = async (interaction: CommandInteraction) => {
    await interaction.reply({embeds: [embed]});
}

export default {
    command,
    execute,
}