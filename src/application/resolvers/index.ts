/* eslint-disable @typescript-eslint/no-var-requires */
import * as glob from 'glob'
import path from 'path'

type ResolverFn = (...args: any[]) => any

export const resolvers = glob
  .sync(path.join(__dirname, './*-resolver.ts'))
  .map<ResolverFn>((resolver) => require(resolver).default)
