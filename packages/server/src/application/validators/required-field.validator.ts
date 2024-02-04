import { type ValidatorPort } from '../../domain/ports/inbound/validator'
import { MissingParamError } from '../errors'

export class RequiredFieldValidator implements ValidatorPort {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: Record<string, unknown>): Error | undefined {
    if (!input[this.fieldName]) return new MissingParamError(this.fieldName)
  }
}
