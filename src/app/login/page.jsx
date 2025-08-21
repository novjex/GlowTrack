// app/login/page.jsx

'use client';

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) router.replace('/');
    });
    return () => unsubscribe();
  }, [router]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

return (
  <main className="max-w-md mx-auto mt-24 p-6">
    <div className="bg-transparent rounded-2xl shadow-xl border border-gray-700 p-10 text-center font-sans text-gray-100">
      <h1 className="text-4xl font-extrabold mb-8 tracking-wide">
        Welcome!
      </h1>

      <div className="mb-8 p-8 bg-transparent rounded-xl shadow-md text-gray-300 border border-gray-700">
        <p className="mb-6 text-lg font-medium">Sign in to continue</p>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full px-6 py-3 font-semibold text-gray-900 bg-gray-300 rounded-lg shadow hover:bg-gray-400 transition duration-300 ease-in-out active:scale-95"
          aria-label="Sign in with Google"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 533.5 544.3"
            fill="none"
          >
            <path
              fill="#5A5A5A"
              d="M533.5 278.4c0-17.8-1.6-35-4.9-51.6H272v97.7h146.9c-6.3 34.2-25.1 63.2-53.5 82.7v68.4h86.5c50.6-46.7 79.6-115 79.6-197.2z"
            />
            <path
              fill="#7A7A7A"
              d="M272 544.3c72.9 0 134.1-24.2 178.8-65.6l-86.5-68.4c-24 16.1-54.7 25.7-92.3 25.7-70.9 0-131-47.9-152.4-112.2H32.8v70.4c44.8 89.2 137.1 150.1 239.2 150.1z"
            />
            <path
              fill="#9A9A9A"
              d="M119.6 323.8c-10.3-30.4-10.3-63.2 0-93.6V159.8H32.8c-39.5 77.1-39.5 169.5 0 246.6l86.8-70.4z"
            />
            <path
              fill="#B0B0B0"
              d="M272 107.7c39.6-.6 77.7 14.1 106.5 40.7l79.7-79.7C404.4 24.3 343.3 0 272 0 170 0 77.7 60.9 32.8 150.1l86.8 70.4c21.5-64.3 81.4-112.8 152.4-112.8z"
            />
          </svg>
          Sign in with Google
        </button>
        {error && <p className="text-red-500 mt-5 font-medium">{error}</p>}
      </div>
    </div>
  </main>
);


}
