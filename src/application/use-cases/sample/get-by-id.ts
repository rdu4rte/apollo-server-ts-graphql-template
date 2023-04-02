import { type Sample } from '@/application/dtos'
import { InvalidParamError, NotFoundError } from '@/application/errors'
import { type IUseCase } from '@/domain/use-cases'
import { SampleRepository } from '@/infra/db/repositories'
import { type Db, ObjectID } from 'mongodb'
import { Inject, Service } from 'typedi'

@Service()
export class GetById implements IUseCase {
  constructor(@Inject() private readonly sampleReposiory: SampleRepository) {}

  async perform(input: string, dbConn: Db): Promise<Sample> {
    if (!ObjectID.isValid(input)) throw new InvalidParamError('sample_id')

    const sample = await this.sampleReposiory.getById<Sample>(input, dbConn)
    if (!sample) throw new NotFoundError(`Sample not found by id "${input}"`)

    return sample
  }
}
