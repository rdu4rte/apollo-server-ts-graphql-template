/* eslint-disable @typescript-eslint/no-var-requires */
import * as glob from 'glob'
import path from 'path'

const resolverFiles = glob
  .sync(path.join(__dirname, './*-resolver.ts'))
  .map((resolver) => require(resolver).default)

export const resolvers = resolverFiles as [Function, ...Function[]]
