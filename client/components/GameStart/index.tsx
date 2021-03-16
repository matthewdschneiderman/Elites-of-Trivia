import React, {useState, useEffect, FC} from "react";
// import './main.scss';

  interface IProps {
    settings: (name1: string, name2: string, length: number, numQs: number, level: string) => void,
    gameStart:() => void
  }

const GameStart: FC<IProps> = (props) => {

  const [name1, setName1] = useState<string>('Player1');
  const [name2, setName2] = useState<string>('Player2');
  const [length, setLength] = useState<number>(3);
  const [numQs, setNumQs] = useState<number>(2);
  const [level, setLevel] = useState<string>('easy');

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



  const onStart = () => {
    props.settings(name1, name2, length, numQs, level.toLowerCase())
    props.gameStart()
  }

  const rounds = [3,5,7,10];
  const nums = [2,3,4,5];
  const diffs = ['Easy', 'Medium', 'Hard'];

    return (
      <div className="newContainer">
        <div>
          <h1>Please Fill Out Player Names and Number of Rounds</h1>
        </div>
        <div>
            <div>
              <div>
                <input className="serach-term" onChange={(e: any) => setName1(e.target.value)} type='text' name='name1' placeholder='Player 1:' />
                <input className="serach-term" onChange={(e: any) => setName2(e.target.value)} type='text' name='name2' placeholder='Player 2:' />
              </div>
              <div className='rule-container' onChange={(e: any) => setLength(e.target.value)}>
                <div className="options">How Many Rounds?</div>
                {rounds.map((round) => {
                  return (
                    <span key={round} >
                    <input className="radio-margin" type="radio" name='length' id={`round${round}`} value={round}></input>
                      <label htmlFor={`round${round}`}>{round} Rounds</label>
                      </span>
                  );
                })}
              </div>
              <div className='rule-container' onChange={(e: any) => setNumQs(e.target.value)}>
                <div className="options">How Many Questions per Round?</div>
                {nums.map((num) => {
                  return (
                    <span key={num} >
                    <input className="radio-margin" type="radio" name='numQs' id={`numQs${num}`} value={num}></input>
                  <label htmlFor={`numQs${num}`}>{num} Questions</label>
                      </span>
                  );
                })}
              </div>
              <div className='rule-container' onChange={(e: any) => setLevel(e.target.value)}>
                <div className="options">Difficulty?</div>
                {diffs.map((diff) => {
                  return (
                    <span key={diff} >
                    <input className="radio-margin" type="radio" name='level' id={`level${diff}`} value={diff}></input>
                  <label htmlFor={`level${diff}`}>{diff}</label>
                      </span>
                  );
                })}
              </div>
            </div>
            <button className="btn" onClick={onStart}>Start Game</button>
        </div>
      </div>
    );
  
}

export default GameStart;