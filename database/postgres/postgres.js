const {Client} = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  port: 5432
});

const schema = `
  DROP TABLE products;
  CREATE TABLE IF NOT EXISTS products (
  id SERIAL NOT NULL PRIMARY KEY,
  brand VARCHAR(15) NOT NULL,
  category VARCHAR(20) NOT NULL,
  color VARCHAR(15) NOT NULL,
  price NUMERIC(4,1) NOT NULL,
  linkedColors SMALLINT[],
  linkedSizes SMALLINT[],
  newProduct BOOLEAN NOT NULL,
  productAvailable BOOLEAN NOT NULL
);
`;

const createTable = async () => {
  await client.connect();
  client.query(schema)
    .then(res => {
      console.log('Table successfully created');
    })
    .catch(err => {
      console.log('Error creating table', err);
    })
    .finally(() => {
      client.end();
    });
};



module.exports = {
  client,
  createTable
};