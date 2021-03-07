import React from "react";
import './main.scss'

const NewGame = ({handleClick}) => {
  return (
    <div className="newContainer">
      <h1>Welcome to the Most Thrilling Experiance of Trivia!</h1>
      <h2 className="underlined">About:</h2>
      <div>
      <h3>1. 2 Player Multiple Choice Triva Game</h3>
      <h3>2. Select How Many Rounds (3, 5, 7, 10)</h3>
      <h3>3. Select How Many Questions Per Round (2, 3, 4, 5)</h3>
      <h3>4. Select A Difficulty (easy, medium, hard)</h3>
      <h3>5. Points During Round Will Be Added To Total Score After Round</h3>
      <h3>6. Winner Will Have Option To Add High Score To The LeaderBoard</h3>
      <h3>7. Enjoy The Game!</h3>
      </div>
      <h2>Click Below to Set the Options and Get Started</h2>
      <button className="btn" onClick={handleClick}>New Game</button>
    </div>
  )
}

export default NewGame;