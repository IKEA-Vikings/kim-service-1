const dummyData = require('./dummy-data.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: Number,
  brand: String,
  category: String,
  color: String,
  price: Number,
  linkedColors: Array,
  linkedSizes: Array,
  newProduct: Boolean,
  productAvailable: Boolean
});

const Products = mongoose.model('product', productSchema);



// Seeding script

var seedDatabase = function(callback) {
  mongoose.connect('mongodb://localhost/ikea', {useNewUrlParser: true, useUnifiedTopology: true});
  const database = mongoose.connection;
  database.on('error', err => console.log('error connecting:', err));
  database.once('open', () => console.log('connected to database'));
  database.dropDatabase()
    .then(() => {
      let entries = dummyData.generateRandomEntries();

      return Products.insertMany(entries);
    })
    .then((results) => {
      console.log('successfully seeded database');
      database.close();
      callback(null, results);
    })
    .catch((err) => {
      console.log('err seeding database', err);
      database.close();
      callback(err, null);
    });
};

var queryDatabase = function(productId, callback) {
  // DECIDE WHETHER OR NOT THIS IS SMART; DO I WANT TO BE OPENNING A DATABASE CONNECTION EVERYTIME ???
  mongoose.connect('mongodb://localhost/ikea', {useNewUrlParser: true, useUnifiedTopology: true});
  const database = mongoose.connection;
  database.on('error', err => console.log('error connecting:', err));
  database.once('open', () => console.log('connected to database'));

  Products.findById(productId, (err, results) => {
    if (err) {
      database.close();
      callback(err, null);
    } else {
      database.close();
      callback(null, results);
    }
  });
};

////////// Beginning of new CRUD queries


const createQuery = async (data) => {
  mongoose.connect('mongodb://localhost/ikea', {useNewUrlParser: true, useUnifiedTopology: true});
  const database = mongoose.connection;
  database.on('error', err => console.log('error connecting:', err));
  database.once('open', () => console.log('connected to database'));

  // Get ID of latest entry in database
  const lastEntry = await Products.find({}).sort({_id: -1}).limit(1);
  const newID = lastEntry[0]._id + 1;

  // If input data is empty
  if (Object.keys(data).length === 0) {
    // Use seeding script to generate data
    data = dummyData.generateRandomEntry(newID);
  } else {
    // Update ID before saving
    data._id = newID;
  }

  const newEntry = new Products(data);

  newEntry.save(newEntry)
    .then(result => {
      database.close();
    })
    .catch(err => {
      database.close();
      console.log('Error with MongoDB create query', err);
    });

  return data;
};

const readQuery = async (id) => {
  mongoose.connect('mongodb://localhost/ikea', {useNewUrlParser: true, useUnifiedTopology: true});
  const database = mongoose.connection;
  database.on('error', err => console.log('error connecting:', err));
  database.once('open', () => console.log('connected to database'));

  // Query for product by ID
  const product = await Products.findById(id)
    .catch(err => {
      if (err) {
        console.log('Error with MongoDB read query');
      }
    });
  database.close();
  return product;
};

const updateQuery = async (id, data) => {
  // function will not do anything if data is empty
  if (Object.keys(data).length !== 0) {
    mongoose.connect('mongodb://localhost/ikea', {useNewUrlParser: true, useUnifiedTopology: true});
    const database = mongoose.connection;
    database.on('error', err => console.log('error connecting:', err));
    database.once('open', () => console.log('connected to database'));

    Products.updateOne({_id: id}, {$set: data})
      .then(result => {
        database.close();
      })
      .catch(err => {
        database.close();
        console.log('Error with MongoDB update query', err);
      });
  }
};

const deleteQuery = async (id) => {
  mongoose.connect('mongodb://localhost/ikea', {useNewUrlParser: true, useUnifiedTopology: true});
  const database = mongoose.connection;
  database.on('error', err => console.log('error connecting:', err));
  database.once('open', () => console.log('connected to database'));

  // Query for product by ID and then delete
  await Products.deleteOne({_id: id})
    .then(result => {
      database.close();
    })
    .catch(err => {
      if (err) {
        database.close();
        console.log('Error with MongoDB delete query', err);
      }
    });
};


////////// End of new CRUD queries

module.exports = {
  seedDatabase,
  queryDatabase,
  createQuery,
  updateQuery,
  readQuery,
  deleteQuery
};