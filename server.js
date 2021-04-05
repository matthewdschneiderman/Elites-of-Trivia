const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const opentdb = require('opentdb-api');
var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/trivia',
    {useNewUrlParser: true, useUnifiedTopology: true});
var lobby = mongoose.model('lobby', new mongoose.Schema({
  user: String,
  prefs: {
    Rounds: Number,
    Questions: Number,
    Time: Number
  }
}));

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

const shite = [[3,5,7,10],[2,3,4,5],[15,30,45,60]];

for (var i=0;i<20;i++) {
  var fake = [shite[0][Math.floor(Math.random()*4)],
  shite[1][Math.floor(Math.random()*4)],
  shite[2][Math.floor(Math.random()*4)]]
  games.push({user: `fakeUser${Math.random().toFixed(5)}`, prefs: { Rounds: fake[0], Questions: fake[1], Time: fake[2] }});
}

app.get('/games', (req, res) => {
  console.log(req.query.prefs);
  lobby.find().countDocuments().then((data) => console.log(data));
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
