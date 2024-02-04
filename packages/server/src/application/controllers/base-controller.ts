import { type Controller } from '../../domain/ports/inbound/controller'
import { type HttpRequest, type HttpResponse } from '../../domain/ports/inbound/http'

export abstract class BaseController implements Controller {
  protected abstract execute (input: HttpRequest): unknown | Promise<unknown>

  protected abstract validate (input: HttpRequest): void

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validate(httpRequest)
      const response = this.execute(httpRequest)
      return response as HttpResponse
    } catch (error) {
      console.error(error)
    }
  }
}
