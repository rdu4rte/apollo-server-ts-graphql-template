import { Db } from 'mongodb'

export interface IUseCase {
  perform: (input: any, dbConn: Db) => Promise<any>
}
