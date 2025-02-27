import {type CommandInteraction, EmbedBuilder, PermissionsBitField, SlashCommandBuilder} from "discord.js";
import {
    gif_arrow,
    gif_verified_purple,
    icon_atmcard,
    iconURL,
    title
} from "@features/ft_admin/domain/entities/global_variables.ts";

const command = new SlashCommandBuilder()
    .setName("nocard")
    .setDescription("show nocard embed")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)

const embed = new EmbedBuilder()
    .setColor('#FF13F0')
    .setAuthor({
        name: title,
        iconURL,
    })
    .setDescription(`
# ${title}
# ${gif_verified_purple} 無卡匯款
## ${icon_atmcard} 帳號 : 532540638484
### ${gif_arrow} 提醒您，繳費前請再次確認 帳號/金額 是否正確
### ${gif_arrow} 繳費完成請主動附上明細照片
        `
    )
    .setFooter({
        text: "𝐑𝐮𝐫𝐚𝐥𝐒𝐡𝐨𝐩田園小賣部 - 無卡匯款",
        iconURL,
    }).setThumbnail(iconURL)

const execute = async (interaction: CommandInteraction) => {
    await interaction.reply({embeds: [embed]});
}

export default {
    command,
    execute,
}