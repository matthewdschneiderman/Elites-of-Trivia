const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const opentdb = require('opentdb-api');

const port = process.env.PORT || 4100;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/opentdb', (req, res) => {
  console.log(req.params);
  switch (req.params.method) {
    case 'categories':
      opentdb.getCategories().then((result) => {
        res.send(result);
      });
    case 'questions':
      opentdb.getTrivia(req.params.options).then((result) => {
        res.send(result);
      });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => {
  console.log('listening on port: ', port, '.');
});
