
import React, { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

// The signature stepped path used in Hero
const CARD_PATH = "M 40 0 L 260 0 L 260 10 L 290 10 L 290 40 L 300 40 L 300 360 L 290 360 L 290 390 L 260 390 L 260 400 L 40 400 L 40 390 L 10 390 L 10 360 L 0 360 L 0 40 L 10 40 L 10 10 L 40 10 Z";

const OLA_IMAGES = [
  "https://res.cloudinary.com/derzqoidk/image/upload/v1764584512/GylRtqLWcAAi0mr_z1drup.jpg", // Real
  "https://res.cloudinary.com/derzqoidk/image/upload/v1764584476/G5FJzkTWIAA0oG6_kifd7p.jpg", // Mascot
  "https://res.cloudinary.com/derzqoidk/image/upload/v1764584446/G1IgkWyXoAEOZ8C_uqnpwg.jpg"  // Lifestyle
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Duration of the load
  const DURATION = 2500; 

  // Track mouse for spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // 1. Progress Animation
  const animate = (time: number) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const timeElapsed = time - startTimeRef.current;
    
    // Linear progress for drawing the line
    const rawProgress = Math.min(timeElapsed / DURATION, 1);
    
    // Update percentage
    setProgress(Math.floor(rawProgress * 100));

    if (timeElapsed < DURATION) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      finishLoading();
    }
  };

  // 2. Image Cycling Animation (The "Glitch/Search" effect)
  useEffect(() => {
    if (isComplete) return;
    
    const interval = setInterval(() => {
        setActiveImgIndex(prev => (prev + 1) % OLA_IMAGES.length);
    }, 2000); // Slow cycle (2s)

    return () => clearInterval(interval);
  }, [isComplete]);

  const finishLoading = () => {
    setProgress(100);
    // Lock on the main image (Index 0)
    setActiveImgIndex(0);
    
    // Trigger exit animation
    setTimeout(() => {
        setIsComplete(true);
        // Wait for the long fade-out to finish before unmounting
        setTimeout(onComplete, 1500); 
    }, 500);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Calculate dynamic filters based on progress
  // Starts dark/grayscale -> Becomes bright/colored
  const imageFilter = isComplete 
    ? 'grayscale(0%) brightness(1.2) contrast(1.1)' 
    : `grayscale(${100 - progress}%) brightness(${0.4 + (progress / 100) * 0.8})`;

  const cardShadow = `drop-shadow(0 0 ${10 + (progress * 0.4)}px rgba(212,175,55,${0.2 + (progress/200)}))`;

  return (
    <div 
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md overflow-hidden transition-all duration-[1500ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onMouseMove={handleMouseMove}
    >
       
       {/* Interactive Mouse Spotlight */}
       <div 
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
          style={{
             background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05), transparent 40%)`
          }}
       />

       {/* Background Grid */}
       <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
            style={{ 
                backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
            }} 
       />

       {/* MAIN CARD CONTAINER */}
       <div className={`relative z-10 w-64 h-80 md:w-80 md:h-[400px] transition-all duration-[1500ms] ease-[cubic-bezier(0.87,0,0.13,1)] ${isComplete ? 'scale-105 opacity-0 blur-md' : 'scale-100 opacity-100'}`}>
          
          <svg 
            viewBox="-10 -10 320 420" 
            className="w-full h-full transition-all duration-300"
            style={{ filter: cardShadow }}
          >
            <defs>
                <clipPath id="loadingCardClip">
                    <path d={CARD_PATH} />
                </clipPath>
                <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
            </defs>

            {/* 1. Background Fill */}
            <path d={CARD_PATH} fill="#050505" />

            {/* 2. Image Layer (Clipped) */}
            <image 
                href={OLA_IMAGES[activeImgIndex]} 
                width="300" 
                height="400" 
                clipPath="url(#loadingCardClip)"
                preserveAspectRatio="xMidYMid slice"
                className="transition-all duration-300 ease-linear"
                style={{ filter: imageFilter }}
            />

            {/* 3. Scanning Beam Overlay */}
            {!isComplete && (
                <rect 
                    x="0" 
                    y="-100" 
                    width="300" 
                    height="50" 
                    fill="url(#scanGradient)" 
                    clipPath="url(#loadingCardClip)"
                    className="animate-[scan_2s_linear_infinite]" 
                />
            )}
            <style>{`
                @keyframes scan {
                    0% { transform: translateY(0); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(450px); opacity: 0; }
                }
            `}</style>

            {/* 4. Progressive Gold Border */}
            {/* The path length is approx 1400 units */}
            <path 
                d={CARD_PATH} 
                fill="none" 
                stroke="#D4AF37" 
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1400"
                strokeDashoffset={1400 - (1400 * (progress / 100))}
                className="transition-all duration-100 ease-linear"
                style={{ filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.8))' }}
            />
          </svg>

          {/* Glitch Overlay Effect */}
          <div className="absolute inset-0 bg-gold/10 mix-blend-overlay opacity-0 animate-[pulse_0.2s_infinite]" style={{ clipPath: `path('${CARD_PATH}')` }}></div>
       </div>

       {/* PERCENTAGE INDICATOR */}
       <div className={`mt-12 relative z-20 transition-all duration-500 ${isComplete ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <span className="font-sora font-black text-4xl md:text-5xl text-white tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            {progress}<span className="text-gold text-3xl md:text-4xl align-top ml-1">%</span>
          </span>
       </div>

    </div>
  );
};

export default LoadingScreen;
