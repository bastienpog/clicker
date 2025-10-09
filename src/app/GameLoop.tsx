"use client";

import { useEffect } from "react";
import { useGameStore } from "./useGameStore";
import { useToast } from "./toast/ToastProvider";
import { formatNumberShort } from "./utils";

const GameLoop = () => {
    const { showToast } = useToast();
    const autoclickers = useGameStore((s) => s.autoclickers);
    const addScore = useGameStore((s) => s.addScore);
    const applyOfflineProgress = useGameStore((s) => s.applyOfflineProgress);
    const touchLastSaved = useGameStore((s) => s.touchLastSaved);

    useEffect(() => {
        // On mount, apply offline gains since last saved and show toast if any
        const before = Date.now();
        const prev = useGameStore.getState().score;
        applyOfflineProgress(before);
        const gained = useGameStore.getState().score - prev;
        if (gained > 0) {
            showToast(`Offline gains: +${formatNumberShort(gained)}`, "success");
        }
        const interval = setInterval(() => {
            if (autoclickers > 0) {
                addScore(autoclickers);
            }
            // update last saved timestamp every tick
            touchLastSaved(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, [autoclickers, addScore, applyOfflineProgress, touchLastSaved]);

    return null;
};

export default GameLoop;
