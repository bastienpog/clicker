"use client";

import { useGameStore } from "./useGameStore";

const PLANET_SIZE = 384; // px (w-96/h-96)

const Planet = () => {
    const addScore = useGameStore((s) => s.addScore);
    const score = useGameStore((s) => s.score);
    const goal = useGameStore((s) => s.goal);

    const fillPercentage = goal > 0 ? Math.min((score / goal) * 100, 100) : 0;

    return (
        <div className="flex flex-col items-center justify-center select-none" style={{ minHeight: `${PLANET_SIZE * 1.2}px` }}>
            {/* The planet itself */}
            <div
                className="relative w-96 h-96 my-4 rounded-full overflow-hidden cursor-pointer active:animate-planet-bounce"
                onClick={() => addScore(1)}
                style={{ userSelect: "none" }}
            >
                {/* Water fill effect */}
                <div
                    className="absolute bottom-0 lefft-0 w-full bg-blue-500/50 transition-all duration-500 ease-in-out z-10"
                    style={{ height: `${fillPercentage}%` }}
                />

                {/* Spinning globe texture */}
                <div className="absolute inset-0 rounded-full overflow-hidden z-0">
                    <div
                        className="absolute inset-0 bg-[url('/map.webp')] bg-cover animate-spin-globe"
                    ></div>
                    {/* Shading & lighting layers for 3D effect */}
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),rgba(0,0,0,0.42))] mix-blend-overlay pointer-events-none"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-transparent mix-blend-screen pointer-events-none"></div>
                    <div className="absolute inset-0 rounded-full shadow-[inset_20px_0_50px_rgba(0,0,0,0.36)] pointer-events-none"></div>
                </div>
            </div>
            <style jsx>{`
        @keyframes spin-globe {
          from { background-position: 0 0; }
          to { background-position: -800px 0; }
        }
        .animate-spin-globe {
          animation: spin-globe 36s linear infinite;
        }
        @keyframes planet-bounce {
          0% { transform: scale(1); }
          10% { transform: scale(0.95); }
          35% { transform: scale(1.10); }
          60% { transform: scale(0.98); }
          80% { transform: scale(1); }
          100% { transform: scale(1); }
        }
        .animate-planet-bounce {
          animation: planet-bounce 0.32s cubic-bezier(.36,1.34,.49,.99);
        }
      `}</style>
        </div>
    );
};

export default Planet;