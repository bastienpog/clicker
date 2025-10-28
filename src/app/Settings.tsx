"use client";

import { useGameStore } from "./useGameStore";
import { useToast } from "./toast/ToastProvider";

const Settings = () => {
    const { showToast } = useToast();
    const reset = useGameStore((s) => s.reset);

    return (
        <div className="w-full max-w-xl m-4">
            <div className="flex gap-3">
                <button
                    className="text-white border border-white px-3 py-2 rounded-md"
                    onClick={() => {
                        reset();
                        showToast("Game reset", "success");
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Settings;