// Import necessary components and libraries
import DiceComponent from "../../components/dice/DiceComponent";
import "./GamePage.css";
import { useEffect, useState } from "react";
import Confetti from "react-confetti"; // For celebration animation
import GameControls from "../../components/gameControls/GameControls";
import ResultPopUp from "../../components/resultPopUp/ResultPopUp";
import calculateScore from "../../utility/calculateScore";
import formatTime from "../../utility/formatTime";
import generateAllDice from "../../utility/generateAllDice";

function GamePage() {
  // Track if player has won or needs to start new game
  let hasWon = true;

  // Lazy initialization of dice state using useState
  // The arrow function passed to useState is only executed once during initial render
  // This prevents generateNewDice from running on every render
  const [dice, setDice] = useState(() => generateAllDice());
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  // Check if all dice are active and show the same number
  // This determines if the player has won
  const allActiveAndSame = dice.every(
    (die) => die.active && die.number === dice[0].number
  );

  // Update game state based on dice status
  if (allActiveAndSame) {
    hasWon = true;
  } else {
    hasWon = false;
  }

  // Function to generate new dice array
  function generateNewDice() {
    if (hasWon) {
      // Create completely new set of 10 dice for new game
      return generateAllDice();
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
    if (hasWon) {
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
    if (isTimerRunning && !hasWon) {
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
    if (hasWon) {
      setIsPopUpVisible(true);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning, hasWon]);

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTime(0);
  };

  function closePopUp() {
    setIsPopUpVisible(false);
  }

  // Render game interface
  return (
    <main className="game-content">
      {hasWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {hasWon && (
          <p>
            Congratulations! You won! Press &quot;New Game&quot; to start again.
          </p>
        )}
      </div>
      {isPopUpVisible && (
        <ResultPopUp
          score={calculateScore(time, count)}
          time={formatTime(time)}
          count={count}
          onClose={closePopUp}
        />
      )}
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
              hasWon={hasWon}
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
          hasWon={hasWon}
          gameTime={formatTime(time)}
        />
      </article>
    </main>
  );
}

GamePage.propTypes = {};

export default GamePage;
