"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { format } from "date-fns";

export default function Achievements() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(""); // YYYY-MM-DD string

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const historyRef = collection(doc(db, "users", user.uid), "history");
    const q = query(historyRef, orderBy("completedAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(data);
    });

    return () => unsub();
  }, [user]);

  // Group tasks by date string YYYY-MM-DD
  const groupTasksByDate = (tasks) => {
    const grouped = {};
    tasks.forEach((task) => {
      const dateKey = task.completedAt?.toDate
        ? format(task.completedAt.toDate(), "yyyy-MM-dd")
        : "Unknown";
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(task);
    });
    return grouped;
  };

  // Filter tasks if a date is selected, else show all
  const filteredTasks = selectedDate
    ? tasks.filter((task) => {
        if (!task.completedAt?.toDate) return false;
        const taskDate = format(task.completedAt.toDate(), "yyyy-MM-dd");
        return taskDate === selectedDate;
      })
    : tasks;

  const groupedTasks = groupTasksByDate(filteredTasks);

  if (!user) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[200px] text-white bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900 rounded-md shadow-lg">
        <p className="text-lg font-medium">Please log in to see your achievements.</p>
      </div>
    );
  }

  return (
    <section className="p-6 h-full overflow-y-auto max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gradient bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent select-none">
        🏆 Achievements
      </h2>

      {/* Date Selector */}
      <div className="mb-8 flex justify-center">
        <input
          type="date"
          className="px-4 py-2 rounded-md border border-white/30 bg-white/10 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          max={format(new Date(), "yyyy-MM-dd")}
          aria-label="Select date to filter achievements"
        />
        {selectedDate && (
          <button
            className="ml-4 px-3 py-2 rounded-md bg-pink-600 hover:bg-pink-700 text-white font-semibold transition"
            onClick={() => setSelectedDate("")}
            aria-label="Clear date filter"
            title="Clear date filter"
          >
            Clear
          </button>
        )}
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-400 text-sm sm:text-base italic">
          {selectedDate
            ? `No achievements found for ${new Date(selectedDate).toLocaleDateString()}.`
            : "No achievements yet. Complete a task to unlock one!"}
        </p>
      ) : (
        <ul className="space-y-10">
          {Object.entries(groupedTasks).map(([date, tasksOnDate]) => (
            <li key={date}>
              <h3 className="flex items-center text-lg sm:text-xl font-semibold text-white mb-4 select-none">
                <span>
                  {date === "Unknown"
                    ? "Unknown Date"
                    : new Date(date).toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                </span>
                <span className="flex-grow border-b border-white/30 ml-4"></span>
              </h3>

              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {tasksOnDate.map((task) => (
                  <li
                    key={task.id}
                    className="p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg transform transition duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-default"
                    title={task.taskName}
                  >
                    <p className="font-semibold text-white text-base truncate mb-1">
                      {task.taskName}
                    </p>
                    <p className="text-gray-300 text-sm select-text">
                      {task.completedAt?.toDate
                        ? task.completedAt.toDate().toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Pending..."}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
