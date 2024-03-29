/* eslint-disable @typescript-eslint/no-floating-promises */
import { Router, type Express } from 'express'
import path from 'path'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  const routesFolder = path.join(__dirname, '..', 'routes')
  readdirSync(routesFolder).map(async (file) => {
    if (!file.endsWith('.test.ts')) {
      const route = (await import(`../routes/${file}`)).default
      route(router)
    }
  })
}
