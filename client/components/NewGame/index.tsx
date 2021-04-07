import React, { useState, useEffect } from "react";
import ActiveGames from './ActiveGames';
import Preferences from './Preferences';
import axios from 'axios';
import { userInfo } from "node:os";

interface IProps {
  handleClick: () => void
}

export interface Prefs {
  [index: string]: number | string,
  Rounds: number,
  Questions: number,
  Time: number
}

export interface Game {
  user: string,
  prefs: Prefs
}

const NewGame: React.FC<IProps> = ({handleClick}) => {

  const [user, setUser] = useState<String>(`player${Math.random().toFixed(5)}`);
  const [prefs, setPrefs] = useState<Prefs>({Rounds: null, Questions: null, Time: null});
  const [list, setList] = useState<Game[]>([]);
  const [change, setChange] = useState<Boolean>(false);
  

  useEffect (() => {
    axios({
      url: '/games',
      method: 'get',
      params: {
        prefs: prefs
      }
    }).then((result: any) => {
      setList(result.data);
    });
  }, [change]);

  const onClick = (newPrefs: Prefs) => {
    setPrefs(newPrefs);
    setChange(!change)
  }


  return (
    <div className='home'>
      <Preferences prefs={prefs} setPrefs={onClick}/>
      <ActiveGames list={list} handleClick={handleClick}/>
      {prefs.Rounds !== null && prefs.Questions !== null && prefs.Time !== null ?
      <div className='createGame' onClick={() => {
        axios({
          url: '/games',
          method: 'post',
          params: {
            user: user,
            prefs: prefs
          }
        }).then((result: any) => {
          if (result.data !== null) {
            // replace with waiting screen in new socket
            console.log(result.data);
            setChange(!change);
          } else {
            console.log('Error creating game')
          }
        });
      }}>
        Create Game as {user}
      </div>
      : null}
    </div>
  )
}

export default NewGame;


/*
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
      */