const dummyData = require('./dummy-data.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: Number,
  brand: String,
  category: String,
  color: String,
  price: Number,
  linked_colors: Array,
  linked_sizes: Array,
  new_product: Boolean,
  product_available: Boolean
});

const Products = mongoose.model('product', productSchema);

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

var queryDatabase = function() {
  // query for id
};

module.exports = {
  seedDatabase,
  queryDatabase
};

seedDatabase(() => {});