const now = require('performance-now');
const {pool, schema} = require('./postgres.js');
const dummyData = require('../dummy-data.js');

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

  const data = dummyData.generateRandomEntries();

  await pool.connect()
    .then(async () => {
      for (let i = 0; i < data.length; i++) {
        let query = `
          INSERT INTO products (
            id,
            brand,
            category,
            color,
            price,
            linkedColors,
            linkedSizes,
            newProduct,
            productAvailable
          )
          VALUES (
            ${data[i]._id},
            '${data[i].brand}',
            '${data[i].category}',
            '${data[i].color}',
            ${data[i].price},
            '{${data[i].linkedSizes}}'::INTEGER[],
            '{${data[i].linkedColors}}'::INTEGER[],
            ${data[i].newProduct},
            ${data[i].productAvailable}
          )
        `;

        await pool.query(query)
          .catch(err => {
            console.log('Error inserting into Postgres', err);
          });
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