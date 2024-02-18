"use strict"

const fp = require("fastify-plugin")
const dotEnvConfSchema = require("./dotenv/dotenv.json")

module.exports = fp(function schemasLoader(fastify, opts, next) {
  fastify.addSchema(dotEnvConfSchema)
  next()
})
