import { type GraphQLSchema } from 'graphql'
import { ObjectId } from 'mongodb'
import { type NonEmptyArray, buildSchema } from 'type-graphql'
import Container from 'typedi'
import { ObjectIdScalar } from './scalars'
import { join } from 'path'
import { resolvers } from '@/application/resolvers'
import { SchemaDirectiveVisitor } from '@graphql-tools/utils'
import { DbConnectorDirective } from './directives'

export const gqlBuildSchema = async (): Promise<GraphQLSchema> => {
  const schema = await buildSchema({
    resolvers: resolvers as unknown as NonEmptyArray<Function>,
    container: Container,
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    emitSchemaFile: {
      path: join(__dirname, '../../schema.gql'),
      sortedSchema: false
    }
  })

  SchemaDirectiveVisitor.visitSchemaDirectives(schema, {
    dbConn: DbConnectorDirective
  })

  return schema
}
