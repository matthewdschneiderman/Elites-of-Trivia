import React from "react";
import ReactDOM from "react-dom";
import opentdb from 'opentdb-api';
import NewGame from './components/NewGame.jsx'
import GameStart from './components/GameStart.jsx'
import Player1 from './components/Player1.jsx'
import Player2 from './components/Player2.jsx'
import QuestionsView1 from './components/QuestionsView1.jsx'
import QuestionsView2 from './components/QuestionsView2.jsx'
import GameOver from './components/GameOver.jsx'
import './styles/style.css'

// var util = require('util')


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: "New",
      player1: {name: 'player1', score: 0},
      player2: {name: 'player2', score: 0},
      qsPerRound: 2,
      totalRound: 3,
      currRound: 1,
      categories: 0,
      selCateg: 'none',
    }
    this.changeView = this.changeView.bind(this);
    this.settings = this.settings.bind(this);
    this.selectedCategory1 = this.selectedCategory1.bind(this);
    this.nextPlayer = this.nextPlayer.bind(this);
    this.selectedCategory2 = this.selectedCategory2.bind(this);
    this.endRound = this.endRound.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.restartNew = this.restartNew.bind(this);
  }

  componentDidMount() {
    opentdb.getCategories().then(result => {
    this.setState({
      categories: result,
    })
    console.log(result);
    });
  }

  settings(player1, player2, round, questions) {
    this.setState({
      player1: {name: player1, score: 0},
      player2: {name: player2, score: 0},
      totalRound: round,
      qsPerRound: questions,
    }, () => console.log(this.state))
  }

  selectedCategory1(category){
    this.setState({
      selCateg: category,
      view: 'QuestionsView1'
    })
  }

  selectedCategory2(category){
    this.setState({
      selCateg: category,
      view: 'QuestionsView2'
    })
  }


  changeView(option) {
    this.setState({
      view: option,
    });
  }

  nextPlayer(score){
    document.body.style.backgroundColor =  "#7e55aa94"
    this.setState({
      player1: {name: this.state.player1.name, score: (this.state.player1.score + score)},
      view: "Player2",
    })
  }

  endRound(score){
    document.body.style.backgroundColor =  "#7e55aa94"
    if (this.state.currRound === Number(this.state.totalRound)) {
      this.setState({
        player2: {name: this.state.player2.name, score: (this.state.player2.score + score)},
        view: "Game-Over",
      })
    } else {
      this.setState({
        player2: {name: this.state.player2.name, score: (this.state.player2.score + score)},
        currRound: (this.state.currRound + 1),
        view: "Player1",
      })
    }
  }

  restartGame() {
    this.setState({
      view: "QuestionsView1",
      player1: {name: this.state.player1.name, score: 0},
      player2: {name: this.state.player2.name, score: 0},
      qsPerRound: this.state.qsPerRound,
      totalRound: this.state.totalRound,
      currRound: 1,
    })
  }

  restartNew() {
    this.setState({
      view: "New",
      currRound: 1,
    })
  }

  renderView() {
    const { view } = this.state;

    console.log('this.state.selCateg: ', this.state.selCateg);
    
    if (view === 'New') {
      return <NewGame handleClick={() => this.changeView("game-start")} />;
    } else if (view === "game-start") {
      return <GameStart gameStart={() => this.changeView("Player1")} settings={this.settings}/>;
    } else if (view === "Player1") {
      return <Player1 play1Stat={this.state.player1} currRound={this.state.currRound} categories={this.state.categories} selectedCategory={this.selectedCategory1}/>
    } else if (view === "QuestionsView1") {
      return <QuestionsView1 category={this.state.selCateg} currRound={this.state.currRound} play1Stat={this.state.player1} qsPerRound={this.state.qsPerRound} nextPlayer={(score) => this.nextPlayer(score)}/>
    } else if (view === "Player2") {
      return <Player2 play2Stat={this.state.player2} currRound={this.state.currRound} categories={this.state.categories} selectedCategory={this.selectedCategory2}/>
    } else if (view === "QuestionsView2") {
      return <QuestionsView2 category={this.state.selCateg} currRound={this.state.currRound} play2Stat={this.state.player2} qsPerRound={this.state.qsPerRound} endRound={(score) => this.endRound(score)}/>
    } else if (view === "Game-Over") {
      return <GameOver player1={this.state.player1} player2={this.state.player2} restartGame={this.restartGame} restartNew={this.restartNew}/>
    }
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="title">MVP of Trivia</div>
        </div>
        {(() => {
            if (this.state.view !== 'New' &&  this.state.view !== 'game-start') {
              return (
                <div>
                <div>{this.state.player1.name} V.S. {this.state.player2.name}</div>
                <div>{this.state.player1.score} V.S. {this.state.player2.score}</div>
                </div>
              )
            }
          })()}
        <div>
          <div>{this.renderView()}</div>
        </div>
    </div>
    )
  }
}

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


ReactDOM.render(<App />, document.getElementById('app'))