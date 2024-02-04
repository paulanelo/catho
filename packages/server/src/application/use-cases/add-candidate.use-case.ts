import { type Candidate } from '../../domain/entities'
import { type AddCandidateRepository } from '../../domain/ports/outbound/database/repositories'
import { type AddCandidate, type AddCandidateModel } from '../../domain/use-cases/add-candidate'

export class AddCandidateUseCase implements AddCandidate {
  constructor (
    private readonly addCandidateRepository: AddCandidateRepository
  ) {}

  async add (candidate: AddCandidateModel): Promise<Candidate> {
    const createdCandidate = await this.addCandidateRepository.add(candidate)
    return await new Promise(resolve => {
      resolve({
        id: createdCandidate.id,
        name: candidate.name,
        skills: candidate.skills
      })
    })
  }
}
