import { Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'

@Service()
@Resolver()
export default class SampleResolver {
  @Query(() => Boolean)
  test(): boolean {
    return true
  }
}
