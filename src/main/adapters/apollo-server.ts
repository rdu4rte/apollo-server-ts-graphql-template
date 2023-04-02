import { Server, createServer } from 'http'
import { gqlBuildSchema } from '../graphql'
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'
import cors, { CorsRequest } from 'cors'
import { json } from 'body-parser'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

export default async (): Promise<Server> => {
  const schema = await gqlBuildSchema()

  const app = express()
  const httpServer = createServer(app)

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup
            }
          }
        }
      }
    ]
  })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql'
  })

  const serverCleanup = useServer({ schema }, wsServer)

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
