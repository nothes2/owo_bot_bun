import {type CommandInteraction, EmbedBuilder, PermissionsBitField, SlashCommandBuilder} from "discord.js";
import {
    gif_arrow,
    gif_hearts,
    icon_valorant,
    iconURL,
    title
} from "@features/ft_admin/domain/entities/global_variables.ts";

const command = new SlashCommandBuilder()
    .setName("valo")
    .setDescription("Valorant")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)

const embed_valorant = new EmbedBuilder()
    .setColor('#FF13F0')
    .setAuthor({
        name: title,
        iconURL: iconURL,
    })
    .setDescription(`
        # ${title}
        #  ${icon_valorant} 特戰英豪儲值必填表單
        ### ${gif_hearts} 繳費完畢后主動提交此表單
        ### ${gif_arrow} 登陸方式： (Riot/Google/Facebook)
        ### ${gif_arrow} 帳號：
        ### ${gif_arrow} 密碼：
        ### ${gif_arrow} RIOT名稱：
        ### ${gif_arrow} 目前點數剩餘：
        ### ${gif_arrow} 購買商品：
        `
    )
    .setFooter({
        text: "特戰英豪代儲專用表單",
        iconURL,
    }).setThumbnail(iconURL)

const execute = async (interaction: CommandInteraction) => {
    await interaction.reply({embeds: [embed_valorant]});
}

export default {
    command,
    execute,
}