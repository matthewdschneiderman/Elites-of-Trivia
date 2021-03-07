import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import opentdb from 'opentdb-api';
import NewGame from './components/NewGame/index.jsx'
import GameStart from './components/GameStart/index.jsx'
import Player1 from './components/Player1/index.jsx'
import Player2 from './components/Player2/index.jsx'
import QuestionsView1 from './components/QuestionsView1/index.jsx'
import QuestionsView2 from './components/QuestionsView2/index.jsx'
import GameOver from './components/GameOver/index.jsx'
import './styles/style.css'

// var util = require('util')


const App = () => {

    const [view, setView] = useState('New')
    const [player1, setPlayer1] = useState({name: 'player1', score: 0})
    const [player2, setPlayer2] = useState({name: 'player2', score: 0})
    const [qsPerRound, setQsPerRound] = useState(2)
    const [totalRound, setTotalRound] = useState(3)
    const [currRound, setCurrRound] = useState(1)
    const [categories, setCategories] = useState(0)
    const [selCateg, setSelCateg] = useState('none')
    const [level, setLevel] = useState("easy")
  
    // this.state = {
    //   view: "New",
    //   player1: {name: 'player1', score: 0},
    //   player2: {name: 'player2', score: 0},
    //   qsPerRound: 2,
    //   totalRound: 3,
    //   currRound: 1,
    //   categories: 0,
    //   selCateg: 'none',
    //   level: "easy"
    // }
    // this.changeView = this.changeView.bind(this);
    // this.settings = this.settings.bind(this);
    // this.selectedCategory1 = this.selectedCategory1.bind(this);
    // this.nextPlayer = this.nextPlayer.bind(this);
    // this.selectedCategory2 = this.selectedCategory2.bind(this);
    // this.endRound = this.endRound.bind(this);
    // this.restartGame = this.restartGame.bind(this);
    // this.restartNew = this.restartNew.bind(this);

    useEffect(() => {
      opentdb.getCategories().then(result => {
        setCategories(result)
      });
    }, [])
    
    // componentDidMount() {
    //   opentdb.getCategories().then(result => {
    //   this.setState({
    //     categories: result,
    //   })
    //   console.log(result);
    //   });
    // }
          
    const settings = (player1, player2, round, questions, level) => {
      setPlayer1({name: player1, score: 0});
      setPlayer2({name: player2, score: 0});
      setTotalRound(round);
      setQsPerRound(questions);
      setLevel(level);
    }
    
    // settings(player1, player2, round, questions, level) {
    //   this.setState({
    //     player1: {name: player1, score: 0},
    //     player2: {name: player2, score: 0},
    //     totalRound: round,
    //     qsPerRound: questions,
    //     level: level,
    //   }, () => console.log(this.state))
    // }

    const selectedCategory1 = (category) => {
        setSelCateg(category),
        setView('QuestionsView1')
    }

    // selectedCategory1(category){
    //   this.setState({
    //     selCateg: category,
    //     view: 'QuestionsView1'
    //   })
    // }
    
    const selectedCategory2 = (category) => {
      setSelCateg(category),
      setView('QuestionsView2')
  }

    // selectedCategory2(category){
    //   this.setState({
    //     selCateg: category,
    //     view: 'QuestionsView2'
    //   })
    // }
    
    const changeView = (option) => {
        setView(option)
    }
    
    // changeView(option) {
    //   this.setState({
    //     view: option,
    //   });
    // }
    
    const nextPlayer = (score) => {
      document.body.style.backgroundColor =  "#7e55aa94"
        setPlayer1({name: player1.name, score: player1.score + score})
        setView("Player2")
    }
    
    // nextPlayer(score){
    //   document.body.style.backgroundColor =  "#7e55aa94"
    //   this.setState({
    //     player1: {name: this.state.player1.name, score: (this.state.player1.score + score)},
    //     view: "Player2",
    //   })
    // }
    const endRound = (score) => {
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

    // endRound(score){
    //   document.body.style.backgroundColor =  "#7e55aa94"
    //   if (this.state.currRound === Number(this.state.totalRound)) {
    //     this.setState({
    //       player2: {name: this.state.player2.name, score: (this.state.player2.score + score)},
    //       view: "Game-Over",
    //     })
    //   } else {
    //     this.setState({
    //       player2: {name: this.state.player2.name, score: (this.state.player2.score + score)},
    //       currRound: (this.state.currRound + 1),
    //       view: "Player1",
    //     })
    //   }
    // }
    
    const restartGame =() => {
      setView("Player1")
      setPlayer1({name: player1.name, score: 0})
      setPlayer2({name: player2.name, score: 0})
      setQsPerRound(qsPerRound)
      setTotalRound(totalRound)
      setCurrRound(1)
    }
    
    // restartGame() {
    //   this.setState({
    //     view: "Player1",
    //     player1: {name: this.state.player1.name, score: 0},
    //     player2: {name: this.state.player2.name, score: 0},
    //     qsPerRound: this.state.qsPerRound,
    //     totalRound: this.state.totalRound,
    //     currRound: 1,
    //   })
    // }
    
    const restartNew = () => {
        setView("New")
        setCurrRound(1)
    }
    
    // restartNew() {
    //   this.setState({
    //     view: "New",
    //     currRound: 1,
    //   })
    // }
    
    const renderView = () => {
      if (view === 'New') {
        return <NewGame handleClick={() => changeView("game-start")} />;
      } else if (view === "game-start") {
        return <GameStart gameStart={() => changeView("Player1")} settings={settings}/>;
      } else if (view === "Player1") {
        return <Player1 play1Stat={player1} currRound={currRound} categories={categories} selectedCategory={selectedCategory1}/>
      } else if (view === "QuestionsView1") {
        return <QuestionsView1 category={selCateg} currRound={currRound} play1Stat={player1} qsPerRound={qsPerRound} level={level} nextPlayer={(score) => nextPlayer(score)}/>
      } else if (view === "Player2") {
        return <Player2 play2Stat={player2} currRound={currRound} categories={categories} selectedCategory={selectedCategory2}/>
      } else if (view === "QuestionsView2") {
        return <QuestionsView2 category={selCateg} currRound={currRound} play2Stat={player2} qsPerRound={qsPerRound} level={level} endRound={(score) => endRound(score)}/>
      } else if (view === "Game-Over") {
        return <GameOver player1={player1} player2={player2} restartGame={restartGame} restartNew={restartNew}/>
      }
    }
    
    // renderView() {
    //   const { view } = this.state;
      
    //   console.log('this.state.selCateg: ', this.state.selCateg);
      
    //   if (view === 'New') {
    //     return <NewGame handleClick={() => this.changeView("game-start")} />;
    //   } else if (view === "game-start") {
    //     return <GameStart gameStart={() => this.changeView("Player1")} settings={this.settings}/>;
    //   } else if (view === "Player1") {
    //     return <Player1 play1Stat={this.state.player1} currRound={this.state.currRound} categories={this.state.categories} selectedCategory={this.selectedCategory1}/>
    //   } else if (view === "QuestionsView1") {
    //     return <QuestionsView1 category={this.state.selCateg} currRound={this.state.currRound} play1Stat={this.state.player1} qsPerRound={this.state.qsPerRound} level={this.state.level} nextPlayer={(score) => this.nextPlayer(score)}/>
    //   } else if (view === "Player2") {
    //     return <Player2 play2Stat={this.state.player2} currRound={this.state.currRound} categories={this.state.categories} selectedCategory={this.selectedCategory2}/>
    //   } else if (view === "QuestionsView2") {
    //     return <QuestionsView2 category={this.state.selCateg} currRound={this.state.currRound} play2Stat={this.state.player2} qsPerRound={this.state.qsPerRound} level={this.state.level} endRound={(score) => this.endRound(score)}/>
    //   } else if (view === "Game-Over") {
    //     return <GameOver player1={this.state.player1} player2={this.state.player2} restartGame={this.restartGame} restartNew={this.restartNew}/>
    //   }
    // }
    
    return (
      <div>
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
  
  ReactDOM.render(<App />, document.getElementById('app'))
          
          
          
          
  

  
  
  
  
  
  
  
  
  
  

// var options = {
  //     amount: 2,
  //     category: 'science',
  //     difficulty: 'easy',
  //     type: 'multiple'
  // }
  
  // opentdb.getCategories().then(result => {
    //   console.log(result);
    // });
    
    
    // var options = {
      //     amount: 2,
      //     category: 'science',
      //     difficulty: 'easy',
      //     type: 'multiple'
      // }
      
      // opentdb.getTrivia(options).then(result => {
        //   console.log(result);
        // });
        
        