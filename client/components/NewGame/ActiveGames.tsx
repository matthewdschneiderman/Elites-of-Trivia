import React from "react";
import { Game } from './index';
// import './main.scss'

interface IProps {
  list: Game[]
  handleClick: (_id: string) => void
}

const ActiveGames: React.FC<IProps> = (props) => {

  return (
    <div className='lobby'>
      <div style={{backgroundColor: 'white', width: '100%', paddingBottom: '5px'}}>Username
      <div style={{float: 'right'}}>
      Rounds&emsp;Questions&emsp;Time
      </div>
      </div>
      {props.list.map((game: Game) => {
        return <div className='activeGame' key={game.user} onClick={() => props.handleClick(game._id)}>
          {game.user}
          <div style={{float: 'right'}}>
            {Object.values(game.prefs).map((pref: string | Number) => {
              return <div key={Math.random()} style={{width: '80px', float: 'left', textAlign: 'right'}}>
                {pref}
                </div>
            })}
            </div>
      </div>
      })}
    </div>
  )
}

export default ActiveGames;