export class MissingParamError extends Error {
  constructor (name: string) {
    super(`${name}`)
    this.name = 'Missing param error'
  }
}
