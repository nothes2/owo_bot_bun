import {type CommandInteraction, EmbedBuilder, PermissionsBitField, SlashCommandBuilder} from "discord.js";
import {color, gif_arrow, icon_youtube, iconURL, title} from "@features/ft_admin/domain/entities/global_variables.ts";

const command = new SlashCommandBuilder().setName("ytb").setDescription("show youtube embed").setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)

const embed = new EmbedBuilder().setColor(color).setAuthor({
    name: title,
    iconURL
}).setDescription(`
    # ${title}
    # ${icon_youtube} Youtube購買注意事項
    ## ${icon_youtube} 家庭個人邀請方案
    ### ${gif_arrow} 12個月內不能加入任何家庭
    ### ${gif_arrow} 繳費完成後請主動提供 𝐆𝐦𝐚𝐢𝐥
    ## ${icon_youtube} 家庭管理方案
    ### ${gif_arrow}購買前需要提供管理者的帳號密碼
    ### ${gif_arrow}確認可以開通海外家庭方案才可以繼續購買
    ### ${gif_arrow} 需要邀滿5個人，加上管理者總共6個人
    `).setFooter({
    text: "𝐑𝐮𝐫𝐚𝐥𝐒𝐡𝐨𝐩田園小賣部 - Youtube注意事項",
    iconURL
}).setThumbnail(iconURL)

const execute = async (interaction: CommandInteraction) => {
    await interaction.reply({embeds: [embed]})
}

export default {
    command,
    execute,
}