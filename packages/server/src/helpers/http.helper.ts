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
