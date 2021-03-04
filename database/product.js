const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  brand: String,
  category: String,
  color: String,
  price: Number,
  linked_colors: Array,
  linked_sizes: Array,
  new_product: Boolean,
  product_available: Boolean
});

module.exports = mongoose.model('product', productSchema)