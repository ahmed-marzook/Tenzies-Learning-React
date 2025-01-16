// Import necessary components and libraries
import DiceComponent from "../../components/dice/DiceComponent";
import "./GamePage.css";
import { useState } from "react";
import { nanoid } from "nanoid/non-secure"; // For generating unique IDs
import Confetti from "react-confetti"; // For celebration animation

function GamePage() {
  // Track if player has won or needs to start new game
  let newGame = true;

  // Lazy initialization of dice state using useState
  // The arrow function passed to useState is only executed once during initial render
  // This prevents generateNewDice from running on every render
  const [dice, setDice] = useState(() => generateNewDice());

  // Check if all dice are active and show the same number
  // This determines if the player has won
  const allActiveAndSame = dice.every(
    (die) => die.active && die.number === dice[0].number
  );

  // Update game state based on dice status
  if (allActiveAndSame) {
    newGame = true;
  } else {
    newGame = false;
  }

  // Function to generate new dice array
  function generateNewDice() {
    if (newGame) {
      // Create completely new set of 10 dice for new game
      return Array(10)
        .fill()
        .map(() => ({
          id: nanoid(),
          number: Math.floor(Math.random() * 6) + 1, // Random number 1-6
          active: false,
        }));
    } else {
      // Only update numbers for non-active (unfrozen) dice
      return dice.map((die) => ({
        ...die,
        number: !die.active ? Math.floor(Math.random() * 6) + 1 : die.number,
      }));
    }
  }

  // Handler for roll dice button
  function rollDice() {
    setDice(generateNewDice());
  }

  // Handler for clicking individual dice to freeze/unfreeze them
  function changeDiceActiveStatus(id) {
    setDice((prev) =>
      prev.map((die) => ({
        ...die,
        active: id === die.id ? !die.active : die.active,
      }))
    );
  }

  // Render game interface
  return (
    <div className="game-content">
      {newGame && <Confetti />} {/* Show celebration animation on win */}
      <section className="introduction">
        <h2 className="header">How to play?</h2>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </section>
      <section className="dice-grid">
        {/* Render array of dice components */}
        {dice.map((dice) => (
          <DiceComponent
            key={dice.id}
            hasWon={newGame}
            id={dice.id}
            isActive={dice.active}
            diceNumber={dice.number}
            onHandle={changeDiceActiveStatus}
          />
        ))}
      </section>
      <button onClick={rollDice} className="game-button">
        {newGame ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

GamePage.propTypes = {};

export default GamePage;
