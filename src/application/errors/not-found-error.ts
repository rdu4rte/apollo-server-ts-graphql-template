export class NotFoundError extends Error {
  constructor(reason: string) {
    super(reason)
    this.name = 'NotFoundError'
  }
}
