import { Sample, type SampleInput } from '@/application/dtos'
import { ServerError } from '@/application/errors'
import { type IUseCase } from '@/domain/use-cases'
import { SampleRepository } from '@/infra/db/repositories'
import { type Db } from 'mongodb'
import { Inject, Service } from 'typedi'

@Service()
export class InsertSample implements IUseCase {
  constructor(@Inject() private readonly sampleRepository: SampleRepository) {}

  async perform(input: SampleInput, dbConn: Db): Promise<Sample> {
    const newSample = new Sample(input)

    newSample.created_at = new Date()
    newSample.updated_at = new Date()

    const res = await this.sampleRepository.insertOne<Sample>(newSample, dbConn)
    if (!res) throw new ServerError('Failed to insert new sample')

    return res
  }
}
