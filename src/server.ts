import 'reflect-metadata'
import './main/config/module-alias'
import bootstrap from '@/main/adapters/bootstrap'
import { LoggerService, config } from '@/main/config'

bootstrap(config.port).catch((err) => {
  const logger = new LoggerService()
  logger.error('BootstrapErr', 'Failed to start server due to: ', err)
})
