import { type Sample, type SampleInput } from '@/application/dtos'
import { ServerError } from '@/application/errors'
import { type IUseCase } from '@/domain/use-cases'
import { SampleRepository } from '@/infra/db/repositories'
import { type Db } from 'mongodb'
import { Inject, Service } from 'typedi'

@Service()
export class UpdateSample implements IUseCase {
  constructor(@Inject() private readonly sampleRepository: SampleRepository) {}

  async perform(args: { id: string; input: SampleInput }, dbConn: Db): Promise<Sample> {
    const { id, input } = args

    const updatedSample = await this.sampleRepository.updateOne<Sample>(id, input, dbConn)
    if (!updatedSample) throw new ServerError(`Failed to update sample "${id}"`)

    return updatedSample
  }
}
