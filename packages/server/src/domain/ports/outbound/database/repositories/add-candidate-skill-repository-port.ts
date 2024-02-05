export interface AddCandidateSkillRepositoryPort {
  add: (skillId: number, candidateId: number) => Promise<void>
}
