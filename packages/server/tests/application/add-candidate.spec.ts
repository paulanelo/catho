import { type ValidatorPort } from '../../src/domain/ports/inbound/validator'
import { AddCandidateController } from '../../src/application/controllers/add-candidate'
import { badRequest } from '../../src/helpers/http.helper'
import { MissingParamError } from '../../src/application/errors'
import { type AddCandidate, type AddCandidateModel } from '../../src/domain/use-cases/add-candidate'
import { type Candidate } from '../../src/domain/entities'

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
})
