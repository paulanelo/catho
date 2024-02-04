import { type Candidate } from '../entities/candidate'

export interface AddCandidateModel {
  name: string
  skills?: Array<{
    id: string
  }>
}

export interface AddCandidate {
  add: (candidate: AddCandidateModel) => Promise<Candidate>
}
