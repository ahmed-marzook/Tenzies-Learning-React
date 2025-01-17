import { nanoid } from "nanoid/non-secure"; // For generating unique IDs

export default function generateAllDice() {
    return Array(10)
        .fill()
        .map(() => ({
            id: nanoid(),
            // number: Math.floor(Math.random() * 6) + 1, // Random number 1-6
            number: 5,
            active: false,
        }));
}