import { type Skill } from '../../domain/entities'
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

interface SutTypes {
  sut: AddCandidateSkillUseCase
  findOrCreateSkillRepositoryStub: FindOrCreateSkillRepositoryPort
}

const makeSut = (): SutTypes => {
  const findOrCreateSkillRepositoryStub = makeFindOrCreateSkillRepository()
  const sut = new AddCandidateSkillUseCase(findOrCreateSkillRepositoryStub)
  return {
    sut,
    findOrCreateSkillRepositoryStub
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
})
