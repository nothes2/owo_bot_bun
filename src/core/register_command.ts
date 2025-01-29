import {REST, Routes} from "discord.js";

const commands = [
    {
        name: "hey",
        description: "replies here",
    }
];


const rest = new REST({version: "10"}).setToken(process.env.BOT_TOKEN ?? "");
console.log(`
    ${process.env.BOT_TOKEN},
    ${process.env.CLIENT_ID},
    ${process.env.GUILD_ID}
    `
);
(async () => {
    try {
        console.log("Registering commands...")
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID ?? "", process.env.GUILD_ID ?? ""), {body: commands})

        console.log("Successfully registered commands...")
    } catch (e) {
        console.log(e)
    }
})();