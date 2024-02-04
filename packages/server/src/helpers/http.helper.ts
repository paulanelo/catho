import { ServerError } from '../application/errors/server-error'
import { type HttpResponse } from '../domain/ports/inbound'

export const badRequest = (error: Error): HttpResponse => {
  return {
    code: 400,
    error: {
      message: error.message,
      data: error
    }
  }
}

export const ok = (data: any): HttpResponse => {
  return {
    code: 200,
    data
  }
}

export const serverError = (error: Error): HttpResponse => {
  return {
    code: 500,
    error: new ServerError(error.stack)
  }
}
