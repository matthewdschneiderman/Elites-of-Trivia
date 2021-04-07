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
  // console.log(req.query.prefs);
  var prefs = JSON.parse(req.query.prefs);
  activegames
    .find({
      'prefs.Rounds': prefs.Rounds === null ? {
        $in: [3, 5, 7, 10] } : prefs.Rounds,
      'prefs.Questions': prefs.Questions === null ? {
        $in: [2, 3, 4, 5] } : prefs.Questions,
      'prefs.Time': prefs.Time === null ? {
        $in: [15, 30, 45, 60] } : prefs.Time
    })
    .then((data) => {
      //console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.post = (req, res) => {
    console.log(req.query);
    var game = { user: req.query.user, prefs: JSON.parse(req.query.prefs)};
    activegames.findOne({user: game.user}).then((data) => {
      console.log(data);
      if (data === null) {
        activegames
          .insertMany(game)
          .then((data) => {
            // console.log('id: ', data[0]._id);
            res.status(200).send(data[0]._id);
          })
          .catch(() => res.status(200).send(null));
      } else {
        res.status(200).send(null);
      }
      })
}
