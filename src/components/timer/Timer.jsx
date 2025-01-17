import PropTypes from "prop-types";

function Timer(props) {
  return (
    <div className="game-stat">
      <span className="stat-label">Timer</span>
      <span className="stat-value">{props.gameTime}</span>
    </div>
  );
}

Timer.propTypes = {
  gameTime: PropTypes.number.isRequired,
};

export default Timer;
