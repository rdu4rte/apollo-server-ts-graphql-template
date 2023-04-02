import { Arg, Ctx, Directive, Mutation, Query, Resolver } from 'type-graphql'
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
    @Ctx() { dbConn }: HttpCtx
  ): Promise<Sample> {
    return this.registerSample.perform(input, dbConn)
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
}
