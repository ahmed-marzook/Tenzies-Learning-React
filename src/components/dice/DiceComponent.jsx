import { memo } from "react";
import PropTypes from "prop-types";
import "./DiceComponent.css";

/**
 * Represents a single dice in the dice game.
 * @param {number} id - Unique identifier for the dice.
 * @param {number} diceNumber - Current face value of the dice.
 * @param {boolean} isActive - Indicates if the dice is highlighted/active.
 * @param {function} onHandle - Callback when the dice is clicked; receives the dice id.
 * @param {boolean} hasWon - Disables the dice interaction if true (game is already won).
 */
function DiceComponent({ id, diceNumber, isActive, onHandle, hasWon }) {
  // We build a dynamic class to visually highlight the active dice
  const className = `dice ${isActive ? "active" : ""}`;

  return (
    <button
      disabled={hasWon}
      className={className}
      // It's often clearer to pass the callback inline to highlight the param usage
      onClick={() => onHandle(id)}
      aria-pressed={isActive} // good for accessibility to indicate toggled state
      aria-label={`Die with a value ${diceNumber}, ${
        isActive ? "Active" : "Not Active"
      }`}
    >
      {diceNumber}
    </button>
  );
}

// Use memo to avoid unnecessary re-renders if props haven't changed
export default memo(DiceComponent);

DiceComponent.propTypes = {
  id: PropTypes.number.isRequired,
  diceNumber: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onHandle: PropTypes.func.isRequired,
  hasWon: PropTypes.bool.isRequired,
};
