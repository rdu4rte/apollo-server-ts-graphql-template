export class UnauthorizedError extends Error {
  constructor(reason: string) {
    super(`Unauthorized, ${reason.toLowerCase()}`)
    this.name = 'UnauthorizedError'
  }
}
