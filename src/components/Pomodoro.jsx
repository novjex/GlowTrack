"use client";

import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function PomodoroPreviewCard() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [storedTask, setStoredTask] = useState("");
  const [user, setUser] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  // Watch login status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Format MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Save task to Firestore
  const saveTask = async (task) => {
    if (!task || !user) return;

    try {
      const historyRef = collection(doc(db, "users", user.uid), "history");
      await addDoc(historyRef, {
        taskName: task,
        completedAt: serverTimestamp(),
      });
      console.log("✅ Task saved to Firestore:", task);
    } catch (error) {
      console.error("❌ Error saving task:", error);
    }
  };

  // Countdown timer (only runs if user is logged in)
  useEffect(() => {
    if (!isRunning || !user) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]); // Removed `user?.uid` from dependencies

  // Save task and show congrats when timer hits 0
  useEffect(() => {
    if (timeLeft === 0 && storedTask && user?.uid && !isTaskCompleted) {
      saveTask(storedTask);
      setIsTaskCompleted(true);
      setShowCongrats(true);
    }
  }, [timeLeft, storedTask, isTaskCompleted, user]); // Stable dependencies

  // Hide congratulations after 5 seconds
  useEffect(() => {
    if (!showCongrats) return;
    const timer = setTimeout(() => setShowCongrats(false), 5000);
    return () => clearTimeout(timer);
  }, [showCongrats]);

  // Confirm task before starting
  const confirmTask = () => {
    if (!taskName.trim()) {
      alert("Please enter a task name!");
      return;
    }
    setStoredTask(taskName.trim());
    setTaskName("");
    setIsTaskCompleted(false);
  };

  // Start or pause the timer
  const startPauseTimer = () => {
    // Check if the user is logged in
    if (!user) {
      alert("You must be logged in to start the Pomodoro timer!");
      return;
    }

    // Check if the task is confirmed
    if (!storedTask) {
      alert("Please confirm a task before starting!");
      return;
    }

    // Start or pause the timer
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setStoredTask("");
    setTaskName("");
    setIsTaskCompleted(false);
  };

  const startNewTask = () => {
    resetTimer();
    setStoredTask("");
    setTaskName("");
  };

  return (
    <section id="pomodoro" className="flex justify-center mt-10 px-4 pb-10">
      <div className="bg-transparent border border-white rounded-2xl p-8 shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-center">
          🍅 Pomodoro Timer
        </h2>

        {/* Task input */}
        {!storedTask && !isTaskCompleted ? (
          <div className="mb-4 flex justify-center gap-2">
            <input
              type="text"
              placeholder="Enter your task..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-white bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              onClick={confirmTask}
              className="px-4 py-2 rounded-full border border-white text-white bg-transparent hover:bg-white/10 transition font-semibold"
            >
              ✔
            </button>
          </div>
        ) : (
          <p className="mb-4 text-center text-white text-lg">
            Task: <span className="font-semibold">{storedTask}</span>
          </p>
        )}

        <p className="mb-6 text-center text-white/80">
          Boost your productivity with the Pomodoro technique!
        </p>

        {/* Timer */}
        <div className="text-5xl sm:text-6xl font-mono font-bold mb-6 text-center">
          {formatTime(timeLeft)}
        </div>

        {/* Timer controls */}
        <div className="flex flex-col items-center gap-4">
          {isTaskCompleted ? (
            <>
              <p className="text-center text-green-400 font-semibold text-lg animate-pulse">
                🎉 Congratulations on completing your task!
              </p>
              <button
                onClick={startNewTask}
                className="px-6 py-3 rounded-full border border-white text-white bg-transparent hover:bg-white/10 transition font-semibold"
              >
                Start New Task
              </button>
            </>
          ) : (
            <div className="flex justify-center gap-4">
              <button
                onClick={startPauseTimer}
                className="px-6 py-3 rounded-full border border-white text-white bg-transparent hover:bg-white/10 transition font-semibold"
              >
                {isRunning ? "Pause" : "Start"}
              </button>
              <button
                onClick={resetTimer}
                className="px-6 py-3 rounded-full border border-white text-white bg-transparent hover:bg-white/10 transition font-semibold"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
