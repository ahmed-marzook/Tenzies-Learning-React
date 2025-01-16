import PropTypes from "prop-types";
import "./DiceComponent.css";
function DiceComponent(props) {
  const className = `dice ${props.isActive ? "active" : ""}`;
  return (
    <button
      disabled={props.hasWon}
      className={className}
      onClick={() => props.onHandle(props.id)}
    >
      {props.diceNumber}
    </button>
  );
}

DiceComponent.propTypes = {
  id: PropTypes.number.isRequired,
  diceNumber: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onHandle: PropTypes.func.isRequired,
  hasWon: PropTypes.bool.isRequired,
};

export default DiceComponent;
