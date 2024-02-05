export interface AddCandidateSkill {
  add: (skills: string[], candidateId: number) => Promise<void>
}
