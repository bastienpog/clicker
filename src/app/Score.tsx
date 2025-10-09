"use client";

import { useGameStore } from "./useGameStore";
import { formatNumberShort } from "./utils";

const Score = () => {
    const score = useGameStore((s) => s.score);
    return (
        <h1 className="text-4xl mb-6">Score: {formatNumberShort(score)}</h1>
    );
};

export default Score;
