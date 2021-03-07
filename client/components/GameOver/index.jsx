import React from "react";
import './main.scss'
const GameOver = (props) => {

  let winner = {};

  if (props.player1.score > props.player2.score) {
    winner.name = props.player1.name
    winner.score = props.player1.score
  } else if (props.player2.score > props.player1.score) {
    winner.name = props.player2.name
    winner.score = props.player2.score
  } else {
    winner.name = "It's a Tie!"
    winner.score = props.player1.score
  }

  return (
    <div className="newContainer">
      <div className="winner">Game Over!</div>
      {(() => {
      if (props.player1.score > props.player2.score) {
        return <div className="winner player1-color">{props.player1.name} Wins!</div>
      } else if (props.player2.score > props.player1.score) {
        return <div className="winner player2-color">{props.player2.name} Wins!</div>
      } else {
        return <div className="winner">It's a Tie!</div>
      }
    })()}
      <div className="click-below">(Click Below to Start Again)</div>
      <div>
        <button className="over-btn btn" onClick={props.restartGame}>Replay</button>
        <button className="over-btn btn" onClick={props.restartNew}>New Game</button>
      </div>
    </div>
  )
}

export default GameOver;