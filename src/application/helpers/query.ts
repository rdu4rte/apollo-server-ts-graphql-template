import { type PaginationParams, type QueryParams } from '@/application/dtos/global'
import { Service } from 'typedi'

@Service()
export class QueryHelper {
  /**
   * @description Format pagination params for mongodb query
   * @param pagination PaginationParams
   * @returns QueryParams
   */
  buildQueryParams(pagination: PaginationParams): QueryParams {
    const { page, pageSize, sort, sortDirection } = pagination
    const queryParams: QueryParams = {
      skip: page && pageSize && page > 0 ? (page - 1) * pageSize : 0,
      limit: pageSize ?? 10
    }

    if (sort?.[0])
      queryParams.sort = {
        [sort[0]]: sortDirection && sortDirection[0] === 'DESC' ? -1 : 1
      }

    return queryParams
  }
}
