import { type HttpResponse } from './http'

export interface Controller {
  handle: (httpRequest: unknown) => Promise<HttpResponse>
}
