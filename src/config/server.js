const loggerOpts = require("./logger.js")
const crypto = require("node:crypto")

module.exports = {
  disableRequestLogging: true,
  logger: loggerOpts,
  requestIdLogLabel: "requestId",
  requestIdHeader: "x-request-id",
  genReqId(req) {
    return req.headers["x-amz-request-id"] || crypto.randomUUID()
  },
  ajv: {
    customOptions: {
      coerceTypes: "array",
      removeAdditional: "all",
    },
  },
}
