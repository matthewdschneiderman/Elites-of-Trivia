var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/trivia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const activegames = mongoose.model(
  'activegames',
  new mongoose.Schema({
    user: String,
    prefs: {
      Rounds: Number,
      Questions: Number,
      Time: Number,
    },
  })
);

module.exports.get = (req, res) => {
  console.log(req.query.prefs);
  var prefs = JSON.parse(req.query.prefs);
  activegames
    .find({
      'prefs.Rounds': {
        $in: prefs.Rounds === null ? [3, 5, 7, 10] : [prefs.Rounds],
      },
      'prefs.Questions': {
        $in: prefs.Questions === null ? [2, 3, 4, 5] : [prefs.Questions],
      },
      'prefs.Time': {
        $in: prefs.Time === null ? [15, 30, 45, 60] : [prefs.Time],
      },
    })
    .then((data) => {
      // console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.post = (req, res) => {
    console.log(req.query);
    var game = { user: req.query.user, prefs: JSON.parse(req.query.prefs)};
    activegames
        .insertMany(game)
        .then(() => res.status(200).send(true))
        .catch(() => res.status(200).send(false));
}
