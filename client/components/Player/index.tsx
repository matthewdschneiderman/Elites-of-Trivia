import React from "react";
// import './main.scss'

interface IProps {
  currRound: number,
  categories: ICategory[],
  playStat: IPlayer,
  selectedCategory: (id: number) => void,
  player: number
}

export interface IPlayer {
  name: string,
  score: number
}

export interface ICategory {
  id: number,
  name: string,
}

const Player: React.FC<IProps> = (props) => {
  
  return (
    <div>
      <div className="player-turn">
        <div className="round-track">
          <span className="span-align">Round <div>{props.currRound}</div></span>
        </div>
        <div className={`name${props.player}-turn`}>{props.playStat.name}'s Turn</div>
      </div>
      <div className="cards">{props.categories.map((category: ICategory) => (
          <div className="card" key={category.id} onClick={() => props.selectedCategory(category.id)}><span className="card-Qs"><div>{category.id - 8}.</div> {category.name}</span></div>
        ))} 
      </div>
    </div>
  )
}

export default Player;