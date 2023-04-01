import { Server, createServer } from 'http'
import { gqlBuildSchema } from '../graphql'
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'
import cors, { CorsRequest } from 'cors'
import { json } from 'body-parser'

export default async (): Promise<Server> => {
  const schema = await gqlBuildSchema()

  const app = express()
  const httpServer = createServer(app)

  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await apolloServer.start()

  app.use(
    '/graphql',
    cors<CorsRequest>(),
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ req, res })
    })
  )

  return httpServer
}
