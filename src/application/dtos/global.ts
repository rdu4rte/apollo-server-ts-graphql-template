import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { GraphQLJSONObject } from 'graphql-type-json'
import { Field, InputType, Int, ObjectType, registerEnumType } from 'type-graphql'

export enum ResStatus {
  success = 'success',
  failed = 'failed',
  working = 'working'
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

registerEnumType(SortDirection, {
  name: 'SortDirection',
  description: 'Sort direction type definition'
})

registerEnumType(ResStatus, {
  name: 'ResStatus',
  description: 'Response status type definition'
})

@ObjectType()
export class DefaultResponse {
  @Field(() => ResStatus, { defaultValue: ResStatus.success })
  status: ResStatus

  @Field(() => String, { nullable: true })
  res: string
}

@InputType()
export class PaginationParams {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  page?: number

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  pageSize?: number

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  sort?: string[]

  @Field(() => SortDirection, { nullable: true })
  @IsEnum(SortDirection)
  @IsOptional()
  sortDirection?: SortDirection

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  search?: string
}

@ObjectType()
export class QueryParams {
  @Field(() => Int)
  skip: number

  @Field(() => Int)
  limit: number

  @Field(() => GraphQLJSONObject, { nullable: true })
  sort?: object
}
