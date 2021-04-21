import React, { FC } from 'react'
import { SpecData } from './../index'

interface IProps {
  specData: SpecData[]
}


const Spectator: FC<IProps> = ({ specData }) => {



  return (
    <div>
      I'm spectating
      {specData.map((item) => {
        return <div key={item.question} style={{color: item.correct === null ? 'blue' : item.correct ? 'green' : 'red'}}>
          {item.question}
        </div>
      })}
    </div>
  )
}

export default Spectator;