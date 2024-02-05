import { type AddCandidateSkillRepositoryPort } from '../../domain/ports/outbound/database/repositories/add-candidate-skill-repository-port'
import { type FindOrCreateSkillRepositoryPort } from '../../domain/ports/outbound/database/repositories/find-or-create-skill-repository-port'
import { type AddCandidateSkill } from '../../domain/use-cases/add-candidate-skills'

export class AddCandidateSkillUseCase implements AddCandidateSkill {
  constructor (
    private readonly findOrCreateSkillRepository: FindOrCreateSkillRepositoryPort,
    private readonly addCandidateSkillRepository: AddCandidateSkillRepositoryPort
  ) {}

  async add (skills: string[], candidateId: number): Promise<void> {
    for (const skill of skills) {
      const foundSkill = await this.findOrCreateSkillRepository.findOrCreate(skill)
      await this.addCandidateSkillRepository.add(foundSkill.id, candidateId)
    }
  }
}
