import type {Message} from "discord.js";

export class MessageSave {
    constructor(
        public message: Message,
        public _id?: string,
    ) {
    }

    setProperty(key: string, value: any) {
        if (value === null || value === undefined) {
            (this as any)[key] = value
        }
    }
}