import { GraphQLSchema } from 'graphql'
import { ObjectId } from 'mongodb'
import { buildSchema } from 'type-graphql'
import Container from 'typedi'
import { ObjectIdScalar } from './scalars'
import { join } from 'path'
import { resolvers } from '@/application/resolvers'

export const gqlBuildSchema = async (): Promise<GraphQLSchema> => {
  const schema = await buildSchema({
    resolvers,
    container: Container,
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    emitSchemaFile: {
      path: join(__dirname) + '/schema.gql',
      sortedSchema: false
    }
  })

  return schema
}
