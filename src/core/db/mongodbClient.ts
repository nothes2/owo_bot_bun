import {MongoClient} from "mongodb"

export class MongoDBClient {
    private static client: MongoClient;

    static async connect(uri: string) {
        if(this.client) return this.client

        this.client = new MongoClient(uri, {
            maxPoolSize: 100,
            connectTimeoutMS: 8000
        })
        await this.client.connect()

        return this.client
    }

    static getClient() {
        if (!this.client) throw new Error("mongodb client is not connected");
        return this.client
    }

    static async close() {
        if(this.client) {
            await this.client.close()
            this.client = null!
            console.log("MongoDB connection closed")
        }
    }
}
