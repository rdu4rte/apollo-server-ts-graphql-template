import { PaginationParams, QueryParams, Sample, SampleData } from '@/application/dtos'
import { QueryHelper } from '@/application/helpers'
import { IUseCase } from '@/domain/use-cases'
import { SampleRepository } from '@/infra/db/repositories'
import { Db, ObjectID, ObjectId } from 'mongodb'
import { Inject, Service } from 'typedi'

@Service()
export class GetSamples implements IUseCase {
  constructor(
    @Inject() private readonly queryHelper: QueryHelper,
    @Inject() private readonly sampleRepository: SampleRepository
  ) {}

  async perform(input: PaginationParams, dbConn: Db): Promise<SampleData> {
    const { search } = input

    const queryParams: QueryParams = this.queryHelper.buildQueryParams(input)
    const query: any = {}

    if (search) {
      if (ObjectID.isValid(search)) query['_id'] = new ObjectId(search)
      else {
        query['$or'] = [
          { field_1: { $regex: `.*${search}`, $options: 'i' } },
          { field_2: { $regex: `.*${search}`, $options: 'i' } },
          { field_3: { $regex: `.*${search}`, $options: 'i' } }
        ]
      }
    }

    const [data, count] = await Promise.all([
      await this.sampleRepository.getAll<Sample>(queryParams, query, dbConn),
      await this.sampleRepository.countDocuments(query, dbConn)
    ])

    return { data, count }
  }
}
