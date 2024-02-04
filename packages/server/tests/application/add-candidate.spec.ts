import { type ValidatorPort } from '../../src/domain/ports/inbound/validator'
import { AddCandidate } from '../../src/application/controllers/add-candidate'
import { badRequest } from '../../src/helpers/http.helper'
import { MissingParamError } from '../../src/application/errors'

const makeValidator = (): ValidatorPort => {
  class ValidationStub implements ValidatorPort {
    validate (input: unknown): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: AddCandidate
  validatorStub: ValidatorPort
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidator()
  const sut = new AddCandidate(validatorStub)
  return {
    sut,
    validatorStub
  }
}

describe('AddCandidate', () => {
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
})
