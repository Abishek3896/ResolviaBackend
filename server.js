const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Resolvia Backend');
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
