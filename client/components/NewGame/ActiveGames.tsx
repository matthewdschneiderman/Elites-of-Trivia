import React from "react";
import { Game } from './index';
// import './main.scss'

interface IProps {
  list: Game[]
  handleClick: () => void
}

const ActiveGames: React.FC<IProps> = (props) => {
  return (
    <div className='lobby' onClick={props.handleClick}>
      <div style={{backgroundColor: 'white', width: '100%'}}>Username, Rounds, Questions, Time</div>
      {props.list.map((game: Game) => {
        return <div className='activeGame' key={game.user}>
          {game.user} {game.prefs.Rounds} {game.prefs.Questions} {game.prefs.Time} 
          </div>
      })}
    </div>
  )
}

export default ActiveGames;