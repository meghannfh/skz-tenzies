// Importing React and other dependencies
import "./index.css";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Board from "./components/Board"

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
  const [tenzies, setTenzies] = useState<boolean>(false);
  const [numOfHeldDie, setNumOfHeldDie] = useState<number>(0);
  const [invalidClickError, setInvalidClickError] = useState<string>('');
  const [firstPickedValue, setFirstPickedValue] = useState<number>(0);

  //Increment num of held die
  function incrementNumOfHeldDie() {
    setNumOfHeldDie((prevNumOfHeldDie: number) => prevNumOfHeldDie = prevNumOfHeldDie + 1)
  }

  useEffect(() => {
    if(numOfHeldDie === 10){
      setTenzies(true);
      console.log("tenzies")
    }
  }, [numOfHeldDie])

  // Function to generate a new die
  function generateNewDie(): Die {
    return {
      value: Math.ceil(Math.random() * 6),
      held: false,
      id: nanoid(10),
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
    if(tenzies) {
      setDice(newDice);
      setTenzies(false);
      setNumOfHeldDie(0);
      setFirstPickedValue(0);
    } else {
      setDice((prevDice) =>
        prevDice.map((die) => (die.held ? die : generateNewDie())) // Generate a new die if it's not held
      );
    }
  }

  function determineFirstValue(value: number) {
    console.log(`determineFirstValue function ran with value: ${value}`);
    setFirstPickedValue(value);
  }

  // Function to hold a die
  function holdDie(id: string) {
    console.log(`Hold die function ran with id: ${id}`)
    setDice((prevDice: Die[]) =>
      prevDice.map((die: Die) => {
        //die.id === id && (firstPickedValue === 0 || die.value === firstPickedValue) ? { ...die, held: !die.held } : die
        if(die.id === id && (firstPickedValue === 0 || die.value === firstPickedValue)) {
          return {...die, held: !die.held}
        } else {
          return die;
        }
      })
    );
  }

  function handleDieClick(id: string, value:number) {
    setInvalidClickError('');
    if(firstPickedValue !== 0 && value === firstPickedValue) {
      holdDie(id);
      incrementNumOfHeldDie();
    } else if (firstPickedValue === 0) {
      determineFirstValue(value);
      holdDie(id);
      incrementNumOfHeldDie();
    } else {
      setInvalidClickError("You can can only choose a die with the same value as the first.");
    }
  }


  // Mapping dice to JSX elements
  const diceElements = dice.map((die: Die) => (
    <button
      disabled={tenzies}
      className={
        die.held
          ? "bg-green-200 px-4 py-2 rounded-md btns"
          : "px-4 py-2 outline outline-1 rounded-md hover:bg-green-200 btns"
      }
      key={die.id}
      onClick={() => handleDieClick(die.id, die.value)}
      data-testid={`die-${die.id}`} // Add data-testid attribute
    >
      {die.value}
    </button>
  ));

  // Rendering the main component
  return (
    <main className="mx-6 md:w-96 place-self-center">
      <Board 
        diceElements={diceElements} 
        rollDice={rollDice} 
        tenzies={tenzies} 
        invalidClickError={invalidClickError}/>
    </main>
  );
}

// Exporting the App component
export default App;