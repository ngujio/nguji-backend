"use strict"

const path = require("path")
const AutoLoad = require("@fastify/autoload")

module.exports = async function (fastify, opts) {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "schemas"),
    indexPattern: /.*schemas-loader(\.js|\.cjs)$/i,
  })
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    ignorePattern: /.*(\.js|\.cjs)/i,
    indexPattern: /.*(root|route-loader)(\.js|\.cjs)$/i,
  })
}

module.exports.options = require("./config/server.js")
