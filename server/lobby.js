var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/trivia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var lobby = mongoose.model(
  'lobby',
  new mongoose.Schema({
    user: String,
    prefs: {
      Rounds: Number,
      Questions: Number,
      Time: Number,
    },
  })
);

module.exports = (req, res) => {
  console.log(req.query.prefs);
  // lobby.insertMany(games);
  var prefs = JSON.parse(req.query.prefs);
  lobby
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
