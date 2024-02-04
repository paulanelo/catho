import { type Skill } from './skill'

export interface Candidate {
  id: string
  name: string
  skills: Skill[]
}
