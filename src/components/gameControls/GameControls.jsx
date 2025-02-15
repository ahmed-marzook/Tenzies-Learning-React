import PropTypes from "prop-types";
import "./GameControls.css";
import GameStat from "../gameStat/GameStat";

function GameControls(props) {
  return (
    <footer className="game-controls">
      <GameStat label={"Count"} value={props.count} />

      <button
        onClick={props.rollDice}
        className="game-button"
        aria-label={props.hasWon ? "Start new game" : "Roll dice"}
      >
        {props.hasWon ? "New Game" : "Roll"}
      </button>
      <GameStat label={"Time"} value={props.gameTime} />
    </footer>
  );
}

GameControls.propTypes = {
  count: PropTypes.number.isRequired,
  rollDice: PropTypes.func.isRequired,
  hasWon: PropTypes.bool.isRequired,
  gameTime: PropTypes.number.isRequired,
};

export default GameControls;
