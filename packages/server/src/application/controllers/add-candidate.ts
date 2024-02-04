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

  protected validate (input: unknown): void {
    const error = this.requiredFieldValidator.validate(input)
    if (error) throw error
  }

  async execute (input: AddCandidateModel): Promise<unknown> {
    const candidate = await this.addCandidate.add(input)
    return candidate
  }
}
