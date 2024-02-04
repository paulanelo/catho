import { type HttpRequest } from '../../domain/ports/inbound/http'
import { type ValidatorPort } from '../../domain/ports/inbound/validator'
import { BaseController } from './base-controller'

export class AddCandidate extends BaseController {
  constructor (
    private readonly requiredFieldValidator: ValidatorPort
  ) {
    super()
  }

  protected validate (input: HttpRequest): void {
    const error = this.requiredFieldValidator.validate(input.body)
    if (error) throw error
  }

  async execute (input: HttpRequest): Promise<unknown> {
    return await new Promise(resolve => { resolve({}) })
  }
}
