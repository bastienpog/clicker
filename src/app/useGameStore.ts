import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GameState {
  reset: () => void;
  score: number;
  multiplier: number;
  autoclickers: number;
  multiplierCost: number;
  autoclickerCost: number;
  lastSavedAt: number | null;
  offlineBonusPct: number; // e.g., 0.01 for +1%
  offlineUpgradeLevel: number;
  offlineUpgradeCost: number;
  addScore: (amount: number) => void;
  increaseMultiplier: () => void;
  buyAutoclicker: () => void;
  applyOfflineProgress: (now: number) => void;
  buyOfflineUpgrade: () => void;
  touchLastSaved: (now: number) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      score: 0,
      multiplier: 1,
      autoclickers: 0,
      multiplierCost: 50,
      autoclickerCost: 100,
      lastSavedAt: null,
      offlineBonusPct: 0.01,
      offlineUpgradeLevel: 0,
      offlineUpgradeCost: 200,

      reset: () =>
        set(() => ({
          score: 0,
          multiplier: 1,
          autoclickers: 0,
          multiplierCost: 50,
          autoclickerCost: 100,
          lastSavedAt: null,
          offlineBonusPct: 0.01,
          offlineUpgradeLevel: 0,
          offlineUpgradeCost: 200,
        })),

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

      applyOfflineProgress: (now: number) =>
        set((state: GameState) => {
          if (!state.lastSavedAt) {
            return { ...state, lastSavedAt: now } as GameState;
          }
          const elapsedSec = Math.max(
            0,
            Math.floor((now - state.lastSavedAt) / 1000)
          );
          if (elapsedSec === 0) return state;
          const perSecond = state.autoclickers; // 1 score per autoclicker per second
          const gained = Math.floor(
            perSecond * elapsedSec * state.offlineBonusPct
          );
          if (gained <= 0) return { ...state, lastSavedAt: now } as GameState;
          return {
            ...state,
            score: state.score + gained,
            lastSavedAt: now,
          } as GameState;
        }),

      buyOfflineUpgrade: () =>
        set((state: GameState) => {
          if (state.score < state.offlineUpgradeCost) return state;
          const newScore = state.score - state.offlineUpgradeCost;
          const newLevel = state.offlineUpgradeLevel + 1;
          const newBonusPct = +(state.offlineBonusPct + 0.01).toFixed(4); // +1% each level
          const newCost = Math.ceil(state.offlineUpgradeCost * 1.25);
          return {
            ...state,
            score: newScore,
            offlineUpgradeLevel: newLevel,
            offlineBonusPct: newBonusPct,
            offlineUpgradeCost: newCost,
          } as GameState;
        }),

      touchLastSaved: (now: number) =>
        set(
          (state: GameState) => ({ ...state, lastSavedAt: now } as GameState)
        ),
    }),
    {
      name: "clicker-game-state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
