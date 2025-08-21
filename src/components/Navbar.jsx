//src/components/navbar.jsx

'use client';

import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { useEffect, useState, useRef } from 'react';
import Achievements from './achievements';

// Navbar Component
export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const confirmed = window.confirm('Do you really want to log out?');
    if (confirmed) {
      setDropdownOpen(false);
      await auth.signOut();
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const firstName = user?.displayName ? user.displayName.split(' ')[0] : '';

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="relative z-20 p-4 bg-transparent flex items-center justify-between md:justify-start">
      <div className="flex-1 flex justify-center md:absolute md:left-[25%] md:top-5 md:transform md:-translate-x-1/2">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" className="rounded-full">
            <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="1" />
            <line x1="12" y1="12" x2="12" y2="7" stroke="white" strokeWidth="1" />
            <line x1="12" y1="12" x2="15" y2="12" stroke="white" strokeWidth="1" />
          </svg>
          GlowTrack
        </Link>
      </div>

      <div className="flex items-center gap-3 md:absolute md:right-[25%] md:top-5 relative" ref={dropdownRef}>
        {user ? (
          <>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="px-3 py-1.5 bg-transparent border border-white text-gray-800 dark:text-gray-200 text-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              {firstName}
              <svg
                className={`w-4 h-4 transform transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 inline-block bg-black border-2 border-white rounded-2xl shadow-md z-30">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 text-sm text-white dark:text-white rounded focus:outline-none"
                >
                  Achievements
                </button>

                {isModalOpen && (
                  <div className="fixed inset-0 bg-black/70 flex justify-center items-start pt-20 z-50">
                    <div className="bg-gray-900 rounded-2xl w-full max-w-lg p-6 relative overflow-hidden">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 text-white text-xl font-bold"
                      >
                        &times;
                      </button>
                      <div className="max-h-[70vh] overflow-y-auto p-4"> {/* Set fixed height and scrolling for the content */}
                        <Achievements />
                      </div>
                    </div>
                  </div>
                )}
                <div className="h-px bg-white my-1 mx-4"></div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-500 dark:text-red-400 rounded focus:outline-none"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Link
            href="/login"
            className="px-3 py-1.5 bg-transparent border border-white rounded-2xl text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
