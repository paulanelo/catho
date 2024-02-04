import { type ValidatorPort } from '../../domain/ports/inbound/validator'
import { MissingParamError } from '../errors'

export class RequiredFieldValidator implements ValidatorPort {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: unknown): Error {
    if (!input[this.fieldName]) return new MissingParamError(this.fieldName)
  }
}
