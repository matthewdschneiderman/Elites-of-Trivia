import React, { FC } from 'react'
import { GameData } from './../index'

interface IProps {
  gameData: GameData
}


const Spectator: FC<IProps> = ({ gameData }) => {



  return (
    <div>
      I'm spectating
      {gameData.category} : {gameData.level}
      {gameData.questions.map((item) => {
            return <div key={item.question} style={{color: item.correct === null ? 'blue' : item.correct ? 'green' : 'red'}}>
              {item.question}
            </div>
        })
      }
    </div>
  )
}

export default Spectator;