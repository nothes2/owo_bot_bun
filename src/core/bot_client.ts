import {Client, IntentsBitField} from "discord.js";

export const global_client = () => {
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

