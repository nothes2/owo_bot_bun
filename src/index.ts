import { Client, IntentsBitField, Events } from "discord.js";

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages
    ]
})

client.on("ready", c => {
    console.log(`🚀 The bot ${c.user.username} is ready!`)
})

client.on("messageCreate", msg => {

    if(msg.author.bot) {
        console.log("msg sent by bot !")
        return;
    }

    if (msg.content === "hello") {
        console.log("aaa")
        msg.reply("hello").catch(e => console.error(e));
    }
})


client.login(process.env.BOT_TOKEN)
    .catch( err => console.log(err))