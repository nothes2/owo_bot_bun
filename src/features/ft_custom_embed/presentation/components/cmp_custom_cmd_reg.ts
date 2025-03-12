// import {REST, Routes, type SlashCommandBuilder} from "discord.js";
//
// const commands: SlashCommandBuilder[] = []
//
// const register_command = async () => {
//     const rest = new REST({version: "10"}).setToken(process.env.BOt_TOKEN ?? "");
//
//     try {
//         await rest.put(Routes.applicationGuildCommands(
//             process.env.CLIENT_ID ?? "",
//             process.env.GUILD_ID ?? ""
//         ), {body: commands})
//     } catch (e) {
//         console.error(e)
//     }
// }
//
// export default register_command
