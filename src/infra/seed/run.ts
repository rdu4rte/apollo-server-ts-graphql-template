import 'reflect-metadata'
import '../../main/config/module-alias'

import { LoggerService, config } from '@/main/config'
import * as data from './data'
import { type Db } from 'mongodb'
import { MongoConnector } from '../db/connectors'

const runSeed = async (): Promise<void> => {
  const logger = new LoggerService()

  await new Promise((resolve) => {
    setTimeout(resolve, 3000)
  })

  try {
    const dbConn: Db = await MongoConnector.getConnection(
      config.db.host,
      config.db.user,
      config.db.password,
      config.db.database
    )

    for (const [collection, documents] of Object.entries(data)) {
      logger.info('Seed', `Seeding collection ${collection}`)
      await dbConn.collection(collection).insertMany(documents)
    }

    logger.info('Seed', 'Collections seeded')
  } catch (err) {
    logger.error('SeedErr', `Failed to seed db due to: ${err?.message}`)
    process.exit(0)
  }
}

void runSeed()
