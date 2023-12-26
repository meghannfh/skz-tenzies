import { render, screen, fireEvent } from "@testing-library/react";
import Board from "../../src/assets/components/Board";

describe("Board", () => {
  it("renders Board component", () => {
    const diceElements = [
      <div key="1">Die 1</div>,
      <div key="2">Die 2</div>,
      // Add more dice elements as needed
    ];

    const rollDiceMock = jest.fn();
    const tenzies = false;

    render(<Board diceElements={diceElements} rollDice={rollDiceMock} tenzies={tenzies} />);

    // Use queries from @testing-library/react to assert elements
    expect(screen.getByText("SKZ Tenzies")).toBeInTheDocument();
    expect(screen.getByText(/Roll until all members are the same/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Roll Dice/i })).toBeInTheDocument();
  });

  // Add more test cases as needed
});