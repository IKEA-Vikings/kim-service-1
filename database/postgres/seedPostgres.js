const {client, createTable} = require('./postgres.js');
const dummyData = require('../dummy-data.js');



const seedPostgres = async () => {
  await client.connect();
  const data = dummyData.generateRandomEntries();
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    if (data[i].linkedColors.length === 0) {
      data[i].linkedColors = 'ARRAY[]::INTEGER[]';
    }
    if (data[i].linkedSizes.length === 0) {
      data[i].linkedSizes = 'ARRAY[]::INTEGER[]';
    }
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
      ${data[i].linkedSizes},
      ${data[i].linkedColors},
      ${data[i].newProduct},
      ${data[i].productAvailable}
    )
    `;
    console.log(query);
    client.query(query)
      .then(() => {
        console.log('Successfully seeded Postgres database');
      })
      .catch(err => {
        console.log('Error inserting into Postgres', err);
      });
  }
  await client.end();
};

seedPostgres();