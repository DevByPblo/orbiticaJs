import React from 'react';
import Navbar from '../components/Navbar';

const LearnMore = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-slate-900 to-blue-950 text-white overflow-auto relative">
      <Navbar /> 

      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          About Orbitica
        </h1>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
          Orbitica is a gamified space education platform designed specifically for space enthusiasts and curious learners of all ages.  
          It blends interactive gameplay with deep scientific concepts to create an engaging way to learn about astronomy, space missions, and the cosmos.
        </p>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-cyan-400">Explore and Learn</h2>
          <p className="text-gray-300 leading-relaxed">
            Launch missions to different solar systems, unlock new planets, and discover cosmic phenomena through immersive gameplay.
            Each mission introduces educational content in an interactive way, helping you understand complex scientific principles naturally as you play.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-cyan-400">For Space Lovers and Learners</h2>
          <p className="text-gray-300 leading-relaxed">
            Whether you are a student, educator, hobbyist, or lifelong learner, Orbitica offers a dynamic environment where learning meets fun.  
            With real-time challenges and progress tracking, you can set your own pace and deepen your knowledge about space technology, physics, and astronomy.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-cyan-400">Built for Accessibility</h2>
          <p className="text-gray-300 leading-relaxed">
            Designed with usability in mind, Orbitica is accessible on multiple devices and platforms, providing a seamless experience wherever you are.  
            The interface is clean and intuitive, ensuring that learners focus on exploration and discovery without distractions.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4 text-cyan-400">Join the Orbitica Community</h2>
          <p className="text-gray-300 leading-relaxed">
            Connect with fellow space enthusiasts, share your missions, and participate in community challenges that push your knowledge further.  
            Together, we explore the cosmos — one mission at a time.
          </p>
        </section>
      </main>
    </div>
  );
};

export default LearnMore;
