// Importing React and other dependencies
import "./index.css";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Board from "./assets/components/Board"

// Defining the Die type
type Die = {
  value: number;
  held: boolean;
  id: string;
};

// Defining the App functional component
function App() {
  // State for dice and tenzies
  const [dice, setDice] = useState<Die[]>(newDice());
  const [tenzies, setTenzies] = useState(false);

  // useEffect for logging when dice changes
  useEffect(() => {
    console.log("changed");
  }, [dice]);

  // Function to generate a new die
  function generateNewDie(): Die {
    return {
      value: Math.ceil(Math.random() * 6),
      held: false,
      id: uuidv4(),
    };
  }

  // Function to create an array of new dice
  function newDice(): Die[] {
    const newArr: Die[] = [];
    for (let i = 0; i < 10; i++) {
      newArr.push(generateNewDie());
    }
    return newArr;
  }

  // Function to roll the dice
  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) => (die.held ? die : generateNewDie()))
    );
  }

  // Function to hold a die
  function holdDie(id: string) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, held: !die.held } : die
      )
    );
  }

  // Mapping dice to JSX elements
  const diceElements = dice.map((die) => (
    <button
      className={
        die.held
          ? "bg-green-200 px-4 py-2 rounded-md"
          : "px-4 py-2 outline outline-1 rounded-md hover:bg-green-200"
      }
      key={die.id}
      onClick={() => holdDie(die.id)}
    >
      {die.value}
    </button>
  ));

  // Rendering the main component
  return (
    <main className="mx-6 md:w-96 place-self-center">
      <Board diceElements={diceElements} rollDice={rollDice} tenzies={tenzies} />
    </main>
  );
}

// Exporting the App component
export default App;