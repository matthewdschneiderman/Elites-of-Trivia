import React from "react";
import opentdb from 'opentdb-api';


const Player1 = (props) => {
  // let categories;
  // opentdb.getCategories().then(result => {
  // categories = result;
  // console.log(result);
  // });


  return (
    <div>
      <div>{props.play1Stat.name}'s Turn</div>
      <div>Total Score: {props.play1Stat.score}</div>
      <div>Round {props.currRound}</div>
      <div>{props.categories.map((category) => (
          <div key={category.id} onClick={() => props.selectedCategory(category.id)}>{category.id - 8}. {category.name}</div>
        ))} 
      </div>
    </div>
  )
}

export default Player1;