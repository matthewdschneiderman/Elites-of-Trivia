import React, { useState, useEffect } from "react";

interface IProps {
  currRound: number,
  categories: ICategory[],
  playStat: IPlayer,
  selectedCategory: (id: number, name: string, diff: string) => void,
  player: number
}

export interface IPlayer {
  name: string,
  score: number
}

export interface ICategory {
  id: number,
  name: string
}

export interface diffProps {
  id: number,
  name: string,
  selectedCategory: (id: number, name: string, diff: string) => void,
  diff: string
}

const diffCard: React.FC<diffProps> = (props) => {
    return (<div className={`diffs ${props.diff}`} onClick={() => props.selectedCategory(props.id, props.name, props.diff)}>
              <span className="card-Qs">
                {props.diff}
              </span>
  </div>);
}

const Player: React.FC<IProps> = (props) => {

  const [choosingDiff, setChoosingDiff] = useState<number>(null);
  
  return (
    <div>
      <div className="player-turn">
        <div className="round-track">
          <span className="span-align">Round <div>{props.currRound}</div></span>
        </div>
        <div className={`name${props.player}-turn`}>{props.playStat.name}'s Turn</div>
      </div>
      <div className="cards">{props.categories.map((category: ICategory) => (
          <div>
            <div className={choosingDiff === category.id ? 'diffDiv' : 'card'} key={category.id} onClick={choosingDiff === category.id ? null : () => setChoosingDiff(category.id)}>
              {choosingDiff === category.id ?
              <div>
              {}
              {diffCard({id: category.id, name: category.name, selectedCategory: props.selectedCategory, diff: 'easy'})}
              {diffCard({id: category.id, name: category.name, selectedCategory: props.selectedCategory, diff: 'medium'})}
              {diffCard({id: category.id, name: category.name, selectedCategory: props.selectedCategory, diff: 'hard'})}
              </div>
            : 
            <span className="card-Qs">
                {category.name}
                </span>
                }
            </div>
          </div>
        ))} 
      </div>
    </div>
  )
}

export default Player;