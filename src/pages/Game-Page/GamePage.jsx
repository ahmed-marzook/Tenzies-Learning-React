import DiceComponent from "../../components/dice/DiceComponent";
import "./GamePage.css";
import diceArray from "../../data/dice";
import { useState } from "react";
function GamePage() {
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 6) + 1);
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
        {diceArray.map((dice) => (
          <DiceComponent
            key={dice.id}
            isActive={dice.active}
            diceNumber={dice.number}
          />
        ))}
      </section>
      <button className="game-button">Roll</button>
    </div>
  );
}

GamePage.propTypes = {};

export default GamePage;
