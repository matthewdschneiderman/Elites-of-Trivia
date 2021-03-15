import React from "react";
import axios from 'axios';
import "regenerator-runtime/runtime.js";
// import './main.scss';


interface IPlayer {
  name: string,
  score: number
}

interface IProps {
  qsPerRound: number,
  category: number,
  level: string,
  playStat: IPlayer,
  currRound: number,
  next: (roundScore: number) => void,
  player: number
}

const QuestionsView: React.FC<IProps> = (props) => {

  interface Questions {
    correct_answer: number[],
    incorrect_answers: number[],
    category: string,
    question: string
  }

  interface Answer {
    text: number[],
    correct: string
  }

  const [questions, setQuestions] = React.useState<Questions[]>([]);
  const [roundScore, setRoundScore] = React.useState<number>(0);
  const [count, setCount] = React.useState<number>(0);
  const [questionAnswered, setQuestionAnswered] = React.useState<boolean>(false)
  const [shuffledQs, setShuffledQs] = React.useState<Answer[]>([]);

  var options = {
    amount: props.qsPerRound,
    category: props.category,
    difficulty: props.level,
    type: 'multiple',
  }

  React.useEffect(() => {
      axios({
        url: '/opentdb',
        method: 'get',
        params: {
          method: 'questions',
          options: options
        }
      }).then((result: any) => {
        console.log('questions:',result.data);
        setQuestions(result.data);
      });
    
  }, []);


  if (questions.length > 0 && shuffledQs.length < 1) {
    let corrAnswer: Answer[] = [ { text: questions[count].correct_answer, correct: 'right-ans' } ]
    let wrongAnswer: Answer[] = questions[count].incorrect_answers.map((inAnsw) => {
      return {text: [inAnsw], correct: 'wrong-ans'}
    })
    let tempAns: Answer[] = corrAnswer.concat(wrongAnswer);
    let shuffled: Answer[] = tempAns.sort(() => Math.random() - 0.5)
    setShuffledQs(shuffled)
  }

  const showAnswer = (e: any) => {
    console.log("e.target.className", e.target.className)
    if (e.target.className === 'right-ans') {
      setRoundScore(roundScore + 100);
      document.body.style.backgroundColor = "rgb(13 158 13 / 46%)"
    } else {
      document.body.style.backgroundColor = "rgb(248 3 3 / 30%)"
    }

    if (count === Number(props.qsPerRound) - 1) {
      document.getElementById("end-btn").classList.remove("hide")
    } else {
      document.getElementById("next-btn").classList.remove("hide");
    }
    setQuestionAnswered(true)
  }

  const nextQuestion = () => {
    setQuestionAnswered(false)
    document.body.style.backgroundColor =  "#7e55aa94"
    document.getElementById("next-btn").classList.add("hide")
    setCount(count + 1)
    setShuffledQs([])
  }


  if (!shuffledQs) {
    return <div className="loading">"loading..."</div>
  } else {
    return (
      <div>
        <div className="player-turn">
          <div className="round-track">
            <span className="span-align">Round <div>{props.currRound}</div></span>
          </div>
          <div className={`name${props.player}-turn`}>{props.playStat.name}'s Turn</div>
          <div className="round-track">
              <span className="span-align">Round Score <div className={`player${props.player}-color`}>{roundScore}</div></span>
          </div>
        </div>
        <div className="question-container">
          <div className="category"><span>{questions[count].category}</span></div>
          <div className="question-style">{questions[count].question}</div>
          <div className="answer-choices">{shuffledQs.map((incorrectAnw) => {
            return <button id="all-answers" disabled={questionAnswered} onClick={showAnswer} className={incorrectAnw.correct}><span id="card-Anws" className={incorrectAnw.correct}>{incorrectAnw.text[0]}</span></button>
          })}</div>
          <div className="button-move">
            <button id='next-btn' className='hide btn' onClick={nextQuestion}>Next Question</button>
            <button id='end-btn' className='hide btn' onClick={() => props.next(roundScore)}>End Round</button>
          </div>
        </div>
      </div>
    )
  }
}

export default QuestionsView;