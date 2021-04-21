const express = require('express');
const app = express();
const port = 5000;
var server = require('http').createServer(app);
console.log('Socket.io running on port 5000');

var finishedGames = {};

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

  socket.on('lobbyUpdate', () => {
    socket.broadcast.emit('lobby updated');
  });

  socket.on('leave room', (data) => {
    //console.log('a user disconnected');
    socket.leave(data.room);
  });

  socket.on('test', (data) => {
    console.log(data);
  });

  socket.on('guest joined', (data) => {
    //console.log(`Room ${data._id} is full`);
    socket.to(data.room).emit('guest joined', data.guest);
  })

  socket.on('game updated', (data) => {
      //console.log(`Room ${data._id} had an update`);
      socket.to(data.room).emit('game updated', data.byWhom);
  });

  socket.on('question', (data) => {
    socket.to(data.room).emit('question', data.content);
  });

  socket.on('answer', (data) => {
    socket.to(data.room).emit('answer', data.content);
  });

  socket.on('rematch proposed', (data) => {
    if (finishedGames[data.room]) {
      socket.to(data.room).emit('rematch accepted', data.user);
    } else {
      finishedGames[data.room] = true;
    }
  });
});

server.listen(port);
