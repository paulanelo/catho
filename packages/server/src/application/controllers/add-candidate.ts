import { type HttpRequest } from '../../domain/ports/inbound/http'
import { type ValidatorPort } from '../../domain/ports/inbound/validator'
import { type AddCandidateModel, type AddCandidate } from '../../domain/use-cases/add-candidate'
import { BaseController } from './base-controller'

export class AddCandidateController extends BaseController {
  constructor (
    private readonly requiredFieldValidator: ValidatorPort,
    private readonly addCandidate: AddCandidate
  ) {
    super()
  }

  protected validate (input: HttpRequest): void {
    const error = this.requiredFieldValidator.validate(input.body)
    if (error) throw error
  }

  async execute (input: HttpRequest): Promise<unknown> {
    const candidate = await this.addCandidate.add(input.body as AddCandidateModel)
    return candidate
  }
}
