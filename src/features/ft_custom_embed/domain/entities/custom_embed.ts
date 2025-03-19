import {ClassEmbed} from "@core/data/general.ts";

export class CustomEmbed {
    constructor(
        public command?: string,
        public embed?: ClassEmbed
    ) {
    }

    setProperty(key: string, value: any) {
        if(value === null || value === undefined) {
            (this as any)[key] = value
        }
    }
}
