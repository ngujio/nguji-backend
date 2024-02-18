const fp = require("fastify-plugin")
const env = require("@fastify/env")

module.exports = fp(
  async function (fastify, opts) {
    fastify.register(env, {
      confKey: "env",
      data: opts.configData,
      schema: fastify.getSchema("schema:dotenv"),
    })
  },
  { name: "application-config" }
)
