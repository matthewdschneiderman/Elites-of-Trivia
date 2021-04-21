import React, { useState, useEffect } from "react";
import axios from 'axios';
import QuestionsView, { IQuestion } from './../QuestionsView/index';
import { Prefs } from './../../../app';

interface IProps {
  currRound: number,
  categories: ICategory[],
  sendUpdate: (update: any) => void,
  sendQA: (QA: string, data: any) => void,
  whomst: boolean,
  prefs: Prefs,
  score: number[],
  player: string
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
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  
  const selectedCategory = (id: number, name: string, diff: string) => {
    props.sendUpdate({'gameData.category': name});
    setCategory({id: id, name: name});
    setLevel(diff);
    axios({
      url: '/opentdb',
      method: 'get',
      params: {
        method: 'questions',
        options: {
          amount: Number(props.prefs.Questions),
          category: id,
          difficulty: diff,
          type: 'multiple',
        }
      }
    }).then((result: any) => {
      setQuestions(result.data);
      setView(false);
    });
  }

  const next = (roundScore: number) => {
    var last: boolean = !props.whomst && props.currRound === props.prefs.Rounds;
    props.sendUpdate({
      'gameData.turn': last ? null : !props.whomst,
      'gameData.round': props.whomst ? 
        props.currRound : props.currRound + 1,
      'gameData.score': [
        props.score[0] + (props.whomst ? roundScore : 0),
        props.score[1] + (props.whomst ? 0 : roundScore)
      ]
      });
      if (last) {
        
      }
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
        <div className={`name${props.whomst ? 1 : 2}-turn`}>{props.player}'s Turn</div>
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
      <QuestionsView category={category} level={level} prefs={props.prefs} questions={questions}
        next={next} currRound={props.currRound} whomst={props.whomst} player={props.player}
        sendQA={props.sendQA}/>
      }
      
    </div>
  )
}

export default Player;