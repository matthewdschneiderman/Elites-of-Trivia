import React from "react";

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
    <div>
      <div>Game Over!</div>
      <div>{winner.name} Wins!</div>
      <div>Click Below to Start Again</div>
      <button onClick={props.restartGame}>Replay</button>
      <button onClick={props.restartNew}>New Game</button>
    </div>
  )
}

export default GameOver;