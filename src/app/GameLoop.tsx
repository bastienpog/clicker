"use client";

import { useEffect } from "react";
import { useGameStore } from "./useGameStore";

const GameLoop = () => {
    const autoclickers = useGameStore((s) => s.autoclickers);
    const addScore = useGameStore((s) => s.addScore);

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoclickers > 0) {
                addScore(autoclickers);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [autoclickers, addScore]);

    return null;
};

export default GameLoop;
