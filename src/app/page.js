'use client';


import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Pomodoro from "@/components/Pomodoro";
import Meditation from "@/components/meditation";
import MotivatorAndTips from "@/components/motivation";
import About from "@/components/About";



export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="h-px bg-white my-1 mx-4 sm:mx-20 md:mx-40 lg:mx-60"></div>
      <Pomodoro />
      <div className="h-px bg-white my-1 mx-4 sm:mx-20 md:mx-40 lg:mx-60"></div>
      <Meditation />
      <div className="h-px bg-white my-1 mx-4 sm:mx-20 md:mx-40 lg:mx-60"></div>
      <MotivatorAndTips />
      <div className="h-px bg-white my-1 mx-4 sm:mx-20 md:mx-40 lg:mx-60"></div>
      <About />
    </>
  );
}
