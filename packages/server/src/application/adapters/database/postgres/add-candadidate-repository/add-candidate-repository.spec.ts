import client from '../postgres-helper'
import { AddCandidatePostgresRepository } from './add-candidate-repository'

describe('Add Candidate Repository', () => {
  beforeAll(async () => {
    await client.connect()
  })

  beforeEach(async () => {
    await client.query('DELETE FROM candidates')
  })

  afterAll(async () => {
    await client.end()
  })

  test('should return a candidate', async () => {
    const addCandidateRepository = new AddCandidatePostgresRepository()
    const candidate = await addCandidateRepository.add({
      name: 'Caio'
    })
    expect(candidate.id).toBeTruthy()
    expect(candidate.name).toBeTruthy()
  })
})
