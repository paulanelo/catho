import { type Skill } from '../../domain/entities'
import { type AddCandidateSkillRepositoryPort } from '../../domain/ports/outbound/database/repositories/add-candidate-skill-repository-port'
import { type FindOrCreateSkillRepositoryPort } from '../../domain/ports/outbound/database/repositories/find-or-create-skill-repository-port'
import { AddCandidateSkillUseCase } from './add-candidate-skill.use-case'

const makeFindOrCreateSkillRepository = (): FindOrCreateSkillRepositoryPort => {
  class FindOrCreateSkillRepository implements FindOrCreateSkillRepositoryPort {
    async findOrCreate (skillName: string): Promise<Skill> {
      return await new Promise(resolve => {
        resolve({
          id: 1,
          name: skillName
        })
      })
    }
  }

  return new FindOrCreateSkillRepository()
}

const makeAddCandidateSkillRepository = (): AddCandidateSkillRepositoryPort => {
  class AddCandidateSkillRepository implements AddCandidateSkillRepositoryPort {
    async add (skillId: number, candidateId: number): Promise<void> {
      await new Promise((resolve) => { resolve(null) })
    }
  }

  return new AddCandidateSkillRepository()
}

interface SutTypes {
  sut: AddCandidateSkillUseCase
  findOrCreateSkillRepositoryStub: FindOrCreateSkillRepositoryPort
  addCandidateSkillRepositoryStub: AddCandidateSkillRepositoryPort
}

const makeSut = (): SutTypes => {
  const findOrCreateSkillRepositoryStub = makeFindOrCreateSkillRepository()
  const addCandidateSkillRepositoryStub = makeAddCandidateSkillRepository()
  const sut = new AddCandidateSkillUseCase(findOrCreateSkillRepositoryStub, addCandidateSkillRepositoryStub)
  return {
    sut,
    findOrCreateSkillRepositoryStub,
    addCandidateSkillRepositoryStub
  }
}

describe('Add skill use case', () => {
  test('should call add skill repository with the correct input', async () => {
    const { sut, findOrCreateSkillRepositoryStub } = makeSut()
    const findOrCreateSpy = jest.spyOn(findOrCreateSkillRepositoryStub, 'findOrCreate')
    const data = {
      candidateId: 1,
      skills: ['any_skill']
    }
    await sut.add(data.skills, data.candidateId)
    expect(findOrCreateSpy).toHaveBeenCalledWith(data.skills[0])
  })

  test('should throw if skill repository throws', async () => {
    const { sut, findOrCreateSkillRepositoryStub } = makeSut()
    jest.spyOn(findOrCreateSkillRepositoryStub, 'findOrCreate').mockImplementationOnce(async () => await new Promise((resolve, reject) => { reject(new Error()) }))
    const data = {
      candidateId: 1,
      skills: ['any_skill']
    }
    const promise = sut.add(data.skills, data.candidateId)
    await expect(promise).rejects.toThrow()
  })

  test('should call add candidate skill repository with the correct input', async () => {
    const { sut, addCandidateSkillRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCandidateSkillRepositoryStub, 'add')
    const data = {
      candidateId: 1,
      skills: ['any_skill']
    }
    await sut.add(data.skills, data.candidateId)
    expect(addSpy).toHaveBeenCalledWith(1, data.candidateId)
  })
})
