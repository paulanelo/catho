import { type Candidate } from '../../domain/entities'
import { type AddCandidateRepository } from '../../domain/ports/outbound/database/repositories'
import { type AddCandidateModel, type AddCandidate } from '../../domain/use-cases/add-candidate'
import { AddCandidateUseCase } from './add-candidate.use-case'

const makeAddCandidateRepository = (): AddCandidateRepository => {
  class AddCandidateRepository implements AddCandidateRepository {
    async add (candidate: AddCandidateModel): Promise<Candidate> {
      return await new Promise((resolve) => {
        resolve({
          id: 'any_id',
          name: 'any_name',
          skills: []
        })
      })
    }
  }
  return new AddCandidateRepository()
}

interface SutTypes {
  sut: AddCandidate
  addCandidateRepositoryStub: AddCandidateRepository
}

const makeSut = (): SutTypes => {
  const addCandidateRepositoryStub = makeAddCandidateRepository()
  const sut = new AddCandidateUseCase(addCandidateRepositoryStub)
  return {
    sut,
    addCandidateRepositoryStub
  }
}

describe('Add Candidate Use case', () => {
  test('should call add candidate repository with correct input', async () => {
    const { sut, addCandidateRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCandidateRepositoryStub, 'add')
    const data = {
      name: 'any_name',
      skills: []
    }
    await sut.add(data)
    expect(addSpy).toHaveBeenCalledWith(data)
  })
})
