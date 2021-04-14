const express = require('express');
const app = express();
const port = 5000;
var server = require('http').createServer(app);
console.log('Socket.io running on port 5000');


const io = require('socket.io')(server, {
  cors: {
    // origin: 'http://18.224.228.145:80',
    origin: 'localhost:4100',
    credentials: true,
    allowedHeaders: ['activegames'],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  // console.log('connected');
  socket.on('disconnect', (reason) => {
    //console.log('disconnected');
  });

  socket.on('join room', (data) => {
    console.log('a user connected', data);
    socket.join(data.room);
  });

  socket.on('create game', (data) => {
    // games.create({room: data.room,
    //   player1: data.player1,
    //   player2: null,
    //   prefs: data.prefs});
  });

  socket.on('lobbyUpdate', () => {
    socket.broadcast.emit('lobby updated');
  });

  socket.on('leave room', (data) => {
    console.log('a user disconnected');
    socket.leave(data.room);
  });

  socket.on('full house', (data) => {
    console.log(`Room ${data._id} is full`);
    socket.to(data._id).emit('action', {
      method: 'guest joined',
      data: data
    });
  });

  socket.on('start game', (data) => {
    console.log(`Game starting in room ${data._id}`);
    socket.to(data._id).emit('action', {
      method: 'start game',
      data: data
    });
  });

});

server.listen(port);
