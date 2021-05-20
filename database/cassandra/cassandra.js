const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1'
});

const createKeyspace = `
  CREATE KEYSPACE ikea
  WITH REPLICATION = {
    'class': 'SimpleStrategy',
    'replication_factor': 1
  }
`;

const createTable = `
  CREATE TABLE ikea.products (
    id int,
    brand text,
    category text,
    color text,
    price float,
    linkedColors set<int>,
    linkedSizes set<int>,
    newProduct boolean,
    productAvailable boolean,
    PRIMARY KEY (id)
  )
`;



module.exports = {
  client,
  createKeyspace,
  createTable

};