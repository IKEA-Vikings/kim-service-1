const {Client, Pool} = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  port: 5432
});

const schema = `
  DROP TABLE products;
  CREATE TABLE IF NOT EXISTS products (
  id INTEGER NOT NULL PRIMARY KEY,
  brand VARCHAR(15) NOT NULL,
  category VARCHAR(20) NOT NULL,
  color VARCHAR(15) NOT NULL,
  price NUMERIC(4,1) NOT NULL,
  linkedColors INTEGER ARRAY[5],
  linkedSizes INTEGER ARRAY[4],
  newProduct BOOLEAN NOT NULL,
  productAvailable BOOLEAN NOT NULL
);
`;

// const createTable = async () => {
//   await pool.connect();
//   pool.query(schema)
//     .then(res => {
//       console.log('Table successfully created');
//     })
//     .catch(err => {
//       console.log('Error creating table', err);
//     })
//     .finally(() => {
//       pool.end();
//     });
// };



module.exports = {
  pool,
  schema
};