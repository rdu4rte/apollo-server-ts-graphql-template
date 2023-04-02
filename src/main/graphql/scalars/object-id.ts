import { GraphQLScalarType, Kind, type ValueNode } from 'graphql'
import { ObjectId } from 'mongodb'

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'MongoDB ObjectId scalar type',

  serialize(value: ObjectId): string {
    return value.toHexString()
  },

  parseValue(value: any): ObjectId {
    return new ObjectId(value.toString())
  },

  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.STRING) return new ObjectId(ast.value)
    return null
  }
})
