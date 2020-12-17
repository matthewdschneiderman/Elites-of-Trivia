import React from "react";
import opentdb from 'opentdb-api';
import "regenerator-runtime/runtime.js";


const QuestionsView = (props) => {

  const [questions, setQuestions] = React.useState("");
  const [roundScore, setRoundScore] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [questionAnswered, setQuestionAnswered] = React.useState(false)
  const [shuffledQs, setShuffledQs] = React.useState(false);

  var options = {
    amount: Number(props.qsPerRound),
    category: props.category,
    difficulty: props.level,
    type: 'multiple',
  }
  console.log(options)

  React.useEffect(() => {
    const fetchQuestions = async () => {
      const uniqueTrivia = await opentdb.getTrivia(options);

      // const questions = uniqueTrivia;
      setQuestions(uniqueTrivia);
    };
    
    fetchQuestions();
  }, []);

  if (questions !== '' && !shuffledQs) {
    let corrAnswer = [ { text: questions[count].correct_answer, correct: 'right-ans' } ]
    let wrongAnswer = questions[count].incorrect_answers.map((inAnsw) => {
      return {text: inAnsw, correct: 'wrong-ans'}
    })
    let tempAns = corrAnswer.concat(wrongAnswer);
    let shuffled = tempAns.sort(() => Math.random() - 0.5)
    setShuffledQs(shuffled)
  }

  const showAnswer = (e) => {
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
    setShuffledQs(false)
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
          <div className="name2-turn">{props.play2Stat.name}'s Turn</div>
          <div className="round-track">
              <span className="span-align">Round Score <div className="player2-color">{roundScore}</div></span>
          </div>
        </div>
        <div className="question-container">
          <div className="category"><span>{questions[count].category}</span></div>
          <div className="question-style">{questions[count].question}</div>
          <div className="answer-choices">{shuffledQs.map((incorrectAnw) => {
            return <button id="all-answers" disabled={questionAnswered} onClick={showAnswer} className={incorrectAnw.correct}><span className="card-Anws">{incorrectAnw.text}</span></button>
          })}</div>
          <div className="button-move">
            <button id='next-btn' className='hide btn' onClick={nextQuestion}>Next Question</button>
            <button id='end-btn' className='hide btn' onClick={() => props.endRound(roundScore)}>End Round</button>
          </div>
        </div>
      </div>
    )
  }
}

export default QuestionsView;