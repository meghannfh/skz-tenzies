import React from 'react'; // Import React
import '@testing-library/jest-dom' 
//was getting error with toBeInTheDocument
//apparently Jest was not recognizing the type?
//changes I made was importing the @testing-library/jest-dom here
//also added "include": "./src/**/**.*" in tsconfig.json
//and making sure that under compilerOptions in tsconfig.json
//include "types": ["@testing-library/jest-dom"]
import { render, screen } from "@testing-library/react";
import Board from "../../src/components/Board";

describe("Board", () => {
  it("renders Board component", () => {
    // Mock data for testing
    const diceElements = [
      <div key="1">Die 1</div>,
      <div key="2">Die 2</div>,
      // Add more dice elements as needed
    ];

    const rollDiceMock = jest.fn();  // Mock function for testing
    const tenzies = false;  // Mock boolean value for testing
    const invalidClickError = ''; // Mock invalid click error

    // Render the Board component with the provided props
    render(<Board 
            diceElements={diceElements} 
            rollDice={rollDiceMock} 
            tenzies={tenzies}
            invalidClickError={invalidClickError}
          />);

    // Use queries from @testing-library/react to assert elements
    expect(screen.getByText("SKZ Tenzies")).toBeInTheDocument();  // Assert that text is present
    expect(screen.getByText(/Roll until all members are the same/i)).toBeInTheDocument();  // Use a regex to find text
    expect(screen.getByRole("button", { name: /Roll Dice/i })).toBeInTheDocument();  // Assert the presence of a button
  });

  // Add more test cases as needed
});