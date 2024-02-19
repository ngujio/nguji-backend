-- Create the products table
CREATE TABLE IF NOT EXISTS products (
    productID VARCHAR(50) UNIQUE PRIMARY KEY,
    purchaseID VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    quantity INTEGER NOT NULL,
    unit VARCHAR(20) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    products_date DATE NOT NULL
);

CREATE INDEX product_ix_productID ON products(productID, purchaseID);

-- Create the purchases table
CREATE TABLE IF NOT EXISTS purchases (
    purchaseID VARCHAR(50) PRIMARY KEY REFERENCES products(purchaseID),
    purchase_date DATE NOT NULL,
    productID VARCHAR(50) REFERENCES products(productID),
    price NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    expensesID VARCHAR(50) REFERENCES expenses(expenseID),
    supplierID VARCHAR(50) REFERENCES suppliers(email),
    CONSTRAINT purchases_price_is_gt_0 CHECK (price > 0)
);

CREATE INDEX purchases_ix_purchaseID ON purchases(purchaseID);

-- Create the expenses table
CREATE TABLE IF NOT EXISTS expenses (
    expenseID VARCHAR(50) UNIQUE PRIMARY KEY,
    purchaseID VARCHAR(50) REFERENCES products(purchaseID),
    amount NUMERIC(10, 2) NOT NULL,
    expense_type VARCHAR(50) NOT NULL,
    expense_date DATE NOT NULL,
    currency VARCHAR(10) NOT NULL,
    vendorID VARCHAR(50) REFERENCES vendors(email),
    CONSTRAINT expenses_amount_is_gt_0 CHECK (amount > 0)
);

CREATE INDEX expenses_ix_expenseID ON expenses(expenseID);

-- Create the suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
    email VARCHAR(50) UNIQUE PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    mobile VARCHAR(20)
);


-- Create the vendors table
CREATE TABLE IF NOT EXISTS vendors (
    email VARCHAR(50) UNIQUE PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    mobile VARCHAR(20)
);

-- Create the customers table
CREATE TABLE IF NOT EXISTS customers (
    email VARCHAR(50)UNIQUE PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    mobile VARCHAR(20)
);

-- Create the sales table
CREATE TABLE IF NOT EXISTS sales (
    saleID DATE UNIQUE PRIMARY KEY,
    amount NUMERIC(10, 2),
    currency VARCHAR(10) NOT NULL
);

-- Create the sales_products table to store the relationship between sales and products
CREATE TABLE IF NOT EXISTS sales_products (
    saleID DATE NOT NULL,
    productID VARCHAR(50) REFERENCES products(productID),
    name VARCHAR(50),
    quantity INTEGER,
    amount NUMERIC(10, 2),
    customerID VARCHAR(50) REFERENCES customers(email),
    CONSTRAINT sales_products_quantity_is_gt_0 CHECK (quantity>0),
    CONSTRAINT sales_products_amount_is_gt_0 CHECK (amount > 0) 
);

CREATE INDEX sales_ix_id ON sales_products(saleID, productID);

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(50) UNIQUE PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL
);

-- Insert mock data into the products table
INSERT INTO products (productID, purchaseID, name, category, description, quantity, unit, price, currency, products_date)
VALUES
('PROD001', 'PUR001', 'Product A', 'Electronics', 'Description of Product A', 100, 'pcs', 50.00, 'USD', '2022-01-01'),
('PROD002', 'PUR002', 'Product B', 'Clothing', 'Description of Product B', 50, 'pcs', 25.00, 'USD', '2022-01-02');

-- Insert mock data into the purchases table
INSERT INTO purchases (purchaseID, purchase_date, productID, price, currency, expensesID, supplierID)
VALUES
('PUR001', '2022-01-01', 'PROD001', 5000.00, 'USD','EXP001', 'supplier1@example.com'),
('PUR002', '2022-01-02', 'PROD002', 1500.00, 'USD','EXP002', 'supplier2@example.com');

-- Insert mock data into the expenses table
INSERT INTO expenses (expenseID, purchaseID, amount, currency, expense_type, expense_date, vendorID)
VALUES
('EXP001', 'PUR001', 5000.00, 'USD','Operating Expense', '2022-01-01', 'vendor1@example.com'),
('EXP002', 'PUR002', 2500.00, 'USD','Operating Expense', '2022-01-02', 'vendor2@example.com');

-- Insert mock data into the suppliers table
INSERT INTO suppliers (email, name, mobile)
VALUES
('supplier1@example.com', 'Supplier 1', '123-456-7890'),
('supplier2@example.com', 'Supplier 2', '987-654-3210');

-- Insert mock data into the vendors table
INSERT INTO vendors (email, name, mobile)
VALUES
('vendor1@example.com', 'Vendor 1', '111-222-3333'),
('vendor2@example.com', 'Vendor 2', '444-555-6666');

-- Insert mock data into the customers table
INSERT INTO customers (email, name, mobile)
VALUES
('customer1@example.com', 'Customer 1', '999-888-7777'),
('customer2@example.com', 'Customer 2', '666-555-4444');

-- Insert mock data into the sales table
INSERT INTO sales (saleID, amount, currency)
VALUES
('2022-01-01', 625.00, 'USD');

-- Insert mock data into the sales_products table
INSERT INTO sales_products (saleID, productID, name, quantity, amount, customerID)
VALUES
('2022-01-01', 'PROD001', 'Product A', 10, 500.00, 'customer1@example.com'),
('2022-01-01', 'PROD002', 'Product B', 5, 125.00, 'customer2@example.com');

-- Insert mock data into the users table
INSERT INTO users (email, password, username)
VALUES
('user1@example.com', 'hashed_password_1', 'User 1'),
('user2@example.com', 'hashed_password_2', 'User 2');
