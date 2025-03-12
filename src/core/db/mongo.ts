import {MongoDBClient} from "@core/db/mongodbClient.ts"
import * as process from "node:process";

export async function mongoConnect  ()  {
    await MongoDBClient.connect(process.env.MONGODB_URI ?? "")
    console.log("mongodb Connected")
}
