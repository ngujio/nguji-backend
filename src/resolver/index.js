const SQL = require('@nearform/sql')
const regex = require('../util/regex')
const getInfo = require('../util/get-info')
const insert = require('../util/sql-insert')

const resolvers = {
  Query: {
    products: async function productFunc (parent, args, context, info) {
      const sql = SQL`SELECT * FROM products`
      const client = await context.app.pg.connect()
      try {
        const { rows } = await client.query(sql)
        return rows[0]
      } finally {
        client.release()
      }
    }
  },

  Mutation: {
    addNewProduct: async function (parent, args, context) {
      const productid = crypto.randomUUID()
      const purchaseid = crypto.randomUUID()
      const expenseid = crypto.randomUUID()
      const vendorInfo = getInfo(args.input, ['vendor_email', 'vendor_name', 'vendor_mobile'])
      const supplierInfo = getInfo(args.input, ['supplier_email', 'supplier_name', 'supplier_mobile'])
      const productDetail = Object.entries({ ...args.input }).filter((q) => !q[0].match(regex))
      productDetail.push(['productid', productid], ['purchaseid', purchaseid])

      const expensesDetail = {
        expenseid,
        purchaseid,
        expense_date: args.input.date,
        expense_type: args.input.expense_type,
        expense_amount: args.input.expense_amount,
        currency: args.input.currency,
        vendorid: args.input.vendor_email
      }

      const purchasesDetail = {
        productid,
        purchaseid,
        purchase_date: args.input.date,
        price: args.input.amount,
        currency: args.input.currency,
        expenseid,
        supplierid: args.input.supplier_email
      }

      const productsQuery = insert('products', productDetail, { returning: true })
      const vendorsQuery = insert('vendors', vendorInfo)
      const expensesQuery = insert('expenses', Object.entries(expensesDetail))
      const suppliersQuery = insert('suppliers', supplierInfo)
      const purchasesQuery = insert('purchases', Object.entries(purchasesDetail))

      try {
        const client = await context.app.pg
        const vendorQuery = SQL`SELECT email FROM vendors WHERE email=${args.input.vendor_email}`
        const supplierQuery = SQL`SELECT email FROM suppliers WHERE email=${args.input.supplier_email}`
        const { rows: vendor } = await client.query(vendorQuery)
        const { rows: supplier } = await client.query(supplierQuery)

        return await client.transact(async (client) => {
          supplier.length === 0 && (await client.query(suppliersQuery))
          vendor.length === 0 && (await client.query(vendorsQuery))
          const { rows } = await client.query(productsQuery)
          await client.query(expensesQuery)
          await client.query(purchasesQuery)
          console.log(rows)
          return rows
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}

module.exports = resolvers
