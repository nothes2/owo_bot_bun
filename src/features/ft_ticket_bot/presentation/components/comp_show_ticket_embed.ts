import {type CommandInteraction, EmbedBuilder} from "discord.js";
import {queryTicketController} from "@features/ft_ticket_bot/presentation/controller/c_ticket_bot.ts";

const embed = new EmbedBuilder()

export const execute = async (interaction: CommandInteraction) => {
// TODO show embed logic
//     global parameter settings
    const user_id = interaction.user.id;
    const result = await queryTicketController(user_id)
    let content_str: string = "Embed List created by you: \n"

    if(!result){
        await interaction.reply("❌ your list is empty!")
        return
    }

    let index = 0
    for (const value of result) {
        const user =  await interaction.client.users.fetch(value.user_id)
        const username = user.username
        content_str += `${index} \t- \t${value._id} \t- \t${username}\n`
        index++
    }
    embed.setDescription(content_str)

   await interaction.reply({
       embeds: [embed],
   })
}