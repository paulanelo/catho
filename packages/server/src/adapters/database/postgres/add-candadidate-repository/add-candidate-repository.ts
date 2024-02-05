import { type Candidate } from '../../../../domain/entities'
import { type AddCandidateRepository } from '../../../../domain/ports/outbound/database/repositories'
import { type AddCandidateModel } from '../../../../domain/use-cases/add-candidate'
import client from '../postgres-helper'

export class AddCandidatePostgresRepository implements AddCandidateRepository {
  async add (candidate: AddCandidateModel): Promise<Candidate> {
    const result = await client.query('INSERT INTO candidates (name) VALUES ($1) RETURNING *', [candidate.name])
    const insertCandidate = result.rows[0]
    return {
      id: insertCandidate.id,
      name: insertCandidate.name
    }
  }
}
