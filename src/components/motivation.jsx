// src/components/motivation.jsx

"use client"; // <-- Add this at the top of the file

import { useState } from "react";

const dailyTips = [
  "💡 Break large tasks into smaller, actionable steps to maintain clarity and progress.",
  "🧘 Take a moment to practice deep breathing — even a minute of calm can help reset your focus.",
  "📵 Eliminate distractions for a focused 25-minute work block, followed by a short break as a reward.",
  "🍀 Emphasize progress over perfection — small, consistent steps lead to significant achievements.",
  "💧 Stay hydrated to ensure sustained focus and mental clarity throughout your day.",
  "🌞 A brief walk can rejuvenate your mind, spark creativity, and enhance overall energy.",
  "📓 Write down three things you're grateful for today to foster a positive mindset.",
  "🎯 Prioritize your most important task at the start of your day for maximum productivity.",
  "🚫 Learn to say no to tasks or activities that drain your energy and hinder your focus.",
  "🔋 Remember, rest is productive. Recharge your energy without feeling guilty.",
];

const quotes = [
  "“Success is not the key to happiness. Happiness is the key to success.” — Albert Schweitzer",
  "“The only way to do great work is to love what you do.” — Steve Jobs",
  "“Don’t watch the clock; do what it does. Keep going.” — Sam Levenson",
  "“Your limitation—it’s only your imagination.” — Unknown",
  "“Great things never come from comfort zones.” — Unknown",
  "“Success is the sum of small efforts, repeated day in and day out.” — Robert Collier",
  "“Believe you can and you're halfway there.” — Theodore Roosevelt",
  "“The future belongs to those who believe in the beauty of their dreams.” — Eleanor Roosevelt",
  "“Don’t be afraid to give up the good to go for the great.” — John D. Rockefeller",
];

export default function MotivatorAndTips() {
  const [currentTip, setCurrentTip] = useState(dailyTips[0]);
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const getRandomTip = () => {
    let newTip;
    do {
      newTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
    } while (newTip === currentTip);
    setCurrentTip(newTip);
  };

  const getRandomQuote = () => {
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote === currentQuote);
    setCurrentQuote(newQuote);
  };

  return (
    <section className="flex justify-center mt-10 px-4 pb-10">
      <div className="bg-transparent border border-white rounded-2xl p-8 shadow-lg w-full max-w-md text-white text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">🌟 Daily Motivation</h2>
        <p className="text-lg mb-6 text-white/90 italic">{currentTip}</p>
        <button
          onClick={getRandomTip}
          className="px-6 py-3 rounded-full border border-white text-white bg-transparent hover:bg-white/10 transition font-semibold mb-4"
        >
          New Tip
        </button>

        <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">💬 Quote of the Day</h2>
        <p className="text-lg mb-6 text-white/90 italic">{currentQuote}</p>
        <button
          onClick={getRandomQuote}
          className="px-6 py-3 rounded-full border border-white text-white bg-transparent hover:bg-white/10 transition font-semibold"
        >
          New Quote
        </button>
      </div>
    </section>
  );
}
