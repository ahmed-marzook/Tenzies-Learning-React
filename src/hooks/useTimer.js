import { useEffect, useState } from "react";

export default function useTimer() {
    const [time, setTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isTimerRunning) {
            intervalId = setInterval(() => {
                setTime((prevTime) => {
                    // Stop at 9:59:99 to prevent display issues
                    if (prevTime >= 600000) {
                        // 10 minutes in milliseconds
                        setIsTimerRunning(false);
                        return prevTime;
                    }
                    return prevTime + 10;
                });
            }, 10);
        }
        return () => clearInterval(intervalId);
    }, [isTimerRunning]);

    const startTimer = () => {
        setIsTimerRunning(true);
    };

    const resetTimer = () => {
        setIsTimerRunning(false);
        setTime(0);
    };

    const stopTimer = () => {
        setIsTimerRunning(false);
    };

    return {
        time,
        isTimerRunning,
        startTimer,
        resetTimer,
        stopTimer
    };
}