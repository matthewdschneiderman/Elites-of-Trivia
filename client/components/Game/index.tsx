import React, { FC, useState, useEffect } from 'react'
import axios from 'axios';
import GameStart from './GameStart/index'
import Player, { ICategory, IPlayer } from './Player/index'
import QuestionsView from './QuestionsView/index'
import GameOver from './GameOver/index'
import { isJsxOpeningFragment } from 'typescript';
const io = require('socket.io-client');

// import './main.scss';

interface IProps {
    roomId: string;
    backClick: () => void;
    joinGame: () => void;
}


const Game: FC<IProps> = (props) => {

    const socket = io('localhost:5000', {
      "secure": true,
      "force new connection" : true,
      "reconnectionAttempts": "10", //avoid having user reconnect manually in order to prevent dead clients after a server restart
      "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
      "transports" : ["websocket"],
      // 'transports': ['polling']
  });

    // const [inRoom, setInRoom] = useState(false);
    const [view, setView] = useState<string>('waiting')
    const [player1, setPlayer1] = useState<IPlayer>({name: 'player1', score: 0})
    const [player2, setPlayer2] = useState<IPlayer>({name: 'player2', score: 0})
    const [qsPerRound, setQsPerRound] = useState<number>(2)
    const [totalRound, setTotalRound] = useState<number>(3)
    const [currRound, setCurrRound] = useState<number>(1)
    const [categories, setCategories] = useState<ICategory[]>()
    const [selCateg, setSelCateg] = useState<number>()
    const [level, setLevel] = useState<string>("easy")
    const [catName, setCatName] = useState<string>()

    useEffect(() => {
      props.joinGame()
    }, []);

    // useEffect(() => {
    //     axios({
    //       url: '/opentdb',
    //       method: 'get',
    //       params: {
    //         method: 'categories'
    //       }
    //     }).then((result: any) => {
    //       setCategories(result.data);
    //     });
    //   }, [])

    const settings = (player1: string, player2: string, round: number, questions: number, level: string) => {
        setPlayer1({name: player1, score: 0});
        setPlayer2({name: player2, score: 0});
        setTotalRound(round);
        setQsPerRound(questions);
        setLevel(level);
      }
  
      const selectedCategory = (category: number, name: string, diff: string) => {
          setSelCateg(category),
          setCatName(name)
          setLevel(diff);
          setView('QuestionsView1')
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


    return (
        <div>
            {view === 'waiting' ? <div className='waiting'>
                Waiting for opponent
                <button onClick={props.backClick}>Go Back to Lobby</button>
            </div> :
            <div className='game'>Player has joined!</div>}
{/* {(() => {
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
        {
          view === 'game-start' ? <GameStart gameStart={() => changeView("Player1")} settings={settings}/> :
          view.includes('Player') ? <Player playStat={view === 'Player1' ? player1 : player2} currRound={currRound}
            categories={categories} selectedCategory={selectedCategory} player={view === 'Player1' ? 1 : 2}/> :
          view.includes('QuestionsView') ? <QuestionsView category={selCateg} catName={catName} currRound={currRound} playStat={view === 'Player1' ? player1 : player2} player={view === 'Player1' ? 1 : 2}
          qsPerRound={qsPerRound} level={level} next={(score: number) => view === 'QuestionsView1' ? nextPlayer(score) : endRound(score)}/> :
          <GameOver player1={player1} player2={player2} restartGame={restartGame} restartNew={restartNew}/>
        } */}
        </div>
    );
};

export default Game;