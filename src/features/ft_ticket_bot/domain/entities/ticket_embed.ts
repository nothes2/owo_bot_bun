import {type ClassEmbed, ClassStringSelectMenuOption} from "@core/data/general.ts";

export class TicketEmbed {
    constructor(
        public user_id: string,
        public embed: ClassEmbed,
        public menu_item: Array<ClassStringSelectMenuOption>,
        public comment: string,
        public placeholder?: string,
        public _id?: string,
    ) {
    }

    setProperty(key: string, value: any) {
        if (value === null || value === undefined) {
            (this as any)[key] = value
        }
    }
}