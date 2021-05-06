CREATE TABLE products (
  id SERIAL NOT NULL PRIMARY KEY,
  brand VARCHAR(15) NOT NULL,
  category VARCHAR(20) NOT NULL,
  color VARCHAR(15) NOT NULL,
  price NUMERIC(3,1) NOT NULL,
  linkedColors SMALLINT[],
  linkedSizes SMALLINT[],
  newProduct BOOLEAN NOT NULL,
  productAvailable BOOLEAN NOT NULL
);