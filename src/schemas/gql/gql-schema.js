const { buildSchema } = require('graphql')

const Product = `type Product {
    productid: ID!,
    purchaseid: ID!,
    name: String!,
    category: String!,
    description: String!,
    quantity: Int!,
    unit: String!,
    price: String!,
    products_date: String!,
    amount: Int!,
    date: String!,
    currency: String,
}`

const Purchase = `type Purchase {
    productid: ID!,
    purchase_date: String!,
    price: Int!,
    currency: String!,
    expenseid: ID!,
    supplierid: ID!
}  `

const Expense = `type Expense {
    expenseid: ID!,
    purchaseid: ID!,
    amount: Int!,
    expense_date: String!,
    expense_type: String!,
    currency: String!,
    vendorid: String!
}`

const Supplier = `type Supplier {
    email: String!,
    name: String!,
    mobile: String!
}
`

const Vendor = `type Vendor {
    email: String!,
    name: String!,
    mobile: String!
}`

const Customer = `type Customer {
    email: String!,
    name: String!,
    mobile: String!
}`

const Sale = `type Sale {
    saleid: ID!,
    amount: Int!,
    currency: String!
}`

const SalesProduct = `type SalesProduct {
    saleid: ID!,
    productid: ID!,
    name: String!,
    quantity: Int!,
    amount: Int!,
    customerid: ID!,
}`

const User = `type User {
    email: String!,
    password: String!,
    mobile: String!
}`

const ProductInput = `input ProductInput {
    name: String!,
    category: String!,
    description: String!,
    quantity: Int!,
    unit: String!,
    scale: Float!,
    price: Int!,
    amount: Int!,
    date: String!,
    expense_type: String!,
    expense_amount: Int!,
    currency: String,
    supplier_email: String!,
    supplier_name: String!,
    supplier_mobile: String!,
    vendor_email: String!,
    vendor_name: String!,
    vendor_mobile: String!
}`

const ProductID = `type ProductID {
    productid: String!
}
`

const Query = `type Query {
    products: [Product],
    product: Product
}`

const Mutation = `type Mutation {
    addNewProduct(input: ProductInput): [ProductID]
}`

const _schema = [
  Product,
  Purchase,
  Expense,
  Supplier,
  Vendor,
  Customer,
  Sale,
  SalesProduct,
  User,
  ProductInput,
  ProductID,
  Query,
  Mutation
].join('\n')

module.exports = buildSchema(_schema)
