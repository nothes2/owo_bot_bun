import {Client, IntentsBitField} from "discord.js";

const createClient = () => {
    return new Client({
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.DirectMessages,
        ],
    });
};

export default createClient;