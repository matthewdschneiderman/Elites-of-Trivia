import React from "react";
import './main.scss'

const Player1 = (props) => {
  
  return (
    <div>
      <div className="player-turn">
        <div className="round-track">
          <span className="span-align">Round <div>{props.currRound}</div></span>
        </div>
        <div className="name1-turn">{props.play1Stat.name}'s Turn</div>
      </div>
      <div className="cards">{props.categories.map((category) => (
          <div className="card" key={category.id} onClick={() => props.selectedCategory(category.id)}><span className="card-Qs"><div>{category.id - 8}.</div> {category.name}</span></div>
        ))} 
      </div>
    </div>
  )
}

export default Player1;