import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders App component", () => {
    render(<App />);
    
    // You can add more specific queries based on your component structure
    const diceButton = screen.getByRole("button", { name: /roll dice/i });
    const boardElement = screen.getByTestId("board-element");

    // Add more assertions based on your component's structure
    expect(diceButton).toBeInTheDocument();
    expect(boardElement).toBeInTheDocument();
  });
});