import { IDefaultRepository } from '@/domain/db'
import { Db, DeleteWriteOpResultObject, ObjectID, ObjectId } from 'mongodb'

export abstract class AbstractRepository implements IDefaultRepository {
  protected readonly repositoryName: string

  constructor(repositoryName: string) {
    this.repositoryName = repositoryName
  }

  async getAll<T>(
    queryParams: object,
    query: object,
    dbConn: Db,
    collection?: string | undefined
  ): Promise<T[]> {
    return await dbConn
      .collection(collection || this.repositoryName)
      .find(query, queryParams)
      .toArray()
  }

  async countDocuments(query: object, dbConn: Db, collection?: string): Promise<number> {
    return await dbConn.collection(collection || this.repositoryName).countDocuments(query)
  }

  async getById<T>(
    id: string,
    dbConn: Db,
    collection?: string | undefined,
    field?: string | undefined
  ): Promise<T> {
    return await dbConn.collection(collection || this.repositoryName).findOne({
      [field || '_id']: ObjectID.isValid(id) ? new ObjectId(id) : id
    })
  }

  async insertOne<T>(document: T, dbConn: Db, collection?: string | undefined): Promise<T> {
    const res = await dbConn.collection(collection || this.repositoryName).insertOne(document)
    return res.ops[0]
  }

  async updateOne<T>(id: string, update: object, dbConn: Db, collection?: string): Promise<T> {
    await dbConn
      .collection(collection || this.repositoryName)
      .updateOne({ _id: new ObjectId(id) }, update)

    return this.getById(id, dbConn)
  }

  async deleteOne(id: string, dbConn: Db, collection?: string): Promise<number | undefined> {
    const res: DeleteWriteOpResultObject = await dbConn
      .collection(collection || this.repositoryName)
      .deleteOne({ _id: new ObjectId(id) })

    return res.deletedCount
  }
}
