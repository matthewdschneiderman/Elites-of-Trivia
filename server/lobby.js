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
  
  
module.exports = (req, res) => {
    console.log(req.query.prefs);
    lobby.find().countDocuments().then((data) => console.log(data));
    res.status(200).send(games);
};