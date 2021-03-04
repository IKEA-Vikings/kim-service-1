const express = require('express');
const path = require('path');
const app = express();
const port = 3003;

app.use(express.static(path.join(__dirname, '../', 'public')));

app.listen(port, () => {
  console.log(`about section is visible at http://localhost:${port}`);
});