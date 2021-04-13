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
    const [player1, setPlayer1] = useState<string>('Anonymous');
    const [player2, setPlayer2] = useState<string>('Anonymous');
    const [view, setView] = useState<string>('waiting');
    
    useEffect(() => {
      socket.emit('join room', {room: roomId});
    }, [change]);


    socket.on('lobby updated', () => {
      console.log('the database changed');
      if (roomId === 'lobby') {
        setChange(!change);
      }
    });

    socket.on('action', (options: any) => {
      console.log(options);
      changeView('game');
    });

    const changeView = (view: string) => {
      setView(view);
      setChange(!change);
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
        setChange(!change);
      })
    }
    
    return (
      <div>
        <div className="header">
          <div className="title">Elites of Trivia</div>
        </div>
          <div>{
          roomId === 'lobby' ? <NewGame handleClick={(_id: string, player: string, action: boolean, prefs: Prefs) => {
            setPlayer1(player);
            if (action) {
              socket.emit('lobbyUpdate');
              //socket.emit('create game', {player1: player1, prefs: prefs})
              setRoomId(_id);
              setChange(!change);
            } else {
              axios({
                url: '/games',
                method: 'join',
                params: {
                  join: true,
                  room: _id,
                  user: player2
                }
              })
              .then(() => {
                socket.emit('lobbyUpdate');
                setRoomId(_id);
                setChange(!change);
                //socket.emit('full house', {room: _id, player2: player2});
              })
            }
          }} change={change}/> :
          <Game player1={player1} player2={player2} roomId={roomId} backClick={backClick} view={view} setView={changeView}/>
        }
          </div>
    </div>
    )
  }

  
export default App;

