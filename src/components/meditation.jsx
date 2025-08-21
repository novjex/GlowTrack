"use client";

import { useState, useEffect } from "react";

export default function Meditation() {
    const [timeLeft, setTimeLeft] = useState(5 * 60); // default 5 minutes
    const [isRunning, setIsRunning] = useState(false);
    const [customMinutes, setCustomMinutes] = useState(5);

    // Format seconds to MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const secondsLeft = (seconds % 60).toString().padStart(2, "0");
        return `${minutes}:${secondsLeft}`;
    };

    // Timer effect
    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    // Handlers
    const startPause = () => setIsRunning(!isRunning);

    const reset = () => {
        setIsRunning(false);
        setTimeLeft(customMinutes * 60);
    };

    const setCustomTimer = () => {
        if (customMinutes <= 0) return;
        setTimeLeft(customMinutes * 60);
        setIsRunning(false);
    };

    return (
        <section id="meditation" className="flex justify-center mt-10 px-4 pb-10">
            <div className="bg-transparent border border-white rounded-2xl p-8 shadow-lg w-full max-w-md text-white">
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-center">
                    🧘 Meditation Timer
                </h2>

                <p className="mb-6 text-center text-white/80">
                    Take a moment to relax and focus on your breathing.
                </p>

                {/* Custom timer input */}
                <div className="mb-6 flex justify-center gap-2">
                    <input
                        type="number"
                        min="1"
                        value={customMinutes}
                        onChange={(e) => setCustomMinutes(Number(e.target.value))}
                        className="w-20 px-4 py-2 rounded-lg border border-white bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="Minutes"
                    />
                    <button
                        onClick={setCustomTimer}
                        className="px-4 py-2 rounded-full border border-white text-white bg-transparent hover:bg-white/10 transition font-semibold"
                    >
                        Set
                    </button>
                </div>

                {/* Timer display */}
                <div className="text-5xl sm:text-6xl font-mono font-bold mb-6 text-center">
                    {formatTime(timeLeft)}
                </div>

                {/* Action buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={startPause}
                        className="px-6 py-3 rounded-full border border-white text-white bg-transparent hover:bg-white/10 transition font-semibold"
                    >
                        {isRunning ? "Pause" : "Start"}
                    </button>
                    <button
                        onClick={reset}
                        className="px-6 py-3 rounded-full border border-white text-white bg-transparent hover:bg-white/10 transition font-semibold"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </section>
    );
}
