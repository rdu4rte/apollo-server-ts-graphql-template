import loaders from '@/main/adapters/loaders'
import { LoggerService } from '@/main/config'

export default async (port: number): Promise<void> => {
  const logger = new LoggerService()

  const server = await loaders()
  server.listen(port, () => {
    logger.info('Bootstrap', `Server running on: http://localhost:${port}/graphql`)
  })
}
