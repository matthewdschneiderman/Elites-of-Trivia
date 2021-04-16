var mongoose = require('mongoose');
const { updateJsxFragment } = require('typescript');
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
    gameData: {
      chat: [
        {
          message: String,
          sender: String,
        }
      ],
      round: Number,
      turn: Boolean,
      score: [Number],
      category: {
        id: Number,
        name: String
      },
      question: String,
      history: [
        {
          question: String,
          correct: Boolean
        }
      ]
    }
  })
);

const getOpengames = (res, prefs) => {
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

const getActivegame = (res, room) => {
  activegames
  .findById({
    _id: mongoose.Types.ObjectId.createFromHexString(room),
  })
  .then((data) => {
    res.status(200).send(data);
  });
}

const joinGame = (res, room, user) => {
  activegames
  .findByIdAndUpdate(
    {
      _id: mongoose.Types.ObjectId.createFromHexString(room),
    },
    { 
      full: true, 
      guest: user,
      gameData: {
        chat: [],
        round: 1,
        turn: true,
        score: [0,0],
        category: null,
        question: null,
        history: []
      }
    },
    { new: true }
  )
  .then((data) => {
    res.status(200).send(data);
  });
};

const createGame = (res, user, prefs) => {
  var game = {
    user: user,
    guest: null,
    full: false,
    prefs: prefs,
    gameData: null
  };
  activegames.findOne({ user: game.user }).then((data) => {
    if (data === null) {
      activegames
        .insertMany(game)
        .then((data) => {
          res.status(200).send(data[0]._id);
        })
        .catch(() => res.status(403).send());
    } else {
      res.status(403).send();
    }
  });
};

const updateGame = (res, room, update) => {
  activegames
  .findByIdAndUpdate(
    {
      _id: mongoose.Types.ObjectId.createFromHexString(room),
    },
    update,
    { new: true }
  )
  .then((data) => {
    res.status(200).send(data);
  });
}

module.exports.get = (req, res) => {
  switch (req.query.method) {
    case 'open':
      getOpengames(res, JSON.parse(req.query.prefs));
      break;
    case 'active':
      getActivegame(res, req.query.room);
      break;
  }
};

module.exports.post = (req, res) => {
  switch (req.query.method) {
    case 'join':
      joinGame(res, req.query.room, req.query.user);
      break;
    case 'create':
      createGame(res, req.query.user, JSON.parse(req.query.prefs));
      break;
    case 'update':
      updateGame(res, req.query.room, JSON.parse(req.query.update));
      break;
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
