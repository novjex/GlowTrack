//src/components/Hero.jsx

"use client";

import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-transparent font-sans flex flex-col justify-start h-screen">

      {/* Content Section */}
      <div className="relative text-center max-w-3xl px-4 sm:px-6 pt-10 md:pt-24 lg:pt-32 pb-40 z-10 mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tighter mb-6 shadow-lg">
          Glow with Focus, Grow with Knowledge
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 font-light opacity-90">
          Maximize your productivity with the Pomodoro Technique. Study in short,
          focused bursts that keep your mind sharp and your goals on track.
        </p>

        <div className="mb-6 text-gray-200">
          <h2 className="text-xl sm:text-3xl font-semibold mb-4 sm:mb-6">Features</h2>

          {/* Full list for sm and up */}
          <ul className="hidden sm:list-disc sm:list-inside sm:text-left sm:space-y-3 sm:block">
            <li className="text-lg">Pomodoro Timer: Work in focused 25-minute sessions with scheduled breaks.</li>
            <li className="text-lg">Meditation: Guided sessions to help you relax and reset.</li>
            <li className="text-lg">Quotes & Tips: Daily inspiration and productivity advice.</li>
            <li className="text-lg">Achievements: Track your milestones and celebrate progress.</li>
          </ul>

          {/* One-word summary for mobile */}
          <ul className="block sm:hidden list-disc list-inside text-sm space-y-1">
            <li>Pomodoro</li>
            <li>Meditation</li>
            <li>Quotes</li>
            <li>Achievements</li>
          </ul>
        </div>

        <div className="inline-flex flex-col sm:flex-row justify-center items-stretch gap-4 sm:gap-6">
          <button
  onClick={() => {
    const el = document.getElementById("pomodoro");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }}
  aria-label="Start a Pomodoro session"
  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center gap-2 border border-white/40 text-white rounded-full font-medium sm:font-semibold bg-transparent hover:border-gray-400 transition duration-300 shadow-lg text-base sm:text-lg whitespace-nowrap"
>
  <span>🍅</span> Start Pomodoro
</button>


          <a
            href="#meditation"
            aria-label="View productivity progress"
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center gap-2 border border-white/40 text-white rounded-full font-medium sm:font-semibold bg-transparent hover:border-gray-400 transition duration-300 shadow-lg text-base sm:text-lg whitespace-nowrap"
          >
            <span>🧘</span> Meditation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
