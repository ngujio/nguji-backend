'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const Sensible = require('../../src/plugins/sensible')

test('sensible works standalone', async (t) => {
  const fastify = Fastify()
  fastify.register(Sensible)

  await fastify.ready()
  t.match(fastify.httpErrors.notFound().message, 'Not Found')
})
