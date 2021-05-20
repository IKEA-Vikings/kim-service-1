const {client, createKeyspace, createTable} = require('./cassandra.js');
const now = require('performance-now');
const dummyData = require('../dummy-data.js');

let insertQuery = `INSERT INTO ikea.products (
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

const seedCassandra = async () => {
  const start = now();

  await client.execute('DROP KEYSPACE IF EXISTS ikea')
    .catch(err => {
      console.log('Error dropping Cassandra keyspace', err);
    });

  await client.execute(createKeyspace)
    .catch(err => {
      console.log('Error creating Cassandra keyspace', err);
    });

  await client.execute(createTable)
    .catch(err => {
      console.log('Error creating Cassandra table', err);
    })
    .then(async () => {
      let entries = [];
      for (let i = 1; i <= 10000000; i++) {
        let data = dummyData.generateRandomEntry(i);
        let entry = `INSERT INTO ikea.products (
          id,
          brand,
          category,
          color,
          price,
          newProduct,
          productAvailable,
          linkedColors,
          linkedSizes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        entries.push({query: entry, params: Object.values(data)});
        if (entries.length === 250) {
          await client.batch(entries, {prepare: true})
            .then(() => {
              entries = [];
            })
            .catch(err => {
              console.log('Error inserting batch into Cassandra', err);
            });
        }
      }
    })
    .catch(err => {
      console.log('Error inserting data into Cassandra', err);
    })
    .finally(() => {
      const end = now();
      console.log(`Databased seeded in ${end - start} milliseconds`);
      process.exit();
    });
};

seedCassandra();