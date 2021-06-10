const newrelic = require('newrelic');
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const postgres = require('../database/postgres/postgres.js');
const cass = require('../database/cassandra/cassandra.js');

const app = express();
const port = 3003;

const database = require('../database/product');

app.use(cors());

app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`about section is visible at http://localhost:${port}`);
});

app.get('/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'public/index.html'));
});


// linkedColors and linkedSizes changed to linkedcolors and linkedsizes
// Postgres changes capitalized letters in columns to lowercase
var formatResponse = function(dbData) {
  let response = {};
  response._id = dbData._id;
  response.brand = dbData.brand;
  response.category = dbData.category;
  response.color = dbData.color;
  response.price = dbData.price;
  if (dbData.linkedcolors.length === 0 && dbData.linkedsizes.length === 0) {
    response.moreOptions = false;
  } else {
    response.moreOptions = true;
    response.linkedColors = dbData.linkedcolors;
    response.linkedSizes = dbData.linkedsizes;
  }
  response.newProduct = dbData.newProduct;
  response.productAvailable = dbData.productAvailable;
  response.dataQueried = true;
  return response;
};


////////////////////////////////////////////
////////// Beginning of Postgres CRUD routes
////////////////////////////////////////////


app.post('/api/product/', (req, res) => {
  postgres.createPGQuery(req.body)
    .then(() => {
      res.status(201).send('New product added to the database');
    })
    .catch(err => {
      if (err) {
        console.log('Error with postgres create route', err);
        res.status(404).end();
      }
    });
});

app.get('/api/product/:id', (req, res) => {
  postgres.readPGQuery(req.params.id)
    .then((response) => {
      if (response === undefined) {
        res.status(404).send('Product does not exist');
      } else {
        let formattedResponse = formatResponse(response);
        res.status(200).send(formattedResponse);
      }
    })
    .catch(err => {
      if (err) {
        console.log('Error with postgres read route', err);
        res.status(404).end();
      }
    });
});

app.put('/api/product/:id', (req, res) => {
  postgres.updatePGQuery(req.params.id, req.body)
    .then(() => {
      res.status(200).send(`Product ${req.params.id} udpated`);
    })
    .catch(err => {
      if (err) {
        console.log('Error with postgres update route', err);
      }
    });
});

app.delete('/api/product/:id', (req, res) => {
  postgres.deletePGQuery(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      if (err) {
        console.log('Error with postgres delete route', err);
      }
    });
});


///////////////////////////////////////////////////
// Original GET and seed routes and format function
///////////////////////////////////////////////////


/*
// SEPERATION OF CONCERNS ? SHOULD THIS BE IN DATABASE CODE
// IF CHANGING DATABASE NEED TO CHANGE HERE TOO
var formatResponse = function(dbData) {
  let response = {};
  response._id = dbData._id;
  response.brand = dbData.brand;
  response.category = dbData.category;
  response.color = dbData.color;
  response.price = dbData.price;
  if (dbData.linkedcolors.length === 0 && dbData.linkedsizes.length === 0) {
    response.moreOptions = false;
  } else {
    response.moreOptions = true;
    response.linkedColors = dbData.linkedcolors;
    response.linkedSizes = dbData.linkedsizes;
  }
  response.newProduct = dbData.newProduct;
  response.productAvailable = dbData.productAvailable;
  response.dataQueried = true;
  return response;
};

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
*/


/////////////////////////////////////////
////////// Beginning of Mongo CRUD routes
/////////////////////////////////////////


/*
app.post('/api/product/', (req, res) => {
  database.createQuery(req.body)
    .then(result => {
      res.status(201).send(formatResponse(result));
    })
    .catch(err => {
      if (err) {
        console.log('Error with create API route', err);
        res.status(400).end();
      }
    });
});

app.get('/api/product/:id', (req, res) => {
  const productId = req.params.id;
  database.readQuery(productId)
    .then(result => {
      res.status(200).send(formatResponse(result));
    })
    .catch(err => {
      if (err) {
        console.log('Error with reading API route', err);
        res.status(400).end();
      }
    });
});

app.put('/api/product/:id', (req, res) => {
  const productId = req.params.id;
  database.updateQuery(productId, req.body)
    .then(result => {
      res.status(204).end();
    })
    .catch(err => {
      if (err) {
        console.log('Error with update API route');
        res.status(400).end();
      }
    });
});

app.delete('/api/product/:id', (req, res) => {
  const productId = req.params.id;
  database.deleteQuery(productId)
    .then(result => {
      res.status(204).end();
    })
    .catch(err => {
      if (err) {
        console.log('Error with delete API route', err);
        res.status(400).end();
      }
    });
});
*/


/////////////////////////////////////////////
////////// Beginning of Cassandra CRUD routes
/////////////////////////////////////////////


/*
app.get('/cassandra/product/:id', (req, res) => {
  cass.readCassQuery(req.params.id)
    .then((response) => {
      if (response === undefined) {
        res.status(404).send('Product does not exist');
      } else {
        res.status(200).send(response);
      }
    })
    .catch(err => {
      if (err) {
        console.log('Error with postgres read route', err);
      }
    });
});
*/