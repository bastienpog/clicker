"use client";

import { useGameStore } from "./useGameStore";
import { useToast } from "./toast/ToastProvider";
import { formatNumberShort } from "./utils";

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
                className={`text-white border border-white px-4 py-2 rounded-md ${!canBuyMultiplier ? "opacity-50 cursor-not-allowed" : "hover:text-black hover:bg-white"}`}
                title={!canBuyMultiplier ? `Need ${formatNumberShort(multiplierCost - score)} more` : ""}
            >
                Buy Multiplier (Cost: {formatNumberShort(multiplierCost)})
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
                className={`text-white border border-white px-4 py-2 rounded-md ${!canBuyAutoclicker ? "opacity-50 cursor-not-allowed" : "hover:text-black hover:bg-white"}`}
                title={!canBuyAutoclicker ? `Need ${formatNumberShort(autoclickerCost - score)} more` : ""}
            >
                Buy AutoClicker (Cost: {formatNumberShort(autoclickerCost)})
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
                className={`text-white border border-white px-4 py-2 rounded-md ${!canBuyOffline ? "opacity-50 cursor-not-allowed" : "hover:text-black hover:bg-white"}`}
                title={!canBuyOffline ? `Need ${formatNumberShort(offlineUpgradeCost - score)} more` : ""}
            >
                Offline Gain + 1 % (lvl {offlineUpgradeLevel}, current {offlineBonusPct}) — Cost: {formatNumberShort(offlineUpgradeCost)}
            </button >
        </div >
    );
};

export default Shop;