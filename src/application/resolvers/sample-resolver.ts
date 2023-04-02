import { Arg, Ctx, Directive, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { DeleteSample, GetSamples } from '../use-cases/sample'
import { DefaultResponse, PaginationParams, Sample, SampleData } from '../dtos'
import { HttpCtx } from '@/domain/graphql'

@Service()
@Resolver(() => Sample)
export default class SampleResolver {
  constructor(
    @Inject() private readonly getSamples: GetSamples,
    @Inject() private readonly deleteSampleById: DeleteSample
  ) {}

  @Query(() => SampleData)
  @Directive('@dbConn')
  async samples(
    @Arg('pagination') pagination: PaginationParams,
    @Ctx() { dbConn }: HttpCtx
  ): Promise<SampleData> {
    return this.getSamples.perform(pagination, dbConn)
  }

  @Mutation(() => DefaultResponse)
  @Directive('@dbConn')
  async deleteSample(
    @Arg('sample_id') sampleId: string,
    @Ctx() { dbConn }: HttpCtx
  ): Promise<DefaultResponse> {
    return this.deleteSampleById.perform(sampleId, dbConn)
  }
}
