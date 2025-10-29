"use client";

import { useEffect } from "react";
import { useGameStore } from "./useGameStore";
import { useToast } from "./toast/ToastProvider";
import { ACHIEVEMENTS } from "./achievements";

const Achievements = () => {
    const { showToast } = useToast();
    const score = useGameStore((s) => s.score);
    const multiplier = useGameStore((s) => s.multiplier);
    const autoclickers = useGameStore((s) => s.autoclickers);
    const offlineUpgradeLevel = useGameStore((s) => s.offlineUpgradeLevel);
    const unlocked = useGameStore((s) => s.unlockedAchievements);
    const unlock = useGameStore((s) => s.unlockAchievement);

    useEffect(() => {
        const snapshot = { score, multiplier, autoclickers, offlineUpgradeLevel };
        for (const a of ACHIEVEMENTS) {
            if (!unlocked.includes(a.id) && a.test(snapshot)) {
                unlock(a.id);
                showToast(`Achievement unlocked: ${a.title}`, "success");
            }
        }
    }, [score, multiplier, autoclickers, offlineUpgradeLevel, unlocked, unlock, showToast]);

    return (
        <div className="mt-6">
            <h2 className="text-2xl">Achievements</h2>
            <ul className="mt-3 list-disc list-inside">
                {ACHIEVEMENTS.map((a) => (
                    <li key={a.id} className={unlocked.includes(a.id) ? "" : "opacity-50"}>
                        {a.title} {unlocked.includes(a.id) ? "✓" : ""}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Achievements;