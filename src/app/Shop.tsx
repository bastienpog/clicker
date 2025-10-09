"use client";

import { useGameStore } from "./useGameStore";
import { useToast } from "./toast/ToastProvider";

const Shop = () => {
    const { showToast } = useToast();
    const score = useGameStore((s) => s.score);
    const multiplierCost = useGameStore((s) => s.multiplierCost);
    const autoclickerCost = useGameStore((s) => s.autoclickerCost);
    const offlineUpgradeCost = useGameStore((s) => s.offlineUpgradeCost);
    const offlineBonusPct = useGameStore((s) => s.offlineBonusPct);
    const offlineUpgradeLevel = useGameStore((s) => s.offlineUpgradeLevel);
    const increaseMultiplier = useGameStore((s) => s.increaseMultiplier);
    const buyAutoclicker = useGameStore((s) => s.buyAutoclicker);
    const buyOfflineUpgrade = useGameStore((s) => s.buyOfflineUpgrade);

    const canBuyMultiplier = score >= multiplierCost;
    const canBuyAutoclicker = score >= autoclickerCost;
    const canBuyOffline = score >= offlineUpgradeCost;

    return (
        <div className="mt-6 space-x-4">
            <button
                onClick={() => {
                    const before = score;
                    increaseMultiplier();
                    if (before >= multiplierCost) {
                        showToast("Purchased Multiplier +1", "success");
                    } else {
                        showToast("Not enough to buy Multiplier", "error");
                    }
                }}
                disabled={!canBuyMultiplier}
                className={`text-white border border-white px-4 py-2 rounded-md ${!canBuyMultiplier ? "opacity-50 cursor-not-allowed" : ""}`}
                title={!canBuyMultiplier ? `Need ${multiplierCost - score} more` : ""}
            >
                Buy Multiplier (Cost: {multiplierCost})
            </button>
            <button
                onClick={() => {
                    const before = score;
                    buyAutoclicker();
                    if (before >= autoclickerCost) {
                        showToast("Purchased AutoClicker +1", "success");
                    } else {
                        showToast("Not enough to buy AutoClicker", "error");
                    }
                }}
                disabled={!canBuyAutoclicker}
                className={`text-white border border-white px-4 py-2 rounded-md ${!canBuyAutoclicker ? "opacity-50 cursor-not-allowed" : ""}`}
                title={!canBuyAutoclicker ? `Need ${autoclickerCost - score} more` : ""}
            >
                Buy AutoClicker (Cost: {autoclickerCost})
            </button>
            <button
                onClick={
                    () => {
                        const before = score;
                        buyOfflineUpgrade();
                        if (before >= offlineUpgradeCost) {
                            showToast("Offline gain +1%", "success");
                        } else {
                            showToast("Not enough to buy Offline Upgrade", "error");
                        }
                    }
                }
                disabled={!canBuyOffline
                }
                className={`text-white border border-white px-4 py-2 rounded-md ${!canBuyOffline ? "opacity-50 cursor-not-allowed" : ""}`}
                title={!canBuyOffline ? `Need ${offlineUpgradeCost - score} more` : ""}
            >
                Offline Gain + 1 % (lvl {offlineUpgradeLevel}, current {offlineBonusPct}) — Cost: {offlineUpgradeCost}
            </button >
        </div >
    );
};

export default Shop;