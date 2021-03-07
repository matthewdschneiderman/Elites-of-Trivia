import React, {useState, useEffect} from "react";

const GameStart = () => {

  const [name, setName] = useState({name1: 'Player1', name2: 'Player2'});
  const [length, setLength] = useState(3);
  const [numQs, setnumQs] = useState(2);
  const [level, setLevel] = useState('easy');

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     name1: 'Player1',
  //     name2: 'Player2',
  //     length: 3,
  //     numQs: 2,
  //     level: 'easy',
  //   }
  //   this.onInputChange = this.onInputChange.bind(this);
  //   this.onStart = this.onStart.bind(this);
  // }

  const onInputChange = (e) => {
    setName({
      [e.target.name]: e.target.value,
    })
  }
  
  const onStart = () => {
    this.props.settings(this.state.name1, this.state.name2, this.state.length, this.state.numQs, this.state.level)
    this.props.gameStart()
    // console.log(this.state.name1, this.state.name2, this.state.length);
  }

    return (
      <div className="newContainer">
        <div>
          <h1>Please Fill Out Player Names and Number of Rounds</h1>
        </div>
        <div>
            <div>
              <div>
                <input className="serach-term" onChange={onInputChange} type='text' name='name1' placeholder='Player 1:' />
                <input className="serach-term" onChange={onInputChange} type='text' name='name2' placeholder='Player 2:' />
              </div>
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
              <div className='rule-container' onChange={this.onInputChange}>
                <div className="options">Difficulty?</div>
                <input className="radio-margin" type="radio" name='level' id="levelE" value='easy'></input>
                  <label htmlFor="levelE">Easy</label>
                <input className="radio-margin" type="radio" name='level' id="levelM" value='medium'></input>
                  <label htmlFor="levelM">Medium</label>
                <input className="radio-margin" type="radio" name='level' id="levelH" value='hard'></input>
                  <label htmlFor="levelH">Hard</label>
              </div>
            </div>
            <button className="btn" onClick={this.onStart}>Start Game</button>
        </div>
      </div>
    );
  
}

export default GameStart;