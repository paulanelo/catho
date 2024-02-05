import { type FindOrCreateSkillRepositoryPort } from '../../domain/ports/outbound/database/repositories/find-or-create-skill-repository-port'
import { type AddCandidateSkill } from '../../domain/use-cases/add-candidate-skills'

export class AddCandidateSkillUseCase implements AddCandidateSkill {
  constructor (
    private readonly findOrCreateSkillRepository: FindOrCreateSkillRepositoryPort
  ) {}

  async add (skills: string[], candidateId: number): Promise<void> {
    for (const skill of skills) {
      await this.findOrCreateSkillRepository.findOrCreate(skill)
    }
  }
}
