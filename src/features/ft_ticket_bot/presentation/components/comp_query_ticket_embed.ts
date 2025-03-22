import {type CommandInteraction, EmbedBuilder} from "discord.js";
import {queryTicketController} from "@features/ft_ticket_bot/presentation/controller/c_ticket_bot.ts";
import {setGlobalVariable} from "@core/global_variables.ts";
import {TicketEmbed} from "@features/ft_ticket_bot/domain/entities/ticket_embed.ts";

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
    let data_group : {
        data: TicketEmbed,
        index: number
    }[] = []

    for (const value of result) {
        const user =  await interaction.client.users.fetch(value.user_id)
        content_str = `${index} | ${value._id} | ${user.username} | ${value.comment}`
        data_group.push({data: value, index})
        index++
    }

    setGlobalVariable("ticket_embed_group", data_group)
    embed.setDescription(content_str)

   await interaction.reply({
       embeds: [embed],
   })
}
