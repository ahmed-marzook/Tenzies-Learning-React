// Import necessary components and libraries
import DiceComponent from "../../components/dice/DiceComponent";
import "./GamePage.css";
import { useEffect, useState } from "react";
import Confetti from "react-confetti"; // For celebration animation
import GameControls from "../../components/gameControls/GameControls";
import ResultPopUp from "../../components/resultPopUp/ResultPopUp";
import formatTime from "../../utility/formatTime";
import useTimer from "../../hooks/useTimer";
import useGameState from "../../hooks/useGameState";

function GamePage() {
  const { dice, count, hasWon, rollDice, toggleDice } = useGameState();
  const { time, isTimerRunning, startTimer, resetTimer, stopTimer } =
    useTimer();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    if (hasWon && !hasShownPopup) {
      stopTimer();
      setIsPopUpVisible(true);
      setHasShownPopup(true);
    }
  }, [hasWon, stopTimer, hasShownPopup]);

  const handleRollDice = () => {
    const isNewGame = rollDice();
    if (isNewGame) {
      resetTimer();
      stopTimer();
      setHasShownPopup(false);
      return;
    }
    if (!isTimerRunning) {
      startTimer();
    }
  };

  const handleDiceClick = (id) => {
    toggleDice(id);
    if (!isTimerRunning) {
      startTimer();
    }
  };

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
          time={time}
          count={count}
          onClose={() => setIsPopUpVisible(false)}
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
              onClick={handleDiceClick}
            />
          ))}
        </div>
        <GameControls
          rollDice={handleRollDice}
          count={count}
          hasWon={hasWon}
          gameTime={formatTime(time)}
        />
      </article>
    </main>
  );
}

export default GamePage;
