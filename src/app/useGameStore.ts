import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GameState {
  score: number;
  multiplier: number;
  autoclickers: number;
  multiplierCost: number;
  autoclickerCost: number;
  addScore: (amount: number) => void;
  increaseMultiplier: () => void;
  buyAutoclicker: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      score: 0,
      multiplier: 1,
      autoclickers: 0,
      multiplierCost: 50,
      autoclickerCost: 100,

      addScore: (amount: number) =>
        set((state: GameState) => ({
          score: state.score + amount * state.multiplier,
        })),

      increaseMultiplier: () =>
        set((state: GameState) => {
          if (state.score < state.multiplierCost) return state;
          const newScore = state.score - state.multiplierCost;
          const newMultiplier = state.multiplier + 1;
          const newMultiplierCost = Math.ceil(state.multiplierCost * 1.15);
          return {
            score: newScore,
            multiplier: newMultiplier,
            multiplierCost: newMultiplierCost,
          } as GameState;
        }),

      buyAutoclicker: () =>
        set((state: GameState) => {
          if (state.score < state.autoclickerCost) return state;
          const newScore = state.score - state.autoclickerCost;
          const newAutoclickers = state.autoclickers + 1;
          const newAutoclickerCost = Math.ceil(state.autoclickerCost * 1.15);
          return {
            score: newScore,
            autoclickers: newAutoclickers,
            autoclickerCost: newAutoclickerCost,
          } as GameState;
        }),
    }),
    {
      name: "clicker-game-state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
