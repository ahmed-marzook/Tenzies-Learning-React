import PropTypes from "prop-types";
import "./DiceComponent.css";
function DiceComponent(props) {
  const className = `dice ${props.isActive ? "active" : ""}`;
  return <button className={className}>{props.diceNumber}</button>;
}

DiceComponent.propTypes = {
  diceNumber: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default DiceComponent;
