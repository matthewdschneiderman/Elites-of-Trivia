import React from "react";

class GameStart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name1: 'Player1',
      name2: 'Player2',
      length: 0,
      numQs: 2,
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onStart = this.onStart.bind(this);
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  
  onStart() {
    this.props.settings(this.state.name1, this.state.name2, this.state.length, this.state.numQs)
    this.props.gameStart()
    // console.log(this.state.name1, this.state.name2, this.state.length);
  }

  render() {
    return (
      <div className="newContainer">
        <div>
          <h1>Please Fill Out Player Names and Number of Rounds</h1>
        </div>
        <div>
            <div>
              <input onChange={this.onInputChange} type='text' name='name1' placeholder='Player1' />
              <input onChange={this.onInputChange} type='text' name='name2' placeholder='Player2' />
              <div className='rule-container' onChange={this.onInputChange}>
                <div className="options">How Many Rounds?</div>
                <input className="radio-margin" type="radio" name='length' id="round3" value={3}></input>
                  <label htmlFor="round3">3 Rounds</label>
                <input className="radio-margin" type="radio" name='length' id="round5" value={5}></input>
                  <label htmlFor="round5">5 Rounds</label>
                <input className="radio-margin" type="radio" name='length' id="round7" value={7}></input>
                  <label htmlFor="round7">7 Rounds</label>
                <input className="radio-margin" type="radio" name='length' id="round10" value={10}></input>
                  <label htmlFor="round10">10 Rounds</label>
              </div>
              <div className='rule-container' onChange={this.onInputChange}>
                <div className="options">How Many Questions per Round?</div>
                <input className="radio-margin" type="radio" name='numQs' id="numQs2" value={2}></input>
                  <label htmlFor="numQs2">2 Questions</label>
                <input className="radio-margin" type="radio" name='numQs' id="numQs3" value={3}></input>
                  <label htmlFor="numQs3">3 Questions</label>
                <input className="radio-margin" type="radio" name='numQs' id="numQs4" value={4}></input>
                  <label htmlFor="numQs4">4 Questions</label>
                <input className="radio-margin" type="radio" name='numQs' id="numQs5" value={5}></input>
                  <label htmlFor="numQs5">5 Questions</label>
              </div>
            </div>
            <button onClick={this.onStart}>Start Game</button>
        </div>
      </div>
    )
  }
}

export default GameStart;