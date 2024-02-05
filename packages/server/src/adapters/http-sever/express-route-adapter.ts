import { type Request, type Response } from 'express'
import { type HttpRequest, type Controller, type HttpResponse } from '../../domain/ports/inbound'

export const expressRouteAdapter = (controller: Controller) => async (req, res) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    if (httpResponse.code === 200) {
      res.status(httpResponse.code).json(httpResponse.data)
    } else {
      res.status(httpResponse.code).json({ error: httpResponse.data.message })
    }
  }
}
