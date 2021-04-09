import React, { useEffect, useState, FC } from "react";
import Game from './components/Game/index'
import NewGame from './components/NewGame/index'
import axios from 'axios';
// import GameStart from './components/GameStart/index'
// import Player, { ICategory, IPlayer } from './components/Player/index'
// import QuestionsView from './components/QuestionsView/index'
// import GameOver from './components/GameOver/index'




const App: FC = () => {

    const [roomId, setRoomId] = useState<string>(null)

    const backClick = () => {
      axios({
        url: '/games',
        method: 'delete',
        params: {
          prefs: roomId
        }
      })
      setRoomId(null);
    }
    
    return (
      <div>
        <div className="header">
          <div className="title">Elites of Trivia</div>
        </div>
          <div>{
          roomId === null ? <NewGame handleClick={(_id: string) => {
            setRoomId(_id);
          }} /> :
          <Game roomId={roomId} backClick={backClick}/>
        }
          </div>
    </div>
    )
  }

  
export default App;

