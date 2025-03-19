import type {url} from "@core/data/general.ts";

export const iconURL = "https://media.discordapp.net/attachments/1266827894445838409/1344320878065881180/Copy_of_RS_5.png?ex=67c124a1&is=67bfd321&hm=c382b10ed63d1362479c5b78c7c1caed14708523cb5d062140081b95434d23be&=&format=webp&quality=lossless&width=671&height=671"
export const color = "#FF13F0";
export const title = "RuralShop田園小賣部"
export const image_placeholder: url = `https://media.discordapp.net/attachments/1336757518424342558/1345696459101700116/placeholder.png?ex=67c57cfd&is=67c42b7d&hm=310c82bf611b7cb2c11867ae0d7b8b29a2b968d95ebc4ca66a4d172ccd91e0ec&=&format=webp&quality=lossless&width=313&height=313`;


const globalStore: Record<string, any> = {};

export function setGlobalVariable(key: string, value: any) {
    globalStore[key] = value;
}

export function getGlobalVariable(key: string) {
    return globalStore[key] ?? null;
}