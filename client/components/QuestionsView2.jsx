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
    difficulty: 'easy',
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


  console.log('questions: ', questions);
  if (!shuffledQs) {
    return <div>"loading..."</div>
  } else {
    return (
      <div>
        <div>{props.play2Stat.name}'s Turn</div>
        <div>Total Score: {props.play2Stat.score}</div>
        <div>Round {props.currRound}</div>
        <div>Round Score {roundScore}</div>
        <div>
          <div>Catergory: {questions[count].category}</div>
          <div>Question: {questions[count].question}</div>
          <div>{shuffledQs.map((incorrectAnw) => {
            return <button id="all-answers" disabled={questionAnswered} onClick={showAnswer} className={incorrectAnw.correct}>{incorrectAnw.text}</button>
          })}</div>
          <button id='next-btn' className='hide' onClick={nextQuestion}>Next Question</button>
          <button id='end-btn' className='hide' onClick={() => props.endRound(roundScore)}>End Turn</button>
        </div>
      </div>
    )
  }
}

export default QuestionsView;