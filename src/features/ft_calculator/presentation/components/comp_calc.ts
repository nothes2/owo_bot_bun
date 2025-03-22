import { getGlobalVariable, setGlobalVariable } from "@core/global_variables";
import { EmbedBuilder, type Client, type Message } from "discord.js";
import { evaluate, log, type BigNumber } from "mathjs";

const embed = new EmbedBuilder()

export async function calc_handle(client: Client) {
    client.on("messageCreate", async (message: Message) => {
        let messages: Map<any, any> = getGlobalVariable("calc_message")
        let userMode = getGlobalVariable("calc_mode")

        if(message.type === 20) return

        if (message.author.bot) {

            if(message.author.username !== "MIYU") return

            if(!userMode) {
                return
            }
            if(userMode.has(client.user?.id) && messages.has(client.user?.id)) {
               messages.get(client.user?.id).push(message.id)
               setGlobalVariable("calc_message", messages)
            }  
            return 
        }


        const user: Map<string, boolean> = getGlobalVariable("calc_mode")
        if (!user || !(user.has(message.author.id))) return
          
        if(user.has(message.author.id) && messages.get(message.author.id)) {
            messages.get(message.author.id).push(message.id)
            setGlobalVariable("calc_message", messages)
        }
        
        let calculation = message.content
        if (message.content.startsWith('+') ||
            message.content.startsWith('-') ||
            message.content.startsWith('*') ||
            message.content.startsWith('/')) {
            let g_result = parseInt(getGlobalVariable("calc_result"))

            if (g_result === null) {
                await message.reply("❌ you don't have a result! make sure u calcualated something before using this!")
                return
            }
            calculation = g_result + calculation
        }
        let result: BigNumber
        try {
            result = evaluate(calculation)
            embed.setDescription(`result: ${result}`)
            setGlobalVariable("calc_result", result.toString())
            await message.reply({embeds: [embed]})
        } catch (e) {
            await message.reply({
                content: "⚠️ invalid expression, remember you are in the caluator environment! use `/calc exit` to quit the calulator environment.",
            })
            return
        }

    })
}