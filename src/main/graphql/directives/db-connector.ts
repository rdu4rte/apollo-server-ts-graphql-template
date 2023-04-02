import { ServerError } from '@/application/errors'
import { MongoConnector } from '@/infra/db/connectors'
import { config } from '@/main/config'
import { SchemaDirectiveVisitor } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLField } from 'graphql'
import { Db } from 'mongodb'

export class DbConnectorDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>): void {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const db: Db = await MongoConnector.getConnection(
        config.db.host,
        config.db.user,
        config.db.password,
        config.db.database
      )

      if (!db) throw new ServerError('Failed to get connection')

      args[2].dbConn = db
      return await resolve.apply(this, args)
    }
  }
}
