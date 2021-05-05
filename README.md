# About Section

> This service will be the about section located on the right of the product details page. It will own crucial information about each product most notably the brand, category, and price of each product.

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

<br>

> API Usage:

- GET /api/product/:id

```JSON
{
  "_id": Integer,
  "brand": String,
  "category": String,
  "color": String,
  "price": Integer,
  "moreOptions": Boolean,
  "newItem": Boolean
}
```
- example response based on this [pie plate](https://www.ikea.com/us/en/p/vardagen-pie-plate-off-white-10289307/)

```JSON
{
  "_id": 10289307,
  "brand": "VARDAGEN",
  "category": "Pie plate",
  "color": "off-white",
  "itemPrice": 7.99,
  "moreOptions": false,
  "newItem": false
}
```

<br>

> CRUD Routes:

<br>

Endpoint | Type | Response
--- | --- | ---
'/api/product' | POST | Creates a new product in the database

<br>

```JSON
// Expected user input

{
  "brand": String,
  "category": String,
  "color": String,
  "price": Number,
  "linkedColors": Array,
  "linkedSizes": Array,
  "newProduct": Boolean,
  "productAvailable": Boolean
}

// If user input is not provided, a random entry will be created instead
```
<br>

Endpoint | Type | Response
--- | --- | ---
'/api/product/:id' | PUT | Updates a product in the database by ID

<br>

```JSON
// Expected user input

{
  "_id": Number,
  "brand": String,
  "category": String,
  "color": String,
  "price": Number,
  "linkedColors": Array,
  "linkedSizes": Array,
  "newProduct": Boolean,
  "productAvailable": Boolean
}

// If user input is not provided, document will not be updated
```

<br>

Endpoint | Type | Response
--- | --- | ---
'/api/product/:id' | GET | Reads a product in the database by ID

<br>

```JSON
// Expected response

{
  "_id": Number,
  "brand": String,
  "category": String,
  "color": String,
  "price": Number,
  "moreOptions": Boolean,
  "linkedColors": Array,
  "linkedSizes": Array,
  "newProduct": Boolean,
  "productAvailable": Boolean,
  "dataQueried": Boolean
}
// "moreOptions" and "dataQueried" are added to the initial query
```

<br>

Endpoint | Type | Response
--- | --- | ---
'/api/product/:id' | DELETE | Deletes a product in the database by ID

<br>

```JSON

```

<br>

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

<br>

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

