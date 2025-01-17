import PropTypes from "prop-types";
import "./ResultPopUp.css";
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
              <span className="stat-label">Time</span>
              <span className="stat-value">{props.time}</span>
            </div>

            <div className="stat-box">
              <span className="stat-label">Score</span>
              <span className="stat-value">{props.score}</span>
            </div>

            <div className="stat-box">
              <span className="stat-label">Count</span>
              <span className="stat-value">{props.count}</span>
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
