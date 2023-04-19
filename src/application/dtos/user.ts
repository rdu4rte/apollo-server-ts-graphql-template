import { ObjectIdScalar } from '@/main/graphql/scalars'
import { Field, ObjectType, registerEnumType } from 'type-graphql'
import { ObjectId } from 'mongodb'

export enum Role {
  admin = 'admin',
  manager = 'manager',
  user = 'user'
}

registerEnumType(Role, {
  name: 'Role',
  description: 'Role type definitions'
})

@ObjectType()
export class User {
  constructor(init?: Partial<User>) {
    Object.assign(this, init)
  }

  @Field(() => ObjectIdScalar)
  _id: ObjectId

  @Field(() => String)
  username: string

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string

  @Field(() => Role)
  role: Role

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Boolean)
  active: boolean
}
