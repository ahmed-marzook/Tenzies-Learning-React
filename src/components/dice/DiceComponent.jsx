import PropTypes from "prop-types";
import "./DiceComponent.css";
function DiceComponent(props) {
  const className = `dice ${props.isActive ? "active" : ""}`;
  return (
    <button
      className={className}
      onClick={!props.isActive ? () => props.onHandle(props.id) : undefined}
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
};

export default DiceComponent;
