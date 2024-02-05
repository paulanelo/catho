import { AddCandidateController } from '../../../application/controllers/add-candidate'
import { AddCandidateUseCase } from '../../../application/use-cases/add-candidate.use-case'
import { RequiredFieldValidator } from '../../../application/validators/required-field.validator'
import { type Controller } from '../../../domain/ports/inbound'
import { AddCandidatePostgresRepository } from '../../database/postgres/add-candadidate-repository/add-candidate-repository'

export const makeAddCandidate = (): Controller => {
  const requiredFieldValidator = new RequiredFieldValidator('name')
  const addCandidateRepository = new AddCandidatePostgresRepository()
  const addCandidate = new AddCandidateUseCase(addCandidateRepository)
  return new AddCandidateController(requiredFieldValidator, addCandidate)
}
