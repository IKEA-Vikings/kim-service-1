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

> Some usage instructions

> API Usage:
- GET /api/product/:id

```JSON
{
  "_id": integer,
  "brand": string,
  "category": string,
  "color": string,
  "price": integer,
  "moreOptions": boolean,
  "newItem": boolean
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

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

