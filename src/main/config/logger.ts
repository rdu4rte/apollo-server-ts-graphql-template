import { type ILogger } from '@/domain/config'
import { Service } from 'typedi'
import winston from 'winston'

@Service()
export class LoggerService implements ILogger {
  private readonly logger: winston.Logger

  constructor() {
    this.logger = winston.createLogger({
      level: 'silly',
      levels: winston.config.npm.levels,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY/MM/DD - HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.cli(), winston.format.splat())
        })
      ]
    })
  }

  info(context: string, message: string): void {
    this.logger.log('info', `[${context}] ${message}`)
  }

  error(context: string, message: string, trace?: string): void {
    this.logger.log('error', message, trace, context)
  }

  warn(context: string, message: string): void {
    this.logger.log('warn', `[${context}] ${message}`)
  }

  http(context: string, message: string): void {
    this.logger.log('http', `[${context}] ${message}`)
  }

  verbose(context: string, message: string): void {
    this.logger.log('verbose', `[${context}] ${message}`)
  }

  debug(context: string, message: string): void {
    this.logger.log('debug', `[${context}] ${message}`)
  }

  silly(context: string, message: string): void {
    this.logger.log('silly', `[${context}] ${message}`)
  }
}
