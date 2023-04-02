import { MongoClient, type Db } from 'mongodb'

export const MongoConnector = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect(uri: string): Promise<MongoClient> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    })

    return this.client
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null as unknown as MongoClient
  },

  getUri(host: string, user: string, password: string): string {
    return `mongodb://${user}:${password}@${host}/admin?maxIdleTimeMS=120000`
  },

  async getConnection(host: string, user: string, password: string, db: string): Promise<Db> {
    this.uri = this.getUri(host, user, password)

    if (!this.client?.isConnected()) await this.connect(this.uri)
    return this.client.db(db)
  }
}
