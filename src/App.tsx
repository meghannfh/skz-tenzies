import "./index.css";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid"; 
import members, { Member } from "./skzooarray";
//nanoid library is being ignored by Jest unit tests because it can't compile the commonjs
//and I don't have the time or energy to deal with that
import Board from "./components/Board"


// Defining the Die type
type Die = {
  value: Member;
  held: boolean;
  id: string;
};

function App() {
  // State for dice and tenzies
  const [dice, setDice] = useState<Die[]>(newDice());
  const [tenzies, setTenzies] = useState<boolean>(false);
  const [numOfHeldDie, setNumOfHeldDie] = useState<number>(0);
  const [invalidClickError, setInvalidClickError] = useState<string>("");
  const [firstPickedValue, setFirstPickedValue] = useState<string>("");

  //Increment num of held die used later to see if num of held die is less <= 10
  function incrementNumOfHeldDie() {
    setNumOfHeldDie((prevNumOfHeldDie: number) => prevNumOfHeldDie = prevNumOfHeldDie + 1)
  }

  useEffect(() => {
    if(numOfHeldDie === 10){
      setTenzies(true);
      console.log("tenzies")
    }
  }, [numOfHeldDie])

  //generate random member:
  function getRandomMember(): Member {
    const randomIndex = Math.floor(Math.random() * members.length);
    return members[randomIndex];
}

  // generate a new die on roll dice click
  function generateNewDie(): Die {
    return {
      value: getRandomMember(),
      held: false,
      id: nanoid(10),
    };
  }

  // create an array of new dice on reset or beginning of game
  function newDice(): Die[] {
    const newArr: Die[] = [];
    for (let i = 0; i < 10; i++) {
      newArr.push(generateNewDie());
    }
    return newArr;
  }

  // roll the dice
  function rollDice() {
    if(tenzies) {
      setDice(newDice);
      setTenzies(false);
      setNumOfHeldDie(0);
      setFirstPickedValue("");
    } else {
      setDice((prevDice) =>
        prevDice.map((die) => (die.held ? die : generateNewDie())) // Generate a new die if it's not held
      );
    }
  }

  //set the value of the first-picked die as the value that the user
  //must select for all die going forward
  function determineFirstValue(value: string) {
    setFirstPickedValue(value);
  }

  // hold a clicked die aka change the held value to true
  function holdDie(id: string) {
    setDice((prevDice: Die[]) =>
      prevDice.map((die: Die) => {
        //die.id === id && (firstPickedValue === 0 || die.value === firstPickedValue) ? { ...die, held: !die.held } : die
        if(die.id === id && (firstPickedValue === "" || die.value.charName === firstPickedValue)) {
          return {...die, held: !die.held}
        } else {
          return die;
        }
      })
    );
  }

  function handleDieClick(id: string, value:string) {
    setInvalidClickError('');
    if(firstPickedValue !== "" && value === firstPickedValue) {
      holdDie(id);
      incrementNumOfHeldDie();
    } else if (firstPickedValue === "") {
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
      onClick={() => handleDieClick(die.id, die.value.charName)}
      data-testid={`die-${die.id}`} // Add data-testid attribute for Jest unit testing purposes
    > 
      <img src={die.value.characterURL} />
    </button>
  ));

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

export default App;