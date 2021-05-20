const now = require('performance-now');
const {pool, schema} = require('./postgres.js');
const dummyData = require('../dummy-data.js');

let query = `INSERT INTO products (
  id,
  brand,
  category,
  color,
  price,
  linkedColors,
  linkedSizes,
  newProduct,
  productAvailable
) VALUES`;

const seedPostgres = async () => {
  const start = now();

  const createTable = async () => {
    await pool.connect();
    pool.query(schema)
      .catch(err => {
        console.log('Error creating table', err);
      });
  };
  await createTable();

  await pool.connect()
    .then(async () => {
      let entries = [];
      for (let i = 1; i <= 10000000; i++) {
        let data = dummyData.generateRandomEntry(i);
        let entry = `(
          ${i},
          '${data.brand}',
          '${data.category}',
          '${data.color}',
          ${data.price},
          '{${data.linkedSizes}}'::INTEGER[],
          '{${data.linkedColors}}'::INTEGER[],
          ${data.newProduct},
          ${data.productAvailable}
        )`;
        entries.push(entry);

        if (entries.length === 1000) {
          entries = entries.toString();
          await pool.query(query.concat(entries))
            .then(() => {
              entries = [];
            })
            .catch(err => {
              console.log('Error inserting into Postgres', err);
            });
        }
      }
    })
    .catch(err => {
      console.log('Error connecting to Postgres database', err);
    })
    .finally(() => {
      const end = now();
      console.log(`Databased seeded in ${end - start} milliseconds`);
      pool.end();
      process.exit();
    });
};

seedPostgres();