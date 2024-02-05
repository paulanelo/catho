import client from './adapters/database/postgres/postgres-helper'
import app from './adapters/http-sever/config/app'
import env from './adapters/http-sever/config/env'

client.connect().then(() => {
  app.listen(env.port, () => { console.log(`server running at: http://localhost:${env.port}`) })
}).catch((error) => {
  console.error(error)
})
