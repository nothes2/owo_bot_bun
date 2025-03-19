import {MongoDBClient} from "@core/db/mongodbClient.ts"

export async function mongoConnect () {
    console.log("connecting mangodb");
    
    await MongoDBClient.connect(process.env.MONGODB_URI ?? "")
    console.log("mongodb Connected")
}
