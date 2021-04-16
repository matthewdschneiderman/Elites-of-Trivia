import React, { useState, useEffect } from "react";
import QuestionsView from './../QuestionsView/index';
import { Prefs } from './../../../app';

interface IProps {
  currRound: number,
  categories: ICategory[],
  playStat: IPlayer,
  sendUpdate: (update: any) => void,
  player: number,
  prefs: Prefs
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
  const [category, setCategory] = useState<ICategory>(null);
  const [level, setLevel] = useState<string>(null);
  const [view, setView] = useState<boolean>(true);
  
  const selectedCategory = (id: number, name: string, diff: string) => {
    props.sendUpdate({'gameData.category': name});
    setCategory({id: id, name: name});
    setLevel(diff);
    setView(false);
  }
  
  return (
    <div>
      {
      view ?
      <div>
        <div className="player-turn">
          <div className="round-track">
            <span className="span-align">Round <div>{props.currRound}</div></span>
          </div>
        <div className={`name${props.player}-turn`}>{props.playStat.name}'s Turn</div>
      </div>
      <div className="cards">{props.categories.map((category: ICategory) => (
          <div key={category.id}>
            <div className={choosingDiff === category.id ? 'diffDiv' : 'card'} key={category.id} onClick={choosingDiff === category.id ? null : () => setChoosingDiff(category.id)}>
              {choosingDiff === category.id ?
              <div>
              {diffCard({id: category.id, name: category.name, selectedCategory: selectedCategory, diff: 'easy'})}
              {diffCard({id: category.id, name: category.name, selectedCategory: selectedCategory, diff: 'medium'})}
              {diffCard({id: category.id, name: category.name, selectedCategory: selectedCategory, diff: 'hard'})}
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
      :
      <QuestionsView category={category} level={level} prefs={props.prefs} playStat={props.playStat} next={null} currRound={null} player={props.player}/>
      }
      
    </div>
  )
}

export default Player;