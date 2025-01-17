import PropTypes from "prop-types";
import "./ResultPopUp.css";
import GameStat from "../gameStat/GameStat";
import calculateScore from "../../utility/calculateScore";
import formatTime from "../../utility/formatTime";

function ResultPopUp(props) {
  return (
    <div className="modal-overlay" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🏆 Congratulations!</h2>
        </div>

        <div className="modal-body">
          <p className="completion-message">You&apos;ve completed the game!</p>

          <div className="stats-grid">
            <div className="stat-box">
              <GameStat label={"Time"} value={formatTime(props.time)} />
            </div>

            <div className="stat-box">
              <GameStat
                label={"Score"}
                value={calculateScore(props.time, props.count)}
              />
            </div>

            <div className="stat-box">
              <GameStat label={"Count"} value={props.count} />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={props.onClose} className="close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

ResultPopUp.propTypes = {
  time: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ResultPopUp;
