export type Achievement = {
  id: string;
  title: string;
  test: (s: {
    score: number;
    multiplier: number;
    autoclickers: number;
    offlineUpgradeLevel: number;
  }) => boolean;
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "score_100", title: "First Hundred", test: (s) => s.score >= 100 },
  { id: "score_1k", title: "Four Figures", test: (s) => s.score >= 1_000 },
  { id: "multi_5", title: "Sharpened Clicks", test: (s) => s.multiplier >= 5 },
  {
    id: "auto_5",
    title: "Automation Begins",
    test: (s) => s.autoclickers >= 5,
  },
  {
    id: "offline_3",
    title: "Sleeper Gains",
    test: (s) => s.offlineUpgradeLevel >= 3,
  },
];
