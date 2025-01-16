import PropTypes from "prop-types";
import "./GameControls.css";

function GameControls(props) {
  return (
    <footer className="game-controls">
      <div className="game-stat">
        <span className="stat-label">Count</span>
        <span className="stat-value">{props.count}</span>
      </div>

      <button
        onClick={props.rollDice}
        className="game-button"
        aria-label={props.isNewGame ? "Start new game" : "Roll dice"}
      >
        {props.isNewGame ? "New Game" : "Roll"}
      </button>

      <div className="game-stat">
        <span className="stat-label">Timer</span>
        <span className="stat-value">00:00</span>
      </div>
    </footer>
  );
}

GameControls.propTypes = {
  count: PropTypes.number.isRequired,
  rollDice: PropTypes.func.isRequired,
  isNewGame: PropTypes.bool.isRequired,
};

export default GameControls;
