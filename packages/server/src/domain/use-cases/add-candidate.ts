import { type Candidate } from '../entities/candidate'

export interface AddCandidateModel {
  name: string
  skills?: string[]
}

export interface AddCandidate {
  add: (candidate: AddCandidateModel) => Promise<Candidate>
}
