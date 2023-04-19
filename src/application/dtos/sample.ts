import { ObjectIdScalar } from '@/main/graphql/scalars'
import { Field, InputType, Int, ObjectType } from 'type-graphql'
import { ObjectId } from 'mongodb'
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator'

@ObjectType()
export class Sample {
  constructor(init?: Partial<Sample>) {
    Object.assign(this, init)
  }

  @Field(() => ObjectIdScalar, { nullable: true })
  _id?: ObjectId

  @Field(() => String)
  field_1: string

  @Field(() => Int)
  field_2: number

  @Field(() => Boolean)
  field_3: boolean

  @Field(() => Date)
  created_at: Date

  @Field(() => Date)
  updated_at: Date

  @Field(() => String, { nullable: true })
  field_res_ex: string
}

@ObjectType()
export class SampleData {
  @Field(() => [Sample])
  data: Sample[]

  @Field(() => Int)
  count: number
}

@InputType()
export class SampleInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  field_1: string

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  field_2: number

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  field_3: boolean
}
