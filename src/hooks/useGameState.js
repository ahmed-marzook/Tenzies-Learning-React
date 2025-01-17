import { useState } from "react";

import generateAllDice from "../utility/generateAllDice";

export default function useGameState() {
    const [dice, setDice] = useState(() => generateAllDice());
    const [count, setCount] = useState(0);

    const hasWon = dice.every(
        (die) => die.active && die.number === dice[0].number
    );

    function rollDice() {
        if (hasWon) {
            setCount(0);
            setDice(generateAllDice());
            return true;
        } else {
            setDice(generateNewDice());
            setCount((prev) => prev + 1);
            return false;
        }
    }

    function toggleDice(id) {
        setDice((prev) =>
            prev.map((die) => ({
                ...die,
                active: id === die.id ? !die.active : die.active,
            }))
        );
    }

    function generateNewDice() {
        // Only update numbers for non-active (unfrozen) dice
        return dice.map((die) => ({
            ...die,
            number: !die.active ? Math.floor(Math.random() * 6) + 1 : die.number,
        }));
    }

    return {
        dice,
        count,
        hasWon,
        rollDice,
        toggleDice,
    }
}