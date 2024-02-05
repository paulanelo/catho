import { type Controller } from '../../domain/ports/inbound/controller'
import { type HttpRequest, type HttpResponse } from '../../domain/ports/inbound/http'
import { MissingParamError } from '../errors'
import { badRequest, ok, serverError } from '../helpers/http.helper'

export abstract class BaseController implements Controller {
  protected abstract execute (input: unknown): unknown | Promise<unknown>

  protected abstract validate (input: unknown): void

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validate(httpRequest.body)
      const response = await this.execute(httpRequest.body)
      return ok(response)
    } catch (error) {
      if (error instanceof MissingParamError) {
        return badRequest(error)
      }
      console.error('aqui', error)
      return serverError(error as Error)
    }
  }
}
