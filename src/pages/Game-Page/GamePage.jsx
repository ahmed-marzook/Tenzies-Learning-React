// Import necessary components and libraries
import DiceComponent from "../../components/dice/DiceComponent";
import "./GamePage.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid/non-secure"; // For generating unique IDs
import Confetti from "react-confetti"; // For celebration animation
import GameControls from "../../components/gamer-controls/GameControls";

function GamePage() {
  // Track if player has won or needs to start new game
  let isNewGame = true;

  // Lazy initialization of dice state using useState
  // The arrow function passed to useState is only executed once during initial render
  // This prevents generateNewDice from running on every render
  const [dice, setDice] = useState(() => generateNewDice());
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Check if all dice are active and show the same number
  // This determines if the player has won
  const allActiveAndSame = dice.every(
    (die) => die.active && die.number === dice[0].number
  );

  // Update game state based on dice status
  if (allActiveAndSame) {
    isNewGame = true;
  } else {
    isNewGame = false;
  }

  // Function to generate new dice array
  function generateNewDice() {
    if (isNewGame) {
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
    if (isNewGame) {
      setCount(0);
      setDice(generateNewDice());
      resetTimer();
    } else {
      setDice(generateNewDice());
      setCount((prev) => prev + 1);
    }
    if (!isTimerRunning) {
      startTimer();
    }
  }

  // Handler for clicking individual dice to freeze/unfreeze them
  function changeDiceActiveStatus(id) {
    setDice((prev) =>
      prev.map((die) => ({
        ...die,
        active: id === die.id ? !die.active : die.active,
      }))
    );
    if (!isTimerRunning) {
      startTimer();
    }
  }

  useEffect(() => {
    let intervalId;
    if (isTimerRunning && !isNewGame) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          // Stop at 9:59:99 to prevent display issues
          if (prevTime >= 600000) {
            // 10 minutes in milliseconds
            setIsTimerRunning(false);
            return prevTime;
          }
          return prevTime + 10;
        });
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning, isNewGame]);

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTime(0);
  };

  // Render game interface
  return (
    <main className="game-content">
      {isNewGame && <Confetti />}
      <header className="introduction">
        <h1 className="game-title">How to play?</h1>
        <p className="game-instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </header>
      <article className="game-board">
        <div className="dice-grid" role="grid" aria-label="Dice grid">
          {dice.map((die) => (
            <DiceComponent
              key={die.id}
              hasWon={isNewGame}
              id={die.id}
              isActive={die.active}
              diceNumber={die.number}
              onHandle={changeDiceActiveStatus}
            />
          ))}
        </div>
        <GameControls
          rollDice={rollDice}
          count={count}
          isNewGame={isNewGame}
          gameTime={time}
        />
      </article>
    </main>
  );
}

GamePage.propTypes = {};

export default GamePage;
