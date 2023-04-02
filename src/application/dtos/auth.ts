import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class JwtCredentials {
  @Field(() => String)
  token: string

  @Field(() => Date)
  expiresIn: Date
}
