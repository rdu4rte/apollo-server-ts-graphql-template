export interface EnvConfig {
  port: number
  isDev: boolean
  isTest: boolean
  isProd: boolean
  db: {
    host: string
    user: string
    password: string
    database: string
  }
  jwt: {
    secret: string
    sessionTtl: number
    salt: number
  }
}
