import { Client } from 'pg'

const client = new Client({
  user: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD
})

export default client
