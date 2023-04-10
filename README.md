# Sales System

# Program Analysis

## Required Features

1. Handle sales records
2. Load clients data
3. Load employees data
4. Print an invoice of a purchase

### Client Data

* First name
* Last name
* DNI
* Date of birth
* Age
* Credit card number

### Employee Data

* First name
* Last name
* DNI
* Date of birth
* Age
* Employee ID

### Product data

* Name
* Brand
* Expiration date
* Unit price
* Supplier

### Invoice (sale) data

* Client's first and last name
* Employee's first and last name, and ID
* List of sold products with each:
    * Product name
    * Unit price
    * Quantity
    * Total product price (quantity times unit price)
    * Date of purchase
* Total price of purchase

# Program Design

### Software Stack used for the project: MERN

Backend is written in Node.JS with the Express framework. A RESTful API provides CRUD functionality for all data models, as well as extra features such as invoice PDF generation. Details can be found in the code.

A non-relational database implemented in MongoDB with Mongoose as ODM is used to handle the data. Although a non-relational database is used, relations between models of the database are implemented to create an invoice that has references to the client, employee, and the products sold. The relations are as follow:

* invoice -> client 1 to 1 relation. Each invoice can only have one client associated
* client ->  invoice 1 to many relation. Each client can be associated with many invoices
* invoice -> employee 1 to 1 relation. Each invoice can only have one employee associated
* employee ->  invoice 1 to many relation. Each employee can be associated with many invoices
* invoice -> product 1 to many relation. Each invoice can be associated with many products
* product -> invoice 1 to many relation. Each product can be associated with many invoices

For the frontend, an application written in React is used, with components extracted from libraries such as Bootstrap and Material UI.
