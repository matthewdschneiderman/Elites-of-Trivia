const express = require('express');
const path = require('path');
const trivia = require('./trivia');
const lobby = require('./lobby');
const app = express();

const port = process.env.PORT || 4100;

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/games', lobby.get);

app.post('/games', lobby.post);

app.delete('/games', lobby.delete);

app.get('/opentdb', trivia);

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
