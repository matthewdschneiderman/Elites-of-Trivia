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
    const [prefs, setPrefs] = useState<Prefs>({Rounds: null, Questions: null, Time: null});
    const [view, setView] = useState<string>('waiting');
    
    useEffect(() => {
      socket.emit('join room', {room: roomId});
    }, [change]);


    socket.on('lobby updated', () => {
      if (roomId === 'lobby') {
        setChange(!change);
      }
    });

    socket.on('action', (options: any) => {
      console.log('game message:', options);
        if (options.method === 'guest joined' || 'start game') {
          setPlayer1(options.data.user);
          setPlayer2(options.data.guest);
          setPrefs(options.data.prefs);
          changeView('game');
          if (options.method === 'guest joined') {
            socket.emit('start game', options.data);
          }
        }
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

    const lobbyAction = (_id: string, player: string, creating: boolean, prefs: Prefs) => {
      if (creating) {
        setPlayer1(player);
        socket.emit('lobbyUpdate');
        //socket.emit('create game', {player1: player1, prefs: prefs})
        setRoomId(_id);
        setChange(!change);
      } else {
        setPlayer2(player);
        axios({
          url: '/games',
          method: 'post',
          params: {
            join: true,
            room: _id,
            user: player2
          }
        })
        .then((result) => {
          socket.emit('join room', {room: _id});
          setPlayer1(result.data.user);
          socket.emit('lobbyUpdate');
          setRoomId(_id);
          setChange(!change);
          socket.emit('full house', result.data);
        })
      }
    }
    
    return (
      <div>
        <div className="header">
          <div className="title">Elites of Trivia</div>
        </div>
          <div>{
          roomId === 'lobby' ? <NewGame handleClick={lobbyAction} change={change}/> :
          <Game player1={player1} player2={player2} prefs={prefs} roomId={roomId} backClick={backClick} view={view} setView={changeView}/>
        }
          </div>
    </div>
    )
  }

  
export default App;

