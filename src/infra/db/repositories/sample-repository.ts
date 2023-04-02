import { Service } from 'typedi'
import { AbstractRepository } from './abstract-repository'

@Service()
export class SampleRepository extends AbstractRepository {
  constructor() {
    super('samples')
  }
}
