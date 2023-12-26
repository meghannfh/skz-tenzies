import React, { ReactElement } from "react";

type BoardProps = {
  diceElements: ReactElement[];
  rollDice: () => void;
  tenzies: boolean;
};

export default function Board({ diceElements, rollDice, tenzies }: BoardProps) {
  return (
    <section className="grid gap-y-2 bg-white rounded-lg text-center p-4">
      <h1>SKZ Tenzies</h1>

      {tenzies ? <p>YOU WON!</p> : <p>Roll until all members are the same. Click each member die to freeze it at its current member between rolls.</p>}

      <section className="grid grid-cols-5 gap-3">
        {diceElements}
      </section>

      <button className="w-full py-2 bg-purple-500 hover:bg-purple-300 text-white hover:text-purple-500 font-bold text-2xl rounded-md" onClick={rollDice}>Roll Dice</button>
    </section>
  );
}