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

    const [roomId, setRoomId] = useState<string>(null)
    // const [refreshGames, setRefreshGames] = useState<boolean>(false)
    const [change, setChange] = useState<Boolean>(false);
    const [prefs, setPrefs] = useState<Prefs>({Rounds: null, Questions: null, Time: null});
    const [list, setList] = useState<Game[]>([]);


    // useEffect(() => {
    //   socket.on('update', () => {
    //     setRefreshGames(!refreshGames);
    //     console.log('updates happened')
    //   })
    // })

    const getGames = () => {
      axios({
        url: '/games',
        method: 'get',
        params: {
          prefs: prefs
        }
      }).then((result: any) => {
        setList(result.data);
      });
    }

    useEffect (() => {
      getGames()
    }, [change, roomId]);
  
    const onPrefClick = (newPrefs: Prefs) => {
      setPrefs(newPrefs);
      setChange(!change)
    }
    
    useEffect(() => {
      socket.on('update', (data: any) => {
        console.log('hello', data)
      })
      setChange(!change)
    }, [])
    

    const joinGame = () => {
      socket.emit('join room', {room: roomId});
    }

    const backClick = () => {
      axios({
        url: '/games',
        method: 'delete',
        params: {
          prefs: roomId
        }
      })
      setRoomId(null);

      socket.emit('leave room', {
        room: roomId
      })
    }
    
    return (
      <div>
        <div className="header">
          <div className="title">Elites of Trivia</div>
        </div>
          <div>{
          roomId === null ? <NewGame handleClick={(_id: string) => {
            setRoomId(_id);
          }} prefs={prefs} onPrefClick={onPrefClick} list={list}/> :
          <Game roomId={roomId} backClick={backClick} joinGame={joinGame}/>
        }
          </div>
    </div>
    )
  }

  
export default App;

