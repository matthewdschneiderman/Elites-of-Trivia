import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import GameStart from './GameStart/index';
import Spectator from './Spectator/index';
import Player, { ICategory, IPlayer } from './Player/index';
import QuestionsView from './QuestionsView/index';
import GameOver from './GameOver/index';
import { isJsxOpeningFragment } from 'typescript';
import { Prefs } from './../../app';
import { Socket } from 'dgram';


export interface SpecQuestion {
  question: string,
  correct: boolean
}
export interface GameData {
  chat: string[],
  round: number,
  turn: boolean,
  score: number[],
  category: ICategory,
  level: string,
  questions: SpecQuestion[],
}


export interface SpecData {
  category: string,
  level: string,
  questions: SpecQuestion[],
}

interface IProps {
  roomId: string;
  backClick: () => void;
  player1: string;
  player2: string;
  view: boolean;
  restart: () => void;
  prefs: Prefs;
  socket: any;
  whomst: boolean;
  gameData: GameData;
  setGameData: (gameData: GameData) => void;
}


var categories: ICategory[];

axios({
  url: '/opentdb',
  method: 'get',
  params: {
    method: 'categories'
  }
}).then((result: any) => {
  categories = result.data;
});


const Game: FC<IProps> = ({ player1, player2, prefs, roomId, backClick, view, restart, socket, whomst, gameData, setGameData}) => {


  const [change, setChange] = useState<boolean>(whomst);

  useEffect(() => {

  }, [change]);


  socket.on('game updated', (byWhom: any) => {
    if (byWhom !== whomst) {
      axios({
        url: '/games',
        method: 'get',
        params: {
          method: 'active',
          room: roomId
        }
      }).then((result: any) => {
        console.log('Player', whomst ? 2 : 1, 'sent an update:', result.data);
        setGameData(result.data.gameData);
        setChange(!change);
      });
    }
  });

  socket.on('rematch accepted', (byWhom: any) => {
    console.log('rematch accepted');
    if (whomst === byWhom) {
      sendUpdate({
        'gameData.round': 0,
        'gameData.score': [0,0],
        'gameData.turn': true
      });
    }
  });


  const sendUpdate = (update: any) => {
    axios({
      url: '/games',
      method: 'post',
      params: {
        method: 'update',
        room: roomId,
        update: update
      }
    })
    .then((result: any) => {
      setGameData(result.data.gameData);
      socket.emit('game updated', { room: roomId, byWhom: whomst });
      setChange(!change);
    });
  };


  return (
    <div>
        {view ?
        <div>
          <div className="header">
            <div className='game-player' style={{left: 30}}>
              <div className='player-title'>{player1}</div>
              <div className='player-score'>{gameData.score[0]}</div>
            </div>
            <div className="title">Elites of Trivia</div>
            <div className='game-player' style={{right: 30}}>
              <div className='player-title'>{player2}</div>
              <div className='player-score'>{gameData.score[1]}</div>
            </div>
            <div className='pregame'>{prefs.Rounds} rounds, {prefs.Questions} questions per round, {prefs.Time} seconds per question</div>
          </div>
          <div>
          </div>
          <div>
            {gameData.turn === null ?
            <GameOver player1={{name: player1, score: gameData.score[0]}} player2={{name: player2, score: gameData.score[1]}}
              restartGame={() => socket.emit('rematch proposed', {room: roomId, user: whomst})}
              restartNew={restart}/>
            :
            gameData.turn === whomst ?
                <Player categories={categories} currRound={gameData.round} player={whomst ? player1 : player2}
                  sendUpdate={sendUpdate} whomst={whomst} prefs={prefs} gameData={gameData}
                  />
                :
                <Spectator gameData={gameData} opponent={whomst ? player2 : player1}/>
          }
          </div>
        </div>
        :
        <div className='waiting'>
            Waiting for opponent, you are {player1}
            <button onClick={backClick}>Go Back to Lobby</button>
        </div>}
    </div>
  );
};

export default Game;


  
  /*
    const [inRoom, setInRoom] = useState(false);
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
        axios({
          url: '/opentdb',
          method: 'get',
          params: {
            method: 'categories'
          }
        }).then((result: any) => {
          setCategories(result.data);
        });
      }, [])

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
        {
          view === 'game-start' ? <GameStart gameStart={() => changeView("Player1")} settings={settings}/> :
          view.includes('Player') ? <Player playStat={view === 'Player1' ? player1 : player2} currRound={currRound}
            categories={categories} selectedCategory={selectedCategory} player={view === 'Player1' ? 1 : 2}/> :
          view.includes('QuestionsView') ? <QuestionsView category={selCateg} catName={catName} currRound={currRound} playStat={view === 'Player1' ? player1 : player2} player={view === 'Player1' ? 1 : 2}
          qsPerRound={qsPerRound} level={level} next={(score: number) => view === 'QuestionsView1' ? nextPlayer(score) : endRound(score)}/> :
          <GameOver player1={player1} player2={player2} restartGame={restartGame} restartNew={restartNew}/>
        }
        */