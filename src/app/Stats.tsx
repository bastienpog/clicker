"use client";

import { useGameStore } from "./useGameStore";

const Stats = () => {
    const multiplier = useGameStore((s) => s.multiplier);
    const autoclickers = useGameStore((s) => s.autoclickers);
    return (
        <div>
            <h2 className="text-2xl mt-6">Upgrades</h2>
            <ul className="mt-4 space-y-2">
                <li>Multiplier: {multiplier}</li>
                <li>AutoClickers: {autoclickers}</li>
            </ul>
        </div>
    );
};

export default Stats;
