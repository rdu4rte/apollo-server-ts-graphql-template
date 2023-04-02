import { type Server } from 'http'
import { LoggerService } from '../config'
import apolloServer from './apollo-server'

export default async (): Promise<Server> => {
  const logger = new LoggerService()

  await apolloServer().then(() => {
    logger.info('Loader', 'Apollo Server loaded')
  })

  return apolloServer()
}
