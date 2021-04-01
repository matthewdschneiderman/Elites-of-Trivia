import React from "react";
import { GameList } from './index';
// import './main.scss'

interface IProps {
  list: GameList
  handleClick: () => void
}

const ActiveGames: React.FC<IProps> = (props) => {
  return (
    <div onClick={props.handleClick}>
      new game
    </div>
  )
}

export default ActiveGames;