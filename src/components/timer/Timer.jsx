import PropTypes from "prop-types";

function Timer(props) {
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    if (minutes > 9) {
      return "9:59:99"; // Max display value
    }

    return `${minutes}:${seconds.toString().padStart(2, "0")}:${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="game-stat">
      <span className="stat-label">Timer</span>
      <span className="stat-value">{formatTime(props.gameTime)}</span>
    </div>
  );
}

Timer.propTypes = {
  gameTime: PropTypes.number.isRequired,
};

export default Timer;
