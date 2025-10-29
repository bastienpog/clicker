"use client";

import { useGameStore } from "./useGameStore";

const ClickButton = () => {
    const addScore = useGameStore((s) => s.addScore);
    return (
        <button
            onClick={() => addScore(1)}
            className="text-white border border-white px-4 py-2 rounded-md hover:text-black hover:bg-white"
        >
            Click me!
        </button>
    );
};

export default ClickButton;
