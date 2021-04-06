const opentdb = require('opentdb-api');

const cleanCat = (cat) => {
    var clean = cat;
    var colon = clean.name.indexOf(':');
  
    if (colon > -1) {
      clean.name = clean.name.slice(colon + 1);
    }
    return clean;
  };

module.exports = (req, res) => {
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
  };