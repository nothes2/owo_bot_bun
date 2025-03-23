import { getGlobalVariable, setGlobalVariable } from "@core/global_variables";
import { EmbedBuilder, type Client, type Message } from "discord.js";
import { evaluate, log, type BigNumber } from "mathjs";
import { execute as calcExitExec } from "@features/ft_calculator/presentation/components/comp_calc_exit"

const embed = new EmbedBuilder()

export async function calc_handle(client: Client) {
    client.on("messageCreate", async (message: Message) => {
        let messages: Map<any, any> = getGlobalVariable("calc_message")
        let userMode = getGlobalVariable("calc_mode")

        if (message.type === 20) return

        if (message.author.bot) {

            if (message.author.username !== "MIYU") return

            if (!userMode) {
                return
            }
            if (userMode.has(client.user?.id) && messages.has(client.user?.id)) {
                messages.get(client.user?.id).push(message.id)
                setGlobalVariable("calc_message", messages)
            }
            return
        }

        const user: Map<string, boolean> = getGlobalVariable("calc_mode")
        if (!user || !(user.has(message.author.id))) return

        if (user.has(message.author.id) && messages.get(message.author.id)) {
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
                await message.reply("❌ 請在使用此語法前先進行至少一項計算.")
                return
            }
            calculation = g_result + calculation
        }
        let result: BigNumber
        try {
            result = evaluate(calculation)

            // 美化 Embed
            embed.setAuthor({
                name: `${message.guild?.name} 計算機`,
                iconURL: message.guild?.iconURL() || undefined
            })
            embed.setDescription(`## **<a:990512686158737409:1332543398225383606> 計算結果** : \`${result}\``)
            embed.setColor(0xFF13F0)
            embed.setFooter({
                text: `${message.author.username}`,
                iconURL: message.author.displayAvatarURL()
            })

            setGlobalVariable("calc_result", result.toString())
            await message.reply({ embeds: [embed] })
        } catch (e) {
            await message.reply({
                content: "⚠️ 检测到非数学语法，退出计算模式",
            })

            user.delete(message.author.id)
            setGlobalVariable("calc_mode", user)
            return
        }

    })
}