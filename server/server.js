const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3003;

const database = require('../database/product');

app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`about section is visible at http://localhost:${port}`);
});

app.get('/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'public/index.html'));
});

app.get('/api/product/:id', (req, res) => {
  var productId = req.params.id;
  database.queryDatabase(productId, (err, results) => {
    if (err) {
      res.status(400).end();
    } else {
      res.status(200);
      res.send(formatResponse(results));
      res.end();
    }
  });
});

app.get('/api/seed', (req, res) => {
  database.seedDatabase((err, results) => {
    if (err) {
      res.status(400).end();
    } else {
      res.status(200);
      res.send(results);
      res.end();
    }
  });
});

// SEPERATION OF CONCERNS ? SHOULD THIS BE IN DATABASE CODE
// IF CHANGING DATABASE NEED TO CHANGE HERE TOO
var formatResponse = function(dbData) {
  let response = {};
  response._id = dbData._id;
  response.brand = dbData.brand;
  response.category = dbData.category;
  response.color = dbData.color;
  response.price = dbData.price;
  if (dbData.linkedColors.length === 0 && dbData.linkedSizes.length === 0) {
    response.moreOptions = false;
  } else {
    response.moreOptions = true;
    response.linkedColors = dbData.linkedColors;
    response.linkedSizes = dbData.linkedSizes;
  }
  response.newProduct = dbData.newProduct;
  response.productAvailable = dbData.productAvailable;
  response.dataQueried = true;
  return response;
};