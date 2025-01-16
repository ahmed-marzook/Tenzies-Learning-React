import DiceComponent from "../../components/dice/DiceComponent";
import "./GamePage.css";
import diceArray from "../../data/dice";
import { useEffect, useState } from "react";
function GamePage() {
  const [dice, setDice] = useState(diceArray);
  const [hasWon, setHasWon] = useState(false);

  function generateAllNewDice() {
    setDice((prev) =>
      prev.map((die) => ({
        ...die,
        number: !die.active ? Math.floor(Math.random() * 6) + 1 : die.number,
      }))
    );
  }

  function changeDiceActiveStatus(id) {
    setDice((prev) =>
      prev.map((die) => ({
        ...die,
        active: id === die.id ? !die.active : die.active,
      }))
    );
  }

  useEffect(() => {
    const firstNumber = dice[0].number;
    const allActiveAndSame = dice.every(
      (die) => die.active && die.number === firstNumber
    );

    if (allActiveAndSame) {
      setHasWon(true);
    } else {
      setHasWon(false);
    }
  }, [dice]);

  return (
    <div className="game-content">
      <section className="introduction">
        <h2 className="header">How to play?</h2>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </section>
      <section className="dice-grid">
        {dice.map((dice) => (
          <DiceComponent
            key={dice.id}
            hasWon={hasWon}
            id={dice.id}
            isActive={dice.active}
            diceNumber={dice.number}
            onHandle={changeDiceActiveStatus}
          />
        ))}
      </section>
      <button onClick={generateAllNewDice} className="game-button">
        {hasWon ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

GamePage.propTypes = {};

export default GamePage;
