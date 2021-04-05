const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const opentdb = require('opentdb-api');

const port = process.env.PORT || 4100;

const cleanCat = (cat) => {
  var clean = cat;
  var colon = clean.name.indexOf(':');

  if (colon > -1) {
    clean.name = clean.name.slice(colon + 1);
  }
  return clean;
};

app.use(express.static(path.join(__dirname, 'dist')));

const games = [
  { user: 'Matt', prefs: { Rounds: 3, Questions: 5, Time: 45 } },
  { user: 'Noah', prefs: { Rounds: 5, Questions: 2, Time: 15 } },
];

app.get('/games', (req, res) => {
  console.log(req.query.prefs);
  res.status(200).send(games);
});

// Trivia Call
app.get('/opentdb', (req, res) => {
  if (req.query.method === 'categories') {
    opentdb
      .getCategories()
      .then((result) => {
        for (var category of result) {
          category = cleanCat(category);
        }
        res.status(200).send(result);
      })
      .catch((err) => console.log(err));
  } else {
    opentdb
      .getTrivia(JSON.parse(req.query.options))
      .then((results) => {
        var Trivia = [];
        for (var result of results) {
          var answers = result.incorrect_answers;
          answers.splice(
            Math.floor(Math.random() * 4),
            0,
            result.correct_answer
          );
          Trivia.push({
            question: result.question,
            answers: answers,
            correct: result.correct_answer,
          });
        }
        res.status(200).send(Trivia);
      })
      .catch((err) => console.log(err));
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
