var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/trivia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const activegames = mongoose.model(
  'activegames',
  new mongoose.Schema({
    room: String,
    player1: String,
    player2: String,
    prefs: {
      Rounds: Number,
      Questions: Number,
      Time: Number,
    },
  })
);

module.exports.create = (data) => {
  activegames.insertMany(data);
}

module.exports.join = (data, cb) => {
  activegames.findOne({room: data.room}).then(cb);
}