import React from "react";
import axios from 'axios';
import "regenerator-runtime/runtime.js";


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
  player: number,
  catName: string,
}

const QuestionsView: React.FC<IProps> = (props) => {

  interface Question {
    correct: string,
    answers: string[],
    question: string
  }


  interface Options {
    amount: number,
    category: number,
    difficulty: string,
    type: 'multiple',
  }

  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [roundScore, setRoundScore] = React.useState<number>(0);
  const [count, setCount] = React.useState<number>(0);
  const [questionAnswered, setQuestionAnswered] = React.useState<boolean>(false)

  const options: Options = {
    amount: Number(props.qsPerRound),
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
        setQuestions(result.data);
      });
    
  }, []);


  const showAnswer = (e: any) => {
    if (e.target.value === questions[count].correct) {
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
  }
  if (questions.length < 1) {
    return <div className="loading">"loading..."</div>
  } else {
    return (
      <div>
        {console.log(props)}
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
          <div className="category"><span>{props.catName}</span></div>
          <div className="question-style">{questions[count].question}</div>
          <div className="answer-choices">{questions[count].answers.map((answer) => {
            return <button className="all-answers" key={answer} value={answer} disabled={questionAnswered} onClick={showAnswer}
              style={answer === questions[count].correct && questionAnswered ? {backgroundColor: 'green'}: {}}>
              <span className="card-Anws">{answer}</span>
              </button>
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