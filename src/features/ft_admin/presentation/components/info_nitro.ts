import {type CommandInteraction, EmbedBuilder, PermissionsBitField, SlashCommandBuilder} from "discord.js";
import {
    gif_announcement,
    gif_arrow,
    gif_nitro,
    iconURL,
    title,
    trail_channel
} from "@features/ft_admin/domain/entities/global_variables.ts";

const command = new SlashCommandBuilder()
    .setName("nitro")
    .setDescription("show nitro embed")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)

const embed = new EmbedBuilder()
    .setColor('#FF13F0')
    .setAuthor({
        name: title,
        iconURL,
    })
    .setDescription(`
       # ${title}
       # ${gif_announcement} 𝐍𝐢𝐭𝐫𝐨購買注意事項
       ## ${gif_nitro}𝐍𝐢𝐭𝐫𝐨 贈禮版
       ### ${gif_arrow} 贈禮版需要在48小時內領取完畢
       ## ${gif_nitro} 𝐍𝐢𝐭𝐫𝐨 登入版
       ### ${gif_arrow} 若你的帳號還有會員，則不適用登入版
       ### ${gif_arrow} 若你的帳號還有免費試用，需自行將其用掉
       ### ${gif_arrow} 登入版需要皆需要提供 帳號 / 密碼 / 備份碼
       ### ${gif_arrow} 獲取備份碼可以至 <#${trail_channel}> 查看
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