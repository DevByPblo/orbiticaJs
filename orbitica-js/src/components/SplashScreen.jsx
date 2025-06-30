import React, { useState, useEffect } from 'react';
import { spaceFacts } from '../data/spaceFacts';
import { Rocket, Star } from 'lucide-react';

const SplashScreen = () => {
  const [currentFact, setCurrentFact] = useState(spaceFacts[1]);
  const [isVisible, setIsVisible] = useState(true);
  const [factIndex, setFactIndex] = useState(0);
  const [showFact, setShowFact] = useState(true);

  useEffect(() => {
    const showFactTimer = setTimeout(() => setShowFact(true), 1000);

    const factInterval = setInterval(() => {
      setShowFact(false);
      setTimeout(() => {
        const nextIndex = (factIndex + 1) % spaceFacts.length;
        setFactIndex(nextIndex);
        setCurrentFact(spaceFacts[nextIndex]);
        setShowFact(true);
      }, 300);
    }, 4000);

    const hideTimer = setTimeout(() => setIsVisible(false), 15000);

    return () => {
      clearTimeout(showFactTimer);
      clearInterval(factInterval);
      clearTimeout(hideTimer);
    };
  }, [factIndex]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-black z-999 overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            <Star className="w-1 h-1 text-white fill-white" />
          </div>
        ))}
      </div>

      <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full animate-bounce opacity-70" style={{ animationDuration: '4s' }} />
      <div className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full animate-bounce opacity-50" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-40" />

      <div className="flex flex-col items-center justify-center min-h-screen text-center px-8">
        <div className="mb-8 animate-bounce">
          <Rocket className="w-24 h-24 text-white mx-auto mb-4" style={{ animationDuration: '2s' }} />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-8 animate-pulse">
          SPACE
        </h1>

        <h2 className="text-3xl md:text-4xl font-light text-white mb-12">
          Explore the Cosmos
        </h2>

        <div className="max-w-4xl mx-auto mb-8 min-h-[120px] flex items-center justify-center">
          <div className={`transition-all duration-300 transform ${showFact ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
              <p className="text-lg md:text-xl text-white font-light leading-relaxed">
                🚀 {currentFact}
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 mb-8">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>

       
      </div>

      <div className="absolute top-1/4 left-0 w-2 h-2 bg-white rounded-full opacity-0 animate-ping" 
           style={{ 
             animation: 'ping 6s infinite, shootingStar 6s infinite',
             animationDelay: '2s'
           }} />
    </div>
  );
};

export default SplashScreen;
