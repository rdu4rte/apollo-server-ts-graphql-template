import { type DefaultResponse, ResStatus } from '@/application/dtos'
import { InvalidParamError, ServerError } from '@/application/errors'
import { type IUseCase } from '@/domain/use-cases'
import { SampleRepository } from '@/infra/db/repositories'
import { type Db, ObjectID } from 'mongodb'
import { Inject, Service } from 'typedi'

@Service()
export class DeleteSample implements IUseCase {
  constructor(@Inject() private readonly sampleRepository: SampleRepository) {}

  async perform(input: string, dbConn: Db): Promise<DefaultResponse> {
    if (!ObjectID.isValid(input)) throw new InvalidParamError('id')

    const res = await this.sampleRepository.deleteOne(input, dbConn)
    if (!res) throw new ServerError(`Failed to delete sample by id: "${input}"`)

    return {
      status: ResStatus.success,
      res: `Sample "${input}" deleted`
    }
  }
}
