import { type ValidatorPort } from '../../domain/ports/inbound/validator'
import { AddCandidateController } from './add-candidate'
import { badRequest, ok, serverError } from '../../helpers/http.helper'
import { MissingParamError } from '../errors'
import { type AddCandidate, type AddCandidateModel } from '../../domain/use-cases/add-candidate'
import { type Candidate } from '../../domain/entities'

const makeValidator = (): ValidatorPort => {
  class ValidationStub implements ValidatorPort {
    validate (input: unknown): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddCandidate = (): AddCandidate => {
  class AddCandidateStub implements AddCandidate {
    async add (candidate: AddCandidateModel): Promise<Candidate> {
      return await new Promise(resolve => {
        resolve({
          id: 'any_id',
          name: 'any_name',
          skills: []
        })
      })
    }
  }
  return new AddCandidateStub()
}

interface SutTypes {
  sut: AddCandidateController
  validatorStub: ValidatorPort
  addCandidateStub: AddCandidate
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidator()
  const addCandidateStub = makeAddCandidate()
  const sut = new AddCandidateController(validatorStub, addCandidateStub)
  return {
    sut,
    validatorStub,
    addCandidateStub
  }
}

describe('AddCandidate', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("should return 400 if candidate's is not provided", async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new MissingParamError('name_field'))
    const httpRequest = {
      body: {
        skills: []
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new MissingParamError('name_field')))
  })

  test('should call validator with the right input', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    const httpRequest = {
      body: {
        name: 'any_name',
        skills: []
      }
    }
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should call add candidate use case with correct input', async () => {
    const { sut, addCandidateStub } = makeSut()
    const addCandidateSpy = jest.spyOn(addCandidateStub, 'add')
    const httpRequest = {
      body: {
        name: 'any_name',
        skills: []
      }
    }
    await sut.handle(httpRequest)
    expect(addCandidateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should throw if add candidate use case throws', async () => {
    const { sut, addCandidateStub } = makeSut()
    jest.spyOn(addCandidateStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        skills: []
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 if request data are correct', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        skills: []
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      id: 'any_id',
      name: 'any_name',
      skills: []
    }))
  })
})
