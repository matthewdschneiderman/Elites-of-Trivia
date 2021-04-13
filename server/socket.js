const express = require('express');
const app = express();
const port = 5000;
var server = require('http').createServer(app);

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
    console.log('disconnected');
  });

  socket.on('create room', (data) => {
    console.log('a user connected', data);
    socket.join(data.room);
  });

  socket.on('join room', (data) => {
    console.log('a user connected', data);
    socket.join(data.room);
    socket.broacast.to(data.room).emit('start game');
  });

  socket.on('lobbyUpdate', () => {
    console.log('the database changed');
    socket.broadcast.to('lobby').emit('dbUpdate');
  });

  socket.on('leave room', (data) => {
    console.log('a user disconnected');
    socket.leave(data.room);
  });

  // socket.on('new message', (data) => {
  //   socket.broadcast
  //     .to(data.room)
  //     .emit('receive message', [data.messageObj, data.room]);
  // });
});

server.listen(port);
