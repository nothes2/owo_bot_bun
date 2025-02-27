import {type CommandInteraction, EmbedBuilder, PermissionsBitField, SlashCommandBuilder} from "discord.js";
import {
    color,
    gif_arrow,
    gif_verified_purple,
    icon_atmcard,
    iconURL,
    title
} from "@features/ft_admin/domain/entities/global_variables.ts";

const command = new SlashCommandBuilder().setName("bank").setDescription("show bank embed").setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)

const img_link = "https://media.discordapp.net/attachments/1333837807055011910/1334429068787191859/0C0AB928-9297-4C15-B698-462623B408F3.png?ex=67c1696a&is=67c017ea&hm=14f582ba4db7a9d1a4d0c7c9c19e94a7c934348c27590e6003e3c6c65379204d&=&format=webp&quality=lossless&width=310&height=671"

const embed = new EmbedBuilder().setColor(color).setAuthor({
    name: title,
    iconURL
}).setDescription(`
    # RuralShop田園小賣部
    # ${gif_verified_purple} 網銀轉賬
    ## ${icon_atmcard} 銀行 : 將來銀行 ( 823 )
    ## ${icon_atmcard} 帳號 : 8863-1060-3577-18
    ### ${gif_arrow} 提醒您，轉帳前請再次確認 帳號/金額 是否正確
    ### ${gif_arrow} 繳費完成後請配合防三方驗證
    ### ${gif_arrow} 將我們的對話紀錄以及匯款成功之畫面同框截圖
    `).setImage(img_link).setFooter({
    text: "𝐑𝐮𝐫𝐚𝐥𝐒𝐡𝐨𝐩田園小賣部 - 網銀轉帳",
    iconURL
}).setThumbnail(iconURL)

const execute = async (interaction: CommandInteraction) => {
    await interaction.reply({embeds: [embed]})
}

export default {
    command,
    execute,
}