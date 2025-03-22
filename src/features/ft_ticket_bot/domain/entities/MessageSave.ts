import type {ClassMessage} from "@core/data/general.ts";

export class MessageSave {
    constructor(
        public message: ClassMessage,
        public _id?: string,
    ) {
    }

    setProperty(key: string, value: any) {
        if (value === null || value === undefined) {
            (this as any)[key] = value
        }
    }
}