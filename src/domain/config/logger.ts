export interface ILogger {
  info: (context: string, message: string) => void
  error: (context: string, message: string, trace?: string) => void
  warn: (context: string, message: string) => void
  http: (context: string, message: string) => void
  verbose: (context: string, message: string) => void
  debug: (context: string, message: string) => void
  silly: (context: string, message: string) => void
}
