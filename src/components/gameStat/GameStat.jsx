import PropTypes from "prop-types";
import "./GameStat.css";

function GameStat(props) {
  return (
    <div className="game-stat">
      <span className="stat-label">{props.label}</span>
      <span className="stat-value">{props.value}</span>
    </div>
  );
}

GameStat.propTypes = {
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
};

export default GameStat;
