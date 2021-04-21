import React, { FC } from 'react'
import { GameData } from './../index'

interface IProps {
  gameData: GameData
  opponent: string
}


const Spectator: FC<IProps> = ({ gameData, opponent }) => {


  return (
    <div className='spectator-container'>
      <div className='spectator-item'>{opponent}'s turn</div>
      {gameData.category ? <div className='spectator-item'>{gameData.category} : {gameData.level}</div> : null}
      {gameData.questions.map((item) => {
            return <div key={item.question} className='spectator-item' style={{color: item.correct === null ? 'blue' : item.correct ? 'green' : 'red'}}>
              {item.question}
            </div>
        })
      }
    </div>
  )
}

export default Spectator;