import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SplashScreen from '../components/SplashScreen';
import Navbar from '../components/Navbar';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-slate-900 to-blue-950 text-white overflow-hidden relative">
     
      <div className="absolute inset-0 -z-10">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <div className="w-[2px] h-[2px] bg-white rounded-full opacity-70"></div>
          </div>
        ))}
      </div>

        <Navbar/>

      <section className="flex flex-col items-center justify-center text-center pt-28 pb-16 px-4">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-fade-in">
          Welcome to Orbitica
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-10 animate-fade-in delay-300">
          Dive into a gamified space education journey. Learn. Explore. Play. Launch missions across solar systems and unlock cosmic knowledge!
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <Link to="/home">
            <button className="px-8 py-4 text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full shadow-lg transition duration-300 hover:scale-105">
              Launch Game 🚀
            </button>
          </Link>

          <Link to="/learnmore">
            <button className="px-8 py-4 text-lg font-medium border border-white/30 bg-white/10 backdrop-blur-sm text-gray-800 hover:bg-white/20 rounded-full transition duration-300 hover:scale-105">
            Learn More →
          </button>
          </Link>
        
        </div>
      </section>
    </div>
  );
};

export default Index;
