const { buildSchema } = require("graphql")

const schema = buildSchema(`
type Product {
    productid: String,
    name: String,
    category: String,
    description: String,
    quantity: Int,
    unit: String,
    price: String,
    date: String
}

type Query {
    product: Product
}`)

module.exports = schema
