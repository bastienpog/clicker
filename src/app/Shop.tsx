"use client";

import { useGameStore } from "./useGameStore";

const Shop = () => {
    const { increaseMultiplier, buyAutoclicker } = useGameStore();
    return (
        <div className="mt-6 space-x-4">
            <button
                onClick={increaseMultiplier}
                className="text-white border border-white px-4 py-2 rounded-md"
            >
                Buy Multiplier
            </button>
            <button
                onClick={buyAutoclicker}
                className="text-white border border-white px-4 py-2 rounded-md"
            >
                Buy AutoClicker
            </button>
        </div>
    );
};

export default Shop;
