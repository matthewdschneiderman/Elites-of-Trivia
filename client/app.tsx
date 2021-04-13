import React, { useEffect, useState, FC } from "react";
import Game from './components/Game/index'
import NewGame from './components/NewGame/index'
import axios from 'axios';
const io = require('socket.io-client');
// import GameStart from './components/GameStart/index'
// import Player, { ICategory, IPlayer } from './components/Player/index'
// import QuestionsView from './components/QuestionsView/index'
// import GameOver from './components/GameOver/index'


export interface Prefs {
  [index: string]: number | string,
  Rounds: number,
  Questions: number,
  Time: number
}

export interface Game {
  _id: string,
  user: string,
  prefs: Prefs
}


const App: FC = () => {

  const socket = io('localhost:5000', {
    "secure": true,
    "force new connection" : true,
    "reconnectionAttempts": "10", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
    "transports" : ["websocket"],
    // 'transports': ['polling']
  });

    const [roomId, setRoomId] = useState<string>('lobby');
    const [change, setChange] = useState<boolean>(false);
    const [player, setPlayer] = useState<string>('Anonymous');
    
    useEffect(() => {

    }, [change]);

    if (roomId === 'lobby') {
      socket.on('dbUpdate', () => {
        setChange(!change)
      });
    } else {
      
    }

    const backClick = () => {
      socket.emit('leave room', {
        room: roomId
      });
      axios({
        url: '/games',
        method: 'delete',
        params: {
          prefs: roomId
        }
      })
      .then(() => {
        socket.emit('lobbyUpdate');
        setRoomId('lobby');
        socket.emit('join room', {room: 'lobby'});
        setChange(!change);
      })
    }
    
    return (
      <div>
        <div className="header">
          <div className="title">Elites of Trivia</div>
        </div>
          <div>{
          roomId === 'lobby' ? <NewGame handleClick={(_id: string, player: string, action: boolean) => {
            setPlayer(player);
            if (action) {
              socket.emit('lobbyUpdate');
              setRoomId(_id);
              socket.emit('create room', {room: _id});
              setChange(!change);
            } else {
              axios({
                url: '/games',
                method: 'delete',
                params: {
                  prefs: _id
                }
              })
              .then(() => {
                socket.emit('lobbyUpdate');
                setRoomId(_id);
                socket.emit('join room', {room: _id});
                setChange(!change);
              })
            }
          }} change={change}/> :
          <Game player={player} roomId={roomId} backClick={backClick}/>
        }
          </div>
    </div>
    )
  }

  
export default App;

