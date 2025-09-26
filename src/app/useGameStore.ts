import { create } from "zustand";

interface GameState {
  score: number;
  multiplier: number;
  autoclickers: number;
  addScore: (amount: number) => void;
  increaseMultiplier: () => void;
  buyAutoclicker: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  multiplier: 1,
  autoclickers: 0,

  addScore: (amount: number) =>
    set((state: GameState) => ({
      score: state.score + amount * state.multiplier,
    })),

  increaseMultiplier: () =>
    set((state: GameState) =>
      state.score >= 50
        ? { score: state.score - 50, multiplier: state.multiplier + 1 }
        : state
    ),

  buyAutoclicker: () =>
    set((state: GameState) =>
      state.score >= 100
        ? { score: state.score - 100, autoclickers: state.autoclickers + 1 }
        : state
    ),
}));
