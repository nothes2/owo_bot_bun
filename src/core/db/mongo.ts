import {MongoDBClient} from "@core/db/mongodbClient.ts"

export async function mongoConnect () {
    await MongoDBClient.connect(process.env.MONGODB_URI ?? "")
}
