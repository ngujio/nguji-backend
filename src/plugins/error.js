const fp = require("fastify-plugin")

module.exports = fp(function (fastify, opts, next) {
  fastify.setErrorHandler(async function (err, req, reply) {
    if (reply.statusCode >= 500) {
      req.log.error({ req, res: reply, err }, err.message)
      reply.send(`Fatal error. Contact the support team. Id ${req.id}`)
      return
    }
    req.log.info({ req, res: reply, err }, err.message)
    reply.send(err)
  })

  fastify.addHook("onRequest", async (req) => {
    req.log.info({ req }, "incoming request")
  })

  fastify.addHook("onResponse", async (req, res) => {
    req.log.info({ req, res }, "request completed")
  })

  next()
})
