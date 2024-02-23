const SQL = require('@nearform/sql')

function insert (table, insertData, { returning } = { returning: false }) {
  const builder = insertData.reduce(
    (acc, [column, value]) => {
      if (value !== undefined) {
        acc.columns.push(column)
        acc.values.push(SQL`${value}`)
      }
      return acc
    },
    { columns: [], values: [] }
  )
  return SQL`INSERT INTO ${SQL.quoteIdent(table)} 
            (${SQL.unsafe(builder.columns.join(', '))}) 
            VALUES
            (${SQL.glue(builder.values, ', ')}) 
            ${SQL.glue(returning ? [SQL`RETURNING productid`] : [SQL``], ' ')}`
}

module.exports = insert
