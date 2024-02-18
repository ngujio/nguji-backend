const resolvers = {
  Query: {
    product: async (parent, args, context, info) => {
      const sql = `SELECT * FROM stock`
      const client = await context.app.pg.connect()
      try {
        const { rows } = await client.query(sql)
        return rows[0]
      } finally {
        client.release()
      }
    },
  },
}

module.exports = resolvers
