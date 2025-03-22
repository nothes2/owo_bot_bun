import {MongoClient} from "mongodb"

export class MongoDBClient {
    private static client: MongoClient | null = null;

    static async connect(uri: string) {
        if(this.client) return this.client

        this.client = new MongoClient(uri, {
            maxPoolSize: 100,
            connectTimeoutMS: 8000
        })

        try{
        await this.client.connect()
        console.info(`✅ database connect successfully`);
        } catch(error) {
            console.error(error);
            this.client = null
            throw error
        }

        return this.client
    }

    static getClient() {
        if (!this.client) throw new Error(`❌ database client connection failed`);
        return this.client
    }

    static async close() {
        if(this.client) {
            await this.client.close()
            this.client = null!
            console.info(`ℹ️ database connection closed`)
        }
    }
}

process.on("SIGINT", async () => {
    await MongoDBClient.close();
    process.exit(0);
});
