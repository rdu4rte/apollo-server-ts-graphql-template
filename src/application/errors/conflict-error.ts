export class ConflictError extends Error {
  constructor(reason: string) {
    super(reason)
    this.name = 'ConflictError'
  }
}
