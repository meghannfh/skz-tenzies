import "./index.css";
import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import Board from "./assets/Board";

function App() {
  const [dice, setDice] = useState(newDice());
  const [tenzies, setTenzies] = useState(false);

  //if the value of every die is the same then tenzies = true
  //keeping two internal pieces in state is a common reason
  //to use useEffect
  useEffect (() => {
    console.log("changed")
  }, [dice])
  
  function generateNewDie(){
   return {
      value: Math.ceil(Math.random() * 6),
      held: false,
      id: nanoid()
    };
  }

  /*FIRST SET OF DICE ON FIRST RENDER */
  function newDice() {
      const newArr = [];
      for (let i = 0; i < 10; i++) {
        newArr.push(generateNewDie());
      };
    return newArr;
    };



  function rollDice (){
    setDice(prevDice => prevDice.map(die => {
      return die.held ? die : generateNewDie()
    }))
  }

  function holdDie (id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {
        ...die,
        held: !die.held
      } : die;
    }));
  }

  const diceElements = dice.map((die) => {
    return (
      <button 
        className={die.held ? "bg-green-200 px-4 py-2 rounded-md" : "px-4 py-2 outline outline-1 rounded-md hover:bg-green-200"} 
        key={die.id}
        onClick={() => holdDie(die.id)}
      >
        {die.value}
      </button>)
  })

  return (
    <main className="mx-6 md:w-96 place-self-center">
      <Board 
        diceElements={diceElements}
        rollDice={rollDice}
        tenzies={tenzies}
        />
    </main>
  )
}

export default App
