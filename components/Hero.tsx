
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, X } from 'lucide-react';
import Masonry, { MasonryItem } from './ui/Masonry';

// === VISUAL ASSETS & GEOMETRY ===

// The coordinate path for the Stepped Card Shape (ViewBox 0 0 300 400)
const CARD_PATH = "M 40 0 L 260 0 L 260 10 L 290 10 L 290 40 L 300 40 L 300 360 L 290 360 L 290 390 L 260 390 L 260 400 L 40 400 L 40 390 L 10 390 L 10 360 L 0 360 L 0 40 L 10 40 L 10 10 L 40 10 Z";

const SteppedCard = ({ 
  src, 
  alt, 
  isCenter = false,
  className = ""
}: { 
  src: string, 
  alt: string, 
  isCenter?: boolean,
  className?: string
}) => {
  return (
    <div className={`relative ${className} group select-none h-full w-full`}>
      {/* SVG Container */}
      <svg 
        viewBox="-20 -20 340 440" 
        className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id={`clip-${alt.replace(/\s/g, '')}`}>
            <path d={CARD_PATH} />
          </clipPath>
          
          {/* LUXURY METALLIC GRADIENTS */}
          <linearGradient id="metallicGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8a6c1e" /> {/* Dark Gold Shadow */}
            <stop offset="25%" stopColor="#D4AF37" /> {/* Base Gold */}
            <stop offset="45%" stopColor="#F9E29C" /> {/* High Specular Highlight */}
            <stop offset="55%" stopColor="#F4CF57" /> 
            <stop offset="100%" stopColor="#8a6c1e" />
          </linearGradient>

          <linearGradient id="darkMetal" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stopColor="#333" />
             <stop offset="100%" stopColor="#111" />
          </linearGradient>

          {/* Glow Filter */}
          <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
             <feMerge>
                 <feMergeNode in="coloredBlur"/>
                 <feMergeNode in="SourceGraphic"/>
             </feMerge>
           </filter>

           {/* Inner Shadow for Depth */}
           <filter id="innerShadow">
              <feOffset dx="0" dy="0" />
              <feGaussianBlur stdDeviation="5" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="black" floodOpacity="1" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
           </filter>
        </defs>

        {/* --- LAYER 1: BACK PLATE (Dark Metal Base) --- */}
        <path 
          d={CARD_PATH} 
          fill="#050505" 
          stroke={isCenter ? "#222" : "#111"} 
          strokeWidth="1"
          transform="scale(1.08) translate(-11, -15)"
          className="opacity-100 drop-shadow-lg"
        />

        {/* --- LAYER 2: MIDDLE PLATE (The Gold/Metal Rim) --- */}
        <path 
          d={CARD_PATH} 
          fill="none" 
          stroke={isCenter ? "url(#metallicGold)" : "#333"} 
          strokeWidth="4"
          className={`transition-all duration-500 ${!isCenter && 'group-hover:stroke-[#555]'}`}
          transform="scale(1.04) translate(-5.5, -7.5)"
          filter={isCenter ? "drop-shadow(0 0 2px rgba(212,175,55,0.5))" : ""}
        />

        {/* --- LAYER 3: INNER BEVEL (Highlight) --- */}
        {isCenter && (
          <path 
             d={CARD_PATH}
             fill="none"
             stroke="white"
             strokeWidth="0.5"
             strokeOpacity="0.5"
             transform="scale(1.04) translate(-5.5, -7.5)"
             style={{ mixBlendMode: 'overlay' }}
          />
        )}

        {/* --- LAYER 4: MAIN CARD BODY (Image Container) --- */}
        <g>
            {/* Background Fill */}
            <path d={CARD_PATH} fill="#0a0a0a" />

            {/* The Image (Clipped) */}
            <image 
              href={src} 
              width="300" 
              height="400" 
              clipPath={`url(#clip-${alt.replace(/\s/g, '')})`}
              preserveAspectRatio="xMidYMid slice"
              className={`transition-all duration-500 ${isCenter ? 'opacity-100 contrast-110' : 'opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0'}`}
            />
            
            {/* Glossy Reflection Overlay */}
            <path 
              d="M 0 0 L 300 0 L 150 400 L 0 400 Z" 
              fill="url(#metallicGold)" 
              opacity="0.03" 
              style={{ pointerEvents: 'none', mixBlendMode: 'overlay' }}
              clipPath={`url(#clip-${alt.replace(/\s/g, '')})`}
            />

            {/* Vignette */}
            <path d={CARD_PATH} fill="url(#metallicGold)" fillOpacity="0" stroke="none" className="group-hover:fill-opacity-1 transition-all duration-500" style={{ mixBlendMode: 'overlay' }} />
        </g>

        {/* --- LAYER 5: TOP FRAME (Thin Detail Line) --- */}
        <path 
          d={CARD_PATH} 
          fill="none" 
          stroke={isCenter ? "url(#metallicGold)" : "#444"} 
          strokeWidth="1"
          strokeOpacity={isCenter ? "1" : "0.5"}
          className={`transition-all duration-500 ${!isCenter && 'group-hover:stroke-white/30'}`}
        />

        {/* --- LAYER 6: INDUSTRIAL DETAILS (Bolts/Lines) --- */}
        {isCenter && (
          <>
             <circle cx="20" cy="20" r="1.5" fill="#D4AF37" />
             <circle cx="280" cy="20" r="1.5" fill="#D4AF37" />
             <circle cx="20" cy="380" r="1.5" fill="#D4AF37" />
             <circle cx="280" cy="380" r="1.5" fill="#D4AF37" />
             
             {/* Tech Lines */}
             <path d="M 100 395 L 200 395" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
             <path d="M 100 5 L 200 5" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
          </>
        )}

      </svg>
    </div>
  );
};

// === MOCK DATA FOR MASONRY GALLERY ===
const MASONRY_IMAGES: MasonryItem[] = [
  { id: 1, height: 600, img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764653767/GjuwBQSXsAA1Hl2_swjily.jpg" },
  { id: 2, height: 400, img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584510/GR0Hl19WsAEAeCy_ecpwmx.jpg" },
  { id: 3, height: 500, img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584508/GR0Hl2cacAQNd6o_jfpjos.jpg" },
  { id: 4, height: 350, img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584505/GFPmyWhWIAA0CTG_tragfe.jpg" },
  { id: 5, height: 600, img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584498/G41i2oXXgAAyhYU_pyi27o.jpg" },
  { id: 6, height: 400, img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584493/G25OD6-XsAAaVM__wvwmd3.jpg" },
  { id: 7, height: 550, img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584480/G5ZlfhZXMAEEmz__vdmau7.jpg" },
  { id: 8, height: 400, img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584475/G4p5JWIXsAE0qU4_bvbnt1.jpg" },
  { id: 9, height: 300, img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584469/G4BU9fcWgAAPpH8_rjnkqk.jpg" },
  { id: 10, height: 500, img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584468/G3ziCBPXoAAeKR0_bbm2mv.jpg" },
  { id: 11, height: 450, img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584466/G3SuoKuXAAAjyia_zhnay3.jpg" },
  { id: 12, height: 600, img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584461/G3NPUTZWcAAJzw5_yunv8e.jpg" },
  { id: 13, height: 400, img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584458/G3c1AGYXkAAyACc_ksydzw.jpg" },
  { id: 14, height: 500, img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584476/G5FJzkTWIAA0oG6_kifd7p.jpg" },
  { id: 15, height: 350, img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584446/G1IgkWyXoAEOZ8C_uqnpwg.jpg" }
];

const Hero: React.FC = () => {
  // Constant data for the cards
  const cards = [
    { id: 1, src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584512/GylRtqLWcAAi0mr_z1drup.jpg", alt: "Ola Real" },
    { id: 2, src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584476/G5FJzkTWIAA0oG6_kifd7p.jpg", alt: "Ola Mascot" }, 
    { id: 3, src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584446/G1IgkWyXoAEOZ8C_uqnpwg.jpg", alt: "Ola Lifestyle" }
  ];

  const [cardSlots, setCardSlots] = useState([0, 1, 2]);
  const [isPaused, setIsPaused] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const currentTranslateY = useRef(0);

  // Auto-Rotation Effect
  useEffect(() => {
    if (isPaused || isGalleryOpen) return;

    const interval = setInterval(() => {
      setCardSlots((prevSlots) => {
        return prevSlots.map(slot => (slot + 1) % 3);
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused, isGalleryOpen]);

  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isGalleryOpen]);

  useEffect(() => {
    let animationFrameId: number;

    const updateMarquee = () => {
      if (marqueeRef.current) {
        const scrollY = window.scrollY;
        const targetTranslateY = -(scrollY * 0.15);
        currentTranslateY.current += (targetTranslateY - currentTranslateY.current) * 0.1;
      }
      animationFrameId = requestAnimationFrame(updateMarquee);
    };

    updateMarquee();
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleCardClick = (clickedCardIndex: number) => {
    const currentSlot = cardSlots[clickedCardIndex];
    
    // IF USER CLICKS THE CENTER CARD -> OPEN GALLERY
    if (currentSlot === 1) {
      setIsGalleryOpen(true);
      return;
    }

    // OTHERWISE ROTATE TO CENTER
    const newSlots = [...cardSlots];
    const centerCardIndex = newSlots.findIndex(slot => slot === 1);
    newSlots[clickedCardIndex] = 1;
    newSlots[centerCardIndex] = currentSlot;
    setCardSlots(newSlots);
  };

  const getSlotStyle = (slotIndex: number) => {
    switch(slotIndex) {
      case 0: return "left-1/2 -ml-[184px] md:-ml-[272px] lg:-ml-[296px] -translate-x-1/2 scale-90 z-10 opacity-70 hover:opacity-100 grayscale hover:grayscale-0";
      case 1: return "left-1/2 -translate-x-1/2 scale-110 z-30 opacity-100 drop-shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:scale-115";
      case 2: return "left-1/2 ml-[184px] md:ml-[272px] lg:ml-[296px] -translate-x-1/2 scale-90 z-10 opacity-70 hover:opacity-100 grayscale hover:grayscale-0";
      default: return "";
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex flex-col justify-center bg-black pt-20 overflow-hidden">
        
        {/* === BACKGROUND VIDEO === */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="https://res.cloudinary.com/derzqoidk/video/upload/v1764827421/video2_y84mps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-10"></div>
        </div>

        {/* Background Ambience */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#333]/20 rounded-full blur-[150px] pointer-events-none z-0" />

        {/* Massive Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-10 select-none z-0">
          <h1 className="text-[15vw] md:text-[18vw] font-sora font-black leading-none text-outline-gold whitespace-nowrap opacity-10">
            LEGENDARY
          </h1>
        </div>

        <div className="relative z-30 w-full max-w-[1600px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-24 lg:pb-0">
          {/* Text Content */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1 text-center lg:text-left z-30">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="text-gold font-sora font-bold tracking-widest text-sm uppercase">Web3, football and vibes.</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sora font-extrabold leading-[0.9] text-white tracking-tighter">
              RAW <br/>
              INSIGHTS. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold italic pr-2">REAL VIBES.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-inter font-light max-w-lg leading-relaxed border-l-0 lg:border-l border-white/20 lg:pl-6 mx-auto lg:mx-0">
              Bridging the gap between street culture and blockchain technology. 
              High-signal alpha for the next generation of builders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-6 justify-center lg:justify-start relative z-40">
              <a 
                href="#raw"
                onClick={(e) => handleNavClick(e, '#raw')}
                className="bg-white text-black px-8 py-4 font-sora font-bold text-sm uppercase tracking-wider hover:bg-gold transition-colors flex items-center justify-center gap-2 cursor-pointer relative z-50"
              >
                Start Watching <ArrowRight size={16} />
              </a>
              <a 
                href="#cabal"
                onClick={(e) => handleNavClick(e, '#cabal')}
                className="px-8 py-4 border border-white/20 text-white font-sora font-bold text-sm uppercase tracking-wider hover:border-gold hover:text-gold transition-colors backdrop-blur-sm flex items-center justify-center cursor-pointer relative z-50"
              >
                Join The Cabal
              </a>
            </div>
          </div>

          {/* Hero Visual (Interactive) */}
          <div 
            className="lg:col-span-7 relative order-1 lg:order-2 flex justify-center items-center py-16 lg:py-0 h-[400px] md:h-[500px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <svg className="absolute w-[120%] h-full top-0 left-[-10%] z-0 pointer-events-none opacity-20">
                <path d="M 0 250 Q 300 450 600 250" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
            <div className="relative w-full h-full flex items-center justify-center z-10 perspective-[1000px]">
                {cards.map((card, index) => {
                  const slotIndex = cardSlots[index];
                  const isCenter = slotIndex === 1;
                  return (
                    <div 
                      key={card.id}
                      onClick={() => handleCardClick(index)}
                      className={`
                        absolute top-1/2 -translate-y-1/2
                        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer
                        ${isCenter 
                          ? 'w-48 h-64 md:w-64 md:h-80 lg:w-72 lg:h-[400px]' 
                          : 'w-32 h-48 md:w-48 md:h-64 lg:w-52 lg:h-72'
                        }
                        ${getSlotStyle(slotIndex)}
                      `}
                    >
                      {/* Interaction Hint for Center Card */}
                      {isCenter && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-white/50 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                          Click to View Grid
                        </div>
                      )}
                      
                      <div className={`absolute inset-4 bg-gold/20 blur-3xl -z-10 rounded-full transition-all duration-700 ${isCenter ? 'opacity-100' : 'opacity-0'}`}></div>
                      <SteppedCard src={card.src} alt={card.alt} isCenter={isCenter} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div 
          ref={marqueeRef}
          className="absolute bottom-0 left-[-20%] w-[140%] py-6 z-20 origin-center border-y border-gold/30 bg-[#050505] shadow-[0_10px_40px_rgba(0,0,0,0.8)] will-change-transform overflow-hidden"
          style={{ transform: `translateY(0px) rotate(-2.5deg) skewX(0deg)` }}
        >
          <div className="flex w-max animate-marquee items-center">
            {Array.from({length: 32}).map((_, i) => (
              <div key={i} className="flex-shrink-0 flex items-center mx-12 group">
                <span className="text-white group-hover:text-gold transition-colors duration-500 font-sora font-black text-lg md:text-xl uppercase tracking-widest drop-shadow-md">
                  Build
                </span>
                <span className="mx-6 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_#D4AF37]"></span>
                <span className="text-white group-hover:text-gold transition-colors duration-500 font-sora font-black text-lg md:text-xl uppercase tracking-widest drop-shadow-md">
                  Create
                </span>
                <span className="mx-6 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_#D4AF37]"></span>
                <span className="text-white group-hover:text-gold transition-colors duration-500 font-sora font-black text-lg md:text-xl uppercase tracking-widest drop-shadow-md">
                  Dominate
                </span>
                <span className="mx-6 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_#D4AF37]"></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === MASONRY GALLERY MODAL === */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
          <button 
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-8 right-8 z-50 p-2 bg-black/50 hover:bg-white text-white hover:text-black border border-white/20 rounded-full transition-all duration-300"
          >
            <X size={24} />
          </button>

          <div className="w-full h-full p-4 md:p-12 overflow-hidden flex flex-col">
             <div className="text-center mb-8 animate-in slide-in-from-top-10 duration-700">
                <h2 className="text-4xl font-sora font-black text-white uppercase italic">
                   THE <span className="text-gold">VAULT</span>
                </h2>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-2">Selected visuals from the archive</p>
             </div>
             
             <div className="flex-1 w-full max-w-[1800px] mx-auto overflow-y-auto custom-scrollbar">
                <Masonry 
                   items={MASONRY_IMAGES}
                   animateFrom="center"
                   stagger={0.05}
                   duration={0.8}
                   colorShiftOnHover={true}
                />
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
