import React, { useEffect, useState, FC } from "react";
import axios from 'axios';
import NewGame from './components/NewGame/index'
import { Interface } from "readline";
import GameStart from './components/GameStart/index'
import Player from './components/Player/index'
import QuestionsView from './components/QuestionsView/index'
import GameOver from './components/GameOver/index'
// import './styles/style.css'

// var util = require('util')

interface IPlayer {
    name: string,
    score: number,
  }

interface IProps {}

interface ICategory{
  id: number,
  name: string
}

const App: FC = () => {


    const [view, setView] = useState<string>('New')
    const [player1, setPlayer1] = useState<IPlayer>({name: 'player1', score: 0})
    const [player2, setPlayer2] = useState<IPlayer>({name: 'player2', score: 0})
    const [qsPerRound, setQsPerRound] = useState<number>(2)
    const [totalRound, setTotalRound] = useState<number>(3)
    const [currRound, setCurrRound] = useState<number>(1)
    const [categories, setCategories] = useState<ICategory[]>()
    const [selCateg, setSelCateg] = useState<number>()
    const [level, setLevel] = useState<string>("easy")
  
    useEffect(() => {
      axios({
        url: '/opentdb',
        method: 'get',
        params: {
          method: 'categories'
        }
      }).then((result: any) => {
        setCategories(result);
      });
      /*
      opentdb.getCategories().then(result => {
        setCategories(result)
      });
      */
    }, [])
    
    
    const settings = (player1: string, player2: string, round: number, questions: number, level: string) => {
      setPlayer1({name: player1, score: 0});
      setPlayer2({name: player2, score: 0});
      setTotalRound(round);
      setQsPerRound(questions);
      setLevel(level);
    }

    const selectedCategory1 = (category: number) => {
        setSelCateg(category),
        setView('QuestionsView1')
    }


    const selectedCategory2 = (category: number) => {
      setSelCateg(category),
      setView('QuestionsView2')
    }

    const changeView = (option: string) => {
        setView(option)
    }
    const nextPlayer = (score: number) => {
      document.body.style.backgroundColor =  "#7e55aa94"
        setPlayer1({name: player1.name, score: player1.score + score})
        setView("Player2")
    }

    const endRound = (score: number) => {
      document.body.style.backgroundColor =  "#7e55aa94"
      if (currRound === Number(totalRound)) {
          setPlayer2({name: player2.name, score: (player2.score + score)})
          setView("Game-Over")
      } else {
          setPlayer2({name: player2.name, score: (player2.score + score)})
          setCurrRound(currRound + 1),
          setView("Player1")
      }
    }
    
    const restartGame = () => {
      setView("Player1")
      setPlayer1({name: player1.name, score: 0})
      setPlayer2({name: player2.name, score: 0})
      setQsPerRound(qsPerRound)
      setTotalRound(totalRound)
      setCurrRound(1)
    }
    
    const restartNew = () => {
        setView("New")
        setCurrRound(1)
    }
    
  const renderView = () => {
    switch (view) {
      case 'New':
        return <NewGame handleClick={() => changeView("game-start")} />;
      case 'game-start':
        return <GameStart gameStart={() => changeView("Player1")} settings={settings}/>;
      case 'Player1':
        return <Player playStat={player1} currRound={currRound} categories={categories} selectedCategory={selectedCategory1} player={1}/>;
      case 'Player2':
        return <Player playStat={player2} currRound={currRound} categories={categories} selectedCategory={selectedCategory2} player={1}/>
      case 'QuestionsView1':
        return <QuestionsView category={selCateg} currRound={currRound} playStat={player1} player={1}
          qsPerRound={qsPerRound} level={level} next={(score: number) => nextPlayer(score)}/>;
      case 'QuestionsView2':
        return <QuestionsView category={selCateg} currRound={currRound} playStat={player2} player={2}
          qsPerRound={qsPerRound} level={level} next={(score: number) => endRound(score)}/>;
      case 'Game-Over':
        return <GameOver player1={player1} player2={player2} restartGame={restartGame} restartNew={restartNew}/>;
    }
    }
    
    return (
      <div>
        <h2>Hello</h2>
        <div className="header">
          <div className="title">MVP of Trivia</div>
        </div>
        {(() => {
          if (view !== 'New' &&  view !== 'game-start') {
            return (
              <div className="player-score">
                  <span>
                    <div><div className="player1-name">{player1.name}:</div> <div className="player1-score">{player1.score}</div></div>
                  </span>
                  <span className="diff-level">
                    <div>({level} | {totalRound}-R's | {qsPerRound}-Q's)</div>
                  </span>
                  <span>
                    <div><div className="player2-name">{player2.name}:</div> <div className="player2-score">{player2.score}</div></div>
                  </span>
                </div>
              )
            }
          })()}
        <div>
          <div>{renderView()}</div>
        </div>
    </div>
    )
  }

  
export default App;