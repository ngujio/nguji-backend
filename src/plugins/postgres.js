const postgres = require("@fastify/postgres")
const fp = require("fastify-plugin")

module.exports = fp(
  async function (fastify, opts) {
    fastify.register(postgres, {
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      user: process.env.POSTGRES_USER,
      host: process.env.HOST,
      port: process.env.POSTGRES_PORT,
    })
  },
  { dependencies: ["application-config"] }
)
