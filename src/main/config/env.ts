import * as dotenv from 'dotenv'
import { LoggerService } from './logger'
import { type EnvConfig } from '@/domain/config'

dotenv.config()

const logger = new LoggerService()

const env = (name: string): any => {
  const env = process.env[name]
  if (env === undefined && process.env.NODE_ENV !== 'TEST')
    logger.warn('Env', `Env variable not found: ${name}`)
  return env
}

export const config: EnvConfig = {
  port: +env('PORT') || 4000,
  isDev: env('NODE_ENV') === 'DEV',
  isTest: env('NODE_ENV') === 'TEST',
  isProd: env('NODE_ENV') === 'PROD',
  db: {
    host: env('DB_HOSTNAME') || 'localhost:27027',
    user: env('DB_USERNAME') || 'test',
    password: env('DB_PASSWORD') || 'test',
    database: env('DB_DATABASE') || 'apollo_gql_db'
  },
  jwt: {
    secret: env('JWT_SECRET') || 's3cr3t',
    sessionTtl: env('JWT_SESSION_TTL') || 43200,
    salt: +env('JWT_ENCRYPTION_SALT') || 12
  }
}
