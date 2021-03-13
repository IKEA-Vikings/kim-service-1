const dummyData = require('../database/dummy-data.js');

test('random brand generated', () => {
  expect(dummyData.brands).toContain(dummyData.randomBrand());
});

test('random category generated', () => {
  expect(dummyData.categories).toContain(dummyData.randomCategory());
});

test('random color generated', () => {
  expect(dummyData.colors).toContain(dummyData.randomColor());
});

test('random price generated', () => {
  expect(dummyData.prices).toContain(dummyData.randomPrice());
});

test('random value for new product returned', () => {
  expect(typeof dummyData.randomValueNewProduct()).toBe('boolean');
});

test('random value for product available returned', () => {
  expect(typeof dummyData.randomValueProductAvailable()).toBe('boolean');
});

test('randomLinkedColors generates an array of length 0 or between 2 and 5', () => {
  let possibleVal = [0, 2, 3, 4, 5];
  expect(possibleVal).toContain(dummyData.randomLinkedColors().length);
});

test('randomLinkedSizes generates an array of length 0 or between 2 and 4', () => {
  let possibleVal = [0, 2, 3, 4];
  expect(possibleVal).toContain(dummyData.randomLinkedSizes().length);
});

test('generateRandomEntry returns an object with necessary keys', () => {
  let randomEntry = dummyData.generateRandomEntry();
  expect(randomEntry).toHaveProperty('_id');
  expect(randomEntry).toHaveProperty('brand');
  expect(randomEntry).toHaveProperty('category');
  expect(randomEntry).toHaveProperty('color');
  expect(randomEntry).toHaveProperty('price');
  expect(randomEntry).toHaveProperty('newProduct');
  expect(randomEntry).toHaveProperty('productAvailable');
  expect(randomEntry).toHaveProperty('linkedColors');
  expect(randomEntry).toHaveProperty('linkedSizes');
});

test('generateRandomEntries returns 100 unique entries', () => {
  let randomEntries = dummyData.generateRandomEntries();
  expect(randomEntries).toHaveLength(100);
  expect(randomEntries[0]).not.toBe(randomEntries[1]);
});