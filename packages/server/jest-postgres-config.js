import cwd from 'cwd'

module.exports = {
  seedPath: `${cwd()}/application/adapters/database/postgres/schema.sql`,
  version: 14,
  port: 5555
}