import { ObjectIdScalar } from '@/main/graphql/scalars'
import { Field, InputType, Int, ObjectType } from 'type-graphql'
import { ObjectId } from 'mongodb'

@ObjectType()
@InputType('SampleInput')
export class Sample {
  @Field(() => ObjectIdScalar, { nullable: true })
  _id?: ObjectId

  @Field(() => String)
  field_1: string

  @Field(() => Int)
  field_2: number

  @Field(() => Boolean)
  field_3: boolean
}

@ObjectType()
export class SampleData {
  @Field(() => [Sample])
  data: Sample[]

  @Field(() => Int)
  count: number
}
