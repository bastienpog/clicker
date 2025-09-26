"use client";

import { useGameStore } from "./useGameStore";
import { useEffect } from "react";


const Home = () => {
  const { score, multiplier, autoclickers, addScore, increaseMultiplier, buyAutoclicker } = useGameStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoclickers > 0) {
        addScore(autoclickers);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [autoclickers]);
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-6">Score: {score}</h1>

      <button
        onClick={() => addScore(1)}
        className="text-white border border-white px-4 py-2 rounded-md"
      >
        Click me!
      </button>

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

      <div>
        <h2 className="text-2xl mt-6">Upgrades</h2>
        <ul className="mt-4 space-y-2">
          <li>Multiplier: {multiplier}</li>
          <li>AutoClickers: {autoclickers}</li>
        </ul>
      </div>

    </main>
  );
};

export default Home;
