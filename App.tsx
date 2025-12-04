
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import RawUncut from './components/RawUncut';
import Events from './components/Events';
import Collaborations from './components/Collaborations';
import Community from './components/Community';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while loading by applying styles to body
  // This avoids changing the App container's layout mode (fixed vs relative), preventing layout shifts.
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Fixed elements must be outside the transformed container to work correctly */}
      <div className="bg-noise"></div>
      <Navbar />
      
      {/* 
         SMOOTH TRANSITION STRATEGY:
         1. We render the app IMMEDIATELY but place it behind the loader.
         2. Removed 'fixed' and 'blur' to ensure 60FPS smooth transition without layout jumps.
         3. Uses Opacity + Grayscale for depth effect (Removed Scale to prevent movement).
      */}
      <div 
        className={`
          bg-black min-h-screen selection:bg-gold selection:text-black 
          transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)]
          ${loading 
            ? 'opacity-30 grayscale pointer-events-none' 
            : 'opacity-100 grayscale-0'
          }
        `}
      >
        <main className="relative z-10">
          <Hero />
          <Collaborations />
          <About />
          <Events />
          <RawUncut />
          <Community />
          <Gallery />
        </main>
        <div className="relative z-10">
          <Contact />
        </div>
      </div>
    </>
  );
}

export default App;
