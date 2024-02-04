import { type Candidate } from '../../../../entities'
import { type AddCandidateModel } from '../../../../use-cases/add-candidate'

export interface AddCandidateRepository {
  add: (candidate: AddCandidateModel) => Promise<Candidate>
}
