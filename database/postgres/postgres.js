const {Client, Pool} = require('pg');
const dummyData = require('../dummy-data.js');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  port: 5432
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
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

const createPGQuery = async (data) => {
  const queryID = 'SELECT id FROM products ORDER BY id DESC LIMIT 1';
  const { rows } = await pool.query(queryID);

  const newID = rows[0].id + 1;
  const columnNames = '(id, brand, category, color, price, linkedColors, linkedSizes, newProduct, productAvailable)';

  let columnValues;
  if (Object.keys(data).length === 0) {
    const entry = dummyData.generateRandomEntry(newID);
    columnValues = `
      (${newID},
      '${entry.brand}',
      '${entry.category}',
      '${entry.color}',
      ${entry.price},
      '{${entry.linkedColors}}'::INTEGER[],
      '{${entry.linkedSizes}}'::INTEGER[],
      ${entry.newProduct}, ${entry.productAvailable})`;
  } else {
    columnValues = `
      (${newID},
      '${data.brand}',
      '${data.category}',
      '${data.color}',
      ${data.price},
      '{${data.linkedColors}}'::INTEGER[],
      '{${data.linkedSizes}}'::INTEGER[],
      ${data.newProduct},
      ${data.productAvailable})`;
  }

  const queryInsert = `INSERT INTO products ${columnNames} VALUES ${columnValues}`;

  await pool.query(queryInsert)
    .catch(err => {
      if (err) {
        console.log('Error with Postgres create query', err);
      }
    });
};

const readPGQuery = async (id) => {
  const query = `SELECT * FROM products WHERE id = ${id}`;
  const {rows} = await pool.query(query)
    .catch(err => {
      if (err) {
        console.log('Error with Postgres read query', err);
      }
    });
  return rows[0];
};

const updatePGQuery = async (id, data) => {
  if (Object.keys(data).length === 0) {
    return;
  }

  const columnNames = Object.keys(data);
  const columnValues = Object.values(data);

  let queryData = '';
  let nextInsert;
  for (let i = 0; i < columnNames.length; i++) {
    if (columnNames[i] === 'brand' || columnNames[i] === 'category' || columnNames[i] === 'color') {
      nextInsert = `${columnNames[i]} = '${columnValues[i]}'`;
    } else if (columnNames[i] === 'linkedSizes' || columnNames[i] === 'linkedColors') {
      nextInsert = `${columnNames[i]} = '{${columnValues[i]}}'::INTEGER[]`;
    } else {
      nextInsert = `${columnNames[i]} = ${columnValues[i]}`;
    }
    queryData = queryData.concat(', ', nextInsert);
  }
  queryData = queryData.substring(2);

  const query = `UPDATE products SET ${queryData} WHERE id = ${id}`;
  console.log(query);
  await pool.query(query)
    .catch(err => {
      if (err) {
        console.log('Error with Postgres update query', err);
      }
    });
};

const deletePGQuery = async (id) => {
  const query = `DELETE FROM products WHERE id = ${id}`;
  pool.query(query)
    .catch(err => {
      if (err) {
        console.log('Error with Postgres delete query', err);
      }
    });
};


module.exports = {
  pool,
  schema,
  createPGQuery,
  readPGQuery,
  updatePGQuery,
  deletePGQuery
};