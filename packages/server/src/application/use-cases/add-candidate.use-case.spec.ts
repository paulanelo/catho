import { type Candidate } from '../../domain/entities'
import { type AddCandidateRepository } from '../../domain/ports/outbound/database/repositories'
import { type AddCandidateModel, type AddCandidate } from '../../domain/use-cases/add-candidate'
import { AddCandidateUseCase } from './add-candidate.use-case'

const makeAddCandidateRepository = (): AddCandidateRepository => {
  class AddCandidateRepository implements AddCandidateRepository {
    async add (candidate: AddCandidateModel): Promise<Candidate> {
      return await new Promise((resolve) => {
        resolve({
          id: 1,
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

  test('should throw if add candidate repository throws', async () => {
    const { sut, addCandidateRepositoryStub } = makeSut()
    jest.spyOn(addCandidateRepositoryStub, 'add').mockImplementationOnce(async () => await new Promise((resolve, reject) => { reject(new Error()) }))
    const data = {
      name: 'any_name',
      skills: []
    }
    const promise = sut.add(data)
    await expect(promise).rejects.toThrow()
  })

  test('should return a candidate if all data is provided', async () => {
    const { sut } = makeSut()
    const data = {
      name: 'any_name',
      skills: []
    }
    const candidate = await sut.add(data)
    expect(candidate).toEqual({
      id: 1,
      ...data
    })
  })
})
