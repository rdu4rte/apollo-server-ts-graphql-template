import {
  Arg,
  Ctx,
  Directive,
  FieldResolver,
  Mutation,
  PubSub,
  Publisher,
  Query,
  Resolver,
  Root,
  Subscription
} from 'type-graphql'
import { Inject, Service } from 'typedi'
import { DeleteSample, GetById, GetSamples, InsertSample, UpdateSample } from '../use-cases/sample'
import { DefaultResponse, PaginationParams, Sample, SampleData, SampleInput } from '../dtos'
import { HttpCtx } from '@/domain/graphql'

@Service()
@Resolver(() => Sample)
export default class SampleResolver {
  constructor(
    @Inject() private readonly getSamples: GetSamples,
    @Inject() private readonly deleteSampleById: DeleteSample,
    @Inject() private readonly getSampleById: GetById,
    @Inject() private readonly registerSample: InsertSample,
    @Inject() private readonly updateSingleSample: UpdateSample
  ) {}

  @FieldResolver()
  field_res_ex(@Root() sample: Sample): string {
    return `this is a resolved field for sample "${sample._id}"`
  }

  @Query(() => SampleData)
  @Directive('@dbConn')
  async samples(
    @Arg('pagination') pagination: PaginationParams,
    @Ctx() { dbConn }: HttpCtx
  ): Promise<SampleData> {
    return this.getSamples.perform(pagination, dbConn)
  }

  @Query(() => Sample)
  @Directive('@dbConn')
  async sampleById(
    @Arg('sample_id') sampleId: string,
    @Ctx() { dbConn }: HttpCtx
  ): Promise<Sample> {
    return this.getSampleById.perform(sampleId, dbConn)
  }

  @Mutation(() => DefaultResponse)
  @Directive('@dbConn')
  async deleteSample(
    @Arg('sample_id') sampleId: string,
    @Ctx() { dbConn }: HttpCtx
  ): Promise<DefaultResponse> {
    return this.deleteSampleById.perform(sampleId, dbConn)
  }

  @Mutation(() => Sample)
  @Directive('@dbConn')
  async insertSample(
    @Arg('input') input: SampleInput,
    @Ctx() { dbConn }: HttpCtx,
    @PubSub('insert-sample') publish: Publisher<Sample>
  ): Promise<Sample> {
    const insertedSample = await this.registerSample.perform(input, dbConn)
    await publish(insertedSample)
    return insertedSample
  }

  @Mutation(() => Sample)
  @Directive('@dbConn')
  async updateSample(
    @Arg('sample_id') id: string,
    @Arg('input') input: SampleInput,
    @Ctx() { dbConn }: HttpCtx
  ): Promise<Sample> {
    return this.updateSingleSample.perform({ id, input }, dbConn)
  }

  @Subscription(() => Sample, {
    nullable: true,
    topics: 'insert-sample'
  })
  async insertedSample(@Root() payload: Sample): Promise<Sample> {
    return payload
  }
}
