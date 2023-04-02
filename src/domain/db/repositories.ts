import { Db } from 'mongodb'

export interface IDefaultRepository {
  getAll: <T>(queryParams: object, query: object, dbConn: Db, collection?: string) => Promise<T[]>
  countDocuments: (query: object, dbConn: Db, collection?: string) => Promise<number>
  getById: <T>(id: string, dbConn: Db, collection?: string, field?: string) => Promise<T>
  insertOne: <T>(document: T, dbConn: Db, collection?: string) => Promise<T>
  updateOne: <T>(id: string, update: object, dbConn: Db, collection?: string) => Promise<T>
  deleteOne: (id: string, dbConn: Db, collection?: string) => Promise<number | undefined>
}

export interface IQuery<T> {
  $or?: T[]
  $and?: T[]
}
