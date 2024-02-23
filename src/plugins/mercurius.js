const mercurius = require('mercurius')
const fp = require('fastify-plugin')
const resolvers = require('../resolver/index')
const gqlSchema = require('../schemas/gql/gql-schema')

module.exports = fp(async function (fastify, opts) {
  fastify.register(mercurius, {
    schema: gqlSchema,
    graphiql: true,
    resolvers
  })
})
