import React, { useState, FC } from "react";
import "regenerator-runtime/runtime.js";
import { ICategory } from './../Player/index';
import { Prefs } from './../../../app';
import { GameData } from './../index';


interface IProps {
  category: ICategory,
  level: string,
  currRound: number,
  next: (roundScore: number) => void,
  sendUpdate: (update: any) => void,
  gameData: GameData,
  whomst: boolean,
  prefs: Prefs,
  player: string,
  questions: IQuestion[]
}

export interface IQuestion {
  correct: string,
  answers: string[],
  question: string
}

const QuestionsView: FC<IProps> = (props) => {


  const [roundScore, setRoundScore] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [questionAnswered, setQuestionAnswered] = useState<boolean>(false);
  const [lastQ, setLastQ] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);
  //const [history, setHistory] = useState<string[]>([]);

 

  React.useEffect(() => {
    
  }, [change]);


  const showAnswer = (correct: boolean) => {
    var tempQs = props.gameData.questions;
    tempQs[tempQs.length - 1].correct = correct;
    props.sendUpdate({
      'gameData.questions': tempQs
    });
    if (correct) {
      setRoundScore(roundScore + (props.level === 'easy' ? 50 : props.level === 'medium' ? 75 : 100));
      //document.body.style.backgroundColor = "rgb(13 158 13 / 46%)"
    } else {
      //document.body.style.backgroundColor = "rgb(248 3 3 / 30%)"
    }
    if (count === Number(props.prefs.Questions) - 1) {
      setLastQ(true);
    }
    setQuestionAnswered(true);
    setChange(!change);
  }

  const nextQuestion = () => {
    props.sendUpdate({
      'gameData.questions': props.gameData.questions.concat([{question: props.questions[count + 1].question, correct: null}])
    });
    setQuestionAnswered(false);
    //document.body.style.backgroundColor =  "#7e55aa94"
    setCount(count + 1);
    setChange(!change);
  }

    return (
      <div>
        <div className="player-turn">
          <div className="round-track">
            <span className="span-align">Round <div>{props.currRound}</div></span>
          </div>
          <div className={`name${props.whomst ? 1 : 2}-turn`}>{props.player}'s Turn</div>
          <div className="round-track">
              <span className="span-align">Round Score <div className={`player${props.whomst ? 1 : 2}-color`}>{roundScore}</div></span>
          </div>
        </div>
        <div className="question-container">
          <div className="category"><span>{props.category.name}</span></div>
          <div className="question-style">{props.questions[count].question}</div>
          <div className="answer-choices">{props.questions[count].answers.map((answer) => {
            return <button className="all-answers" key={answer} disabled={questionAnswered}
              onClick={answer === props.questions[count].correct ? () => showAnswer(true) : () => showAnswer(false)}
              style={answer === props.questions[count].correct && questionAnswered ? {backgroundColor: 'green'}: {}}>
              <span className="card-Anws">{answer}</span>
              </button>
          })}</div>
          <div className="button-move">
            {questionAnswered ?
            lastQ ? 
            <button className='btn' onClick={() => props.next(roundScore)}>End Round</button>
            :
            <button className='btn' onClick={nextQuestion}>Next Question</button>
            :
            null
          }
          </div>
        </div>
      </div>
    )
        
}

export default QuestionsView;