import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from "../../src/App";

describe("App", () => {
  // Test for rollDice
  describe("rollDice", () => {
    it("rolls the dice when 'Roll Dice' button is clicked", () => {
      render(<App />);
      
      // Mocking Math.random to control dice values
      jest.spyOn(Math, "random").mockReturnValue(0.5);

      // Clicking the 'Roll Dice' button
      fireEvent.click(screen.getByRole("button", { name: /Roll Dice/i }));

      // Assertions
      const diceButtons = screen.getAllByTestId(/die-.+/); // Select buttons by data-testid
      diceButtons.forEach((button, index) => {
        const dieValue = button.textContent ? Number(button.textContent) : 0; // Get the value of the die as an integer
        expect(dieValue).toBeGreaterThanOrEqual(0); // Assert that the die value is within the expected range
        expect(dieValue).toBeLessThanOrEqual(6); // Assuming a six-sided die
      });
    });
  });
});