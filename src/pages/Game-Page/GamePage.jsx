import DiceComponent from "../../components/dice/DiceComponent";
import "./GamePage.css";
import { useState } from "react";
import { nanoid } from "nanoid/non-secure";

function GamePage() {
  let newGame = true;
  const [dice, setDice] = useState(generateNewDice());

  const allActiveAndSame = dice.every(
    (die) => die.active && die.number === dice[0].number
  );

  if (allActiveAndSame) {
    newGame = true;
  } else {
    newGame = false;
  }

  function generateNewDice() {
    if (newGame) {
      return Array(10)
        .fill()
        .map(() => ({
          id: nanoid(),
          number: Math.floor(Math.random() * 6) + 1,
          active: false,
        }));
    } else {
      return dice.map((die) => ({
        ...die,
        number: !die.active ? Math.floor(Math.random() * 6) + 1 : die.number,
      }));
    }
  }

  function rollDice() {
    setDice(generateNewDice());
  }

  function changeDiceActiveStatus(id) {
    setDice((prev) =>
      prev.map((die) => ({
        ...die,
        active: id === die.id ? !die.active : die.active,
      }))
    );
  }

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
