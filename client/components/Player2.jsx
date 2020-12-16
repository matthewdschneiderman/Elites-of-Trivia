import React from "react";
import opentdb from 'opentdb-api';


const Player2 = (props) => {
  return (
    <div>
      <div>{props.play2Stat.name}'s Turn</div>
      <div>Total Score: {props.play2Stat.score}</div>
      <div>Round {props.currRound}</div>
      <div>{props.categories.map((category) => (
          <div key={category.id} onClick={() => props.selectedCategory(category.id)}>{category.id - 8}. {category.name}</div>
        ))} 
      </div>
    </div>
  )
}

export default Player2;