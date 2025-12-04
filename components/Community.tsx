
import React, { useState, useEffect, useRef } from 'react';
import Section from './ui/Section';
import Button from './ui/Button';
import { Scan, TrendingUp } from 'lucide-react';

const AvatarStack = () => (
  <div className="flex items-center -space-x-3">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-900 bg-gray-800 overflow-hidden">
        <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}&backgroundColor=b6e3f4`} 
            alt="Member" 
            className="w-full h-full object-cover"
        />
      </div>
    ))}
    <div className="w-10 h-10 rounded-full border-2 border-gray-900 bg-gold flex items-center justify-center text-black text-xs font-bold z-10">
      +1K
    </div>
  </div>
);

const Community: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [memberCount, setMemberCount] = useState(1000);
  
  // Animation Sequence States
  const [showBadge, setShowBadge] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showBody, setShowBody] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // 1. Intersection Observer to trigger sequence REPEATEDLY
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility based on intersection status
        // We use a threshold of 0.15 so it resets when mostly out of view
        if (entry.isIntersecting) {
            setIsVisible(true);
            if (entry.target) {
                observer.unobserve(entry.target);
            }
        }
      },
      { threshold: 0.15 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Sequence Logic: Play on Enter, Reset on Leave
  useEffect(() => {
    let badgeTimer: NodeJS.Timeout;
    let titleTimer: NodeJS.Timeout;
    let bodyTimer: NodeJS.Timeout;
    let animationFrameId: number;

    if (isVisible) {
        // --- PLAY ANIMATION ---

        // STEP 1: Counter starts immediately (Badge fades in)
        // Delay slightly to let QR settle
        badgeTimer = setTimeout(() => {
            setShowBadge(true);
            
            // Start counting 1000 -> 1254 over 1.0 seconds (Faster)
            let start = 1000;
            const end = 1254;
            const duration = 1000; // Speed up from 1500ms
            const startTime = performance.now();

            const animateCount = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Cubic Ease Out for smooth deceleration
                const ease = 1 - Math.pow(1 - progress, 3);
                
                setMemberCount(Math.floor(start + (end - start) * ease));

                if (progress < 1) {
                    animationFrameId = requestAnimationFrame(animateCount);
                }
            };
            animationFrameId = requestAnimationFrame(animateCount);
        }, 100); // Speed up delay from 300ms

        // STEP 2: Title appears faster
        titleTimer = setTimeout(() => {
            setShowTitle(true);
        }, 600); // Speed up delay from 1200ms

        // STEP 3: Body & Button appear last
        bodyTimer = setTimeout(() => {
            setShowBody(true);
        }, 1000); // Speed up delay from 1800ms

    }

    // Cleanup: Clear timers if component unmounts OR visibility changes
    return () => {
        clearTimeout(badgeTimer);
        clearTimeout(titleTimer);
        clearTimeout(bodyTimer);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  // 3. 3D Tilt Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center of section
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Apply tilt (Multiplier controls intensity)
    setTilt({ 
        x: y * -4, // Rotate X based on Y movement
        y: x * 4   // Rotate Y based on X movement
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 }); // Reset on leave
  };

  return (
    <div 
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-black overflow-hidden perspective-[2000px]"
    >
        {/* Ambient Background - Kinetic Marquee */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0">
             <div className="w-full flex animate-marquee whitespace-nowrap">
                <span className="text-[10rem] md:text-[15rem] font-sora font-black text-white mr-12 leading-none">
                   JOIN THE CABAL • HIGH SIGNAL • NETWORK • JOIN THE CABAL • HIGH SIGNAL • NETWORK •
                </span>
                <span className="text-[10rem] md:text-[15rem] font-sora font-black text-white mr-12 leading-none">
                   JOIN THE CABAL • HIGH SIGNAL • NETWORK • JOIN THE CABAL • HIGH SIGNAL • NETWORK •
                </span>
             </div>
        </div>

      <Section id="cabal" className="relative z-10 py-32">
        {/* 
            3D CARD CONTAINER
            Uses 'will-change-transform' for performance and custom transition for smooth feel 
        */}
        <div 
            className="relative p-8 md:p-16 bg-gray-900 border border-white/5 [clip-path:polygon(40px_0,100%_0,100%_calc(100%_-_40px),calc(100%_-_40px)_100%,0_100%,0_40px)] group transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
                boxShadow: isVisible ? '0 0 100px -20px rgba(0,0,0,0.8)' : 'none'
            }}
        >
          {/* Fake Border lines for tech feel */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20"></div>
          <div className="absolute top-0 left-0 h-full w-[1px] bg-white/20"></div>
          <div className="absolute top-0 right-0 h-full w-[1px] bg-white/20"></div>

          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold z-20"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold z-20"></div>

          {/* Card Background Gradient */}
          <div className="absolute inset-0 bg-gradient-radial from-gray-800/50 to-black opacity-90 z-0" />
          
          {/* Holographic Sheen based on tilt */}
          <div 
             className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 z-0 pointer-events-none transition-opacity duration-500"
             style={{ opacity: Math.abs(tilt.x) + Math.abs(tilt.y) > 0 ? 0.1 : 0 }}
          />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center [transform-style:preserve-3d]">
            
            {/* 
                LEFT COLUMN: Text & Content 
                Sequentially revealed: Badge -> Title -> Body
            */}
            <div className="space-y-8 order-2 lg:order-1 [transform:translateZ(40px)]">
              
              {/* 1. Live Stats Badge */}
              <div 
                className={`transition-all duration-700 ease-out transform ${showBadge ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                  <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm shadow-lg">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <span className="text-gold font-sora font-bold text-xs uppercase tracking-widest tabular-nums">
                        {memberCount.toLocaleString()}+ Members Online
                    </span>
                  </div>
              </div>
              
              {/* 2. Headline */}
              <div className={`space-y-4 transition-all duration-700 ease-out transform ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                  <h2 className="text-5xl md:text-7xl font-sora font-extrabold text-white leading-[0.9]">
                    JOIN THE <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white animate-pulse">1,000+ STRONG.</span>
                  </h2>
                  
                  <p className="text-xl text-gray-300 font-inter max-w-md leading-relaxed">
                    Don't trade alone. Join over 1,000 founders, builders, and degens in <b>Ola's Kitchen</b>. 
                    Real-time alpha, networking, and zero noise.
                  </p>
              </div>

              {/* 3. Footer Stats & Button */}
              <div className={`transition-all duration-700 ease-out transform ${showBody ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="flex items-center gap-6 border-t border-white/10 pt-6 mb-6">
                    <AvatarStack />
                    <div className="h-8 w-[1px] bg-white/20"></div>
                    <div>
                        <p className="text-white font-bold font-sora text-lg">High Signal</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Verified Network</p>
                    </div>
                </div>
                
                <div className="">
                  <a href="https://t.me/olacabal" target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" withIcon className="w-full md:w-auto shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                        Enter Ola's Kitchen
                    </Button>
                  </a>
                </div>
              </div>

            </div>

            {/* 
                RIGHT COLUMN: QR Gateway 
                Visible FIRST upon scroll
            */}
            <div className={`relative flex justify-center lg:justify-end items-center order-1 lg:order-2 [transform:translateZ(20px)] transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
               <div className="relative w-[340px] h-[340px] flex items-center justify-center">
                   
                   {/* Rotating Tech Ring */}
                   <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-spin-slow pointer-events-none"></div>
                   <div className="absolute inset-4 rounded-full border border-white/5 animate-spin-slow [animation-direction:reverse] pointer-events-none"></div>

                   {/* Floating Stats Card - Pops in with Badge */}
                   <div className={`absolute -top-6 -right-6 z-30 bg-black/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col items-center gap-2 transition-all duration-500 ${showBadge ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                          <TrendingUp size={20} className="text-white" />
                      </div>
                      <div className="text-center">
                          <span className="block text-white font-bold font-sora text-sm">{memberCount > 1200 ? '1.2K+' : memberCount} Subs</span>
                          <span className="block text-gray-500 text-[10px] uppercase tracking-wider">Ola's Kitchen</span>
                      </div>
                   </div>

                   {/* Main Container */}
                   <div className="relative z-10 p-2 transition-transform duration-500 group-hover:scale-105">
                      
                      {/* Frame Brackets */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/50 group-hover:border-gold transition-colors"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/50 group-hover:border-gold transition-colors"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/50 group-hover:border-gold transition-colors"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/50 group-hover:border-gold transition-colors"></div>

                      {/* Scanning Beam */}
                      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                         <div className={`w-full h-[2px] bg-gold/50 shadow-[0_0_20px_rgba(212,175,55,1)] absolute top-0 ${isVisible ? 'animate-[scan_4s_ease-in-out_infinite]' : ''}`}></div>
                      </div>
                      
                      <style>{`
                        @keyframes scan {
                          0%, 100% { top: 0%; opacity: 0; }
                          10% { opacity: 1; }
                          90% { opacity: 1; }
                          100% { top: 100%; opacity: 0; }
                        }
                      `}</style>

                      {/* QR IMAGE */}
                      <div className="bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/10 shadow-2xl">
                          <img 
                             src="https://res.cloudinary.com/derzqoidk/image/upload/v1764586465/Untitled_whxacf.png" 
                             alt="Community Access" 
                             className="w-64 h-64 object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" 
                          />
                      </div>
                   </div>

                   {/* Bottom Label - Visible from start */}
                   <div className={`absolute -bottom-8 flex items-center gap-2 text-gold/80 font-sora text-xs font-bold uppercase tracking-[0.2em] transition-opacity duration-1000 ${isVisible ? 'opacity-100 animate-pulse' : 'opacity-0'}`}>
                      <Scan size={14} />
                      <span>Scan to Join</span>
                   </div>
               </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Community;
