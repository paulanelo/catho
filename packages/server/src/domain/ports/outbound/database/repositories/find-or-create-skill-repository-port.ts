import { type Skill } from '../../../../entities'

export interface FindOrCreateSkillRepositoryPort {
  findOrCreate: (skillName: string) => Promise<Skill>
}
