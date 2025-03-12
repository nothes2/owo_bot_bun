import type {ClassEmbed} from "@core/type/type_general.ts";

export interface IfRepoTicketBot {
    add(embed: ClassEmbed): Promise<boolean>;
    delete(embed: ClassEmbed): Promise<boolean>;
    update(embed: ClassEmbed): Promise<boolean>;
    query(embed: ClassEmbed): Promise<ClassEmbed | boolean>;
}