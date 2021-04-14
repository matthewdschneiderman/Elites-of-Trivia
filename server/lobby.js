var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/trivia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const activegames = mongoose.model(
  'activegames',
  new mongoose.Schema({
    user: String,
    guest: String,
    full: Boolean,
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
      full: false,
      'prefs.Rounds':
        prefs.Rounds === null
          ? {
              $in: [3, 5, 7, 10],
            }
          : prefs.Rounds,
      'prefs.Questions':
        prefs.Questions === null
          ? {
              $in: [2, 3, 4, 5],
            }
          : prefs.Questions,
      'prefs.Time':
        prefs.Time === null
          ? {
              $in: [15, 30, 45, 60],
            }
          : prefs.Time,
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
  if (JSON.parse(req.query.join)) {
    activegames
      .findByIdAndUpdate(
        {
          _id: mongoose.Types.ObjectId.createFromHexString(req.query.room),
        },
        { full: true, guest: req.query.user },
        { new: true }
      )
      .then((data) => {
        res.status(200).send(data);
      });
  } else {
    var game = {
      user: req.query.user,
      guest: null,
      full: false,
      prefs: JSON.parse(req.query.prefs),
    };
    activegames.findOne({ user: game.user }).then((data) => {
      // console.log(data);
      if (data === null) {
        activegames
          .insertMany(game)
          .then((data) => {
            // console.log('id: ', data[0]._id);
            res.status(200).send(data[0]._id);
          })
          .catch(() => res.status(403).send());
      } else {
        res.status(403).send();
      }
    });
  }
};

module.exports.delete = (req, res) => {
  console.log('here', req.query);
  activegames
    .findByIdAndDelete({
      _id: mongoose.Types.ObjectId.createFromHexString(req.query.room),
    })
    .then(() => {
      // console.log('deleted!', req.query.prefs);
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(400);
    });
};
