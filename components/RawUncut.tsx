
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Section from './ui/Section';
import { X, ExternalLink, Loader2, ArrowRight, Play } from 'lucide-react';

// === HELPER: Reveal Component (Local) ===
interface RevealProps {
  children: (isVisible: boolean) => ReactNode;
  threshold?: number;
  className?: string;
}

const Reveal = ({ children, threshold = 0.2, className = "" }: RevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Trigger once
          if (entry.target) {
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {children(isVisible)}
    </div>
  );
};

// === DATA: Real Series Content ===
const SERIES_DATA: Record<string, Array<{ id: string; title: string; date?: string }>> = {
  raw: [
    { id: '1983518166534766702', title: "Ep. 9: How to get your creative spark back", date: "Oct 29, 2025" },
    { id: '1970474392192012609', title: "Milano Edition: Outfit check + alpha", date: "Sep 23, 2025" },
    { id: '1966793147955950072', title: "Ep. 7: What it takes to be high-signal", date: "Sep 13, 2025" },
    { id: '1965056972010733579', title: "Ep. 6: How to build relationships in Web3", date: "Sep 8, 2025" },
    { id: '1962574355679903950', title: "Amsterdam Edition: Networking", date: "Sep 1, 2025" },
    { id: '1957760878599716914', title: "Ep. 5: Networking without begging", date: "Aug 19, 2025" },
    { id: '1954871914704294113', title: "Ep. 4: The easiest creator growth hack", date: "Aug 11, 2025" },
    { id: '1953921544192749740', title: "Ep. 3: New Kaito update & creators", date: "Aug 8, 2025" },
    { id: '1952381138904748473', title: "Ep. 2: 5 mistakes to avoid", date: "Aug 4, 2025" },
    { id: '1947305663593410736', title: "Ep. 1: Building a personal brand in '25", date: "Jul 21, 2025" },
  ],
  block: [
    { id: '1928003306019750399', title: "Ep. 3: Breakdown of @stayloudio", date: "May 29, 2025" },
    { id: '1925124097211589043', title: "Ep. 2: What Makes Caldera Different", date: "May 21, 2025" },
    { id: '1924569887453671471', title: "Ep. 1: Caldera explained in 90s", date: "May 19, 2025" },
  ],
  yap: [
    { id: '1938170262995755080', title: "Farmers vs Founders: Post-TGE Mindshare", date: "Jun 26, 2025" },
    { id: '1937559042940948614', title: "The creator playbook for InfoFi", date: "Jun 24, 2025" },
  ]
};

// Custom Play Icon Component from SVG
const CustomPlayIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="-0.5 0 7 7" 
    className={className}
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="currentColor"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-347.000000, -3766.000000)" fill="currentColor">
        <g transform="translate(56.000000, 160.000000)">
          <path d="M296.494737,3608.57322 L292.500752,3606.14219 C291.83208,3605.73542 291,3606.25002 291,3607.06891 L291,3611.93095 C291,3612.7509 291.83208,3613.26444 292.500752,3612.85767 L296.494737,3610.42771 C297.168421,3610.01774 297.168421,3608.98319 296.494737,3608.57322" id="play-[#1003]"> </path>
        </g>
      </g>
    </g>
  </svg>
);

const SERIES_INFO = [
  { 
    id: 'raw', 
    title: "RAW & UNCUT", 
    subtitle: "Unfiltered Opinions", 
    icon: <CustomPlayIcon className="text-black fill-black" size={24} />,
    img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764667486/wel_undbap.png" 
  },
  { 
    id: 'block', 
    title: "BLOCK TALK", 
    subtitle: "Web3 Education", 
    icon: <CustomPlayIcon className="text-black fill-black" size={24} />,
    img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764667486/wel2_kblspx.png" 
  },
  { 
    id: 'yap', 
    title: "NEW YAP VIDEO", 
    subtitle: "Daily Vibes", 
    icon: <CustomPlayIcon className="text-black fill-black" size={24} />,
    img: "https://res.cloudinary.com/derzqoidk/image/upload/v1764667493/wel3_fzy0xt.png" 
  },
];

declare global {
  interface Window {
    twttr: any;
  }
}

const RawUncut: React.FC = () => {
  const [activeSeries, setActiveSeries] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeSeries) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeSeries]);

  // Load Twitter Widgets JS
  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
      
      script.onload = () => {
        if (window.twttr && activeSeries) {
          window.twttr.widgets.load(document.getElementById('series-modal'));
        }
      };
    } else if (activeSeries) {
      setTimeout(() => {
        window.twttr.widgets.load(document.getElementById('series-modal'));
      }, 100);
    }
  }, [activeSeries]);

  const activeData = activeSeries ? SERIES_DATA[activeSeries] : [];
  const activeInfo = SERIES_INFO.find(s => s.id === activeSeries);

  return (
    <Section id="raw" className="bg-darkbg border-t border-white/5 relative !py-32 overflow-hidden">
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
        >
          <source src="https://res.cloudinary.com/derzqoidk/video/upload/v1764832547/video3_iybzpa.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay for Text Readability - Reduced to 75% for better visibility */}
        <div className="absolute inset-0 bg-black/75 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-darkbg via-transparent to-darkbg z-10"></div>
      </div>

      <div className="relative z-10">
        {/* === BEAT 1: HEADER ANIMATION === */}
        <Reveal threshold={0.5}>
          {(isVisible) => (
            <div className={`flex flex-col md:flex-row justify-between items-end mb-24 gap-6 px-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div>
                <h4 className="text-gold font-sora font-semibold tracking-widest uppercase mb-2">The Content</h4>
                <h2 className="text-4xl md:text-5xl font-sora font-extrabold text-white uppercase italic">
                    OLA'S SIGNATURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">SERIES</span>
                </h2>
                </div>
            </div>
          )}
        </Reveal>

        {/* 
            Artistic Staggered Grid 
            Using negative margins and varied translations to create a non-boxy rhythm
        */}
        {/* === BEAT 2: CARDS ANIMATION (STAGGERED) === */}
        <Reveal threshold={0.2} className="w-full">
           {(isVisible) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                  {SERIES_INFO.map((series, index) => {
                    const episodeCount = SERIES_DATA[series.id]?.length || 0;
                    
                    return (
                      <div 
                          key={series.id} 
                          className={`
                            group relative cursor-pointer transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:z-10
                            ${index % 2 === 0 ? 'md:translate-y-0' : 'md:translate-y-24'} 
                            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}
                          `}
                          style={{ transitionDelay: `${index * 200}ms` }}
                          onClick={() => setActiveSeries(series.id)}
                      >
                          {/* Connecting Line (Artistic Touch) */}
                          {index < SERIES_INFO.length - 1 && (
                          <div className="hidden md:block absolute top-1/2 right-[-2rem] w-8 h-[1px] bg-white/10 group-hover:bg-gold transition-colors"></div>
                          )}

                          {/* The Slanted Card Container */}
                          <div className="relative aspect-video bg-gray-900 border-l-2 border-white/10 group-hover:border-gold transition-all duration-500 overflow-hidden transform skew-x-[-6deg] origin-bottom-left shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)]">
                            
                            {/* --- FEATURE 1: EPISODE BADGE (Visual Hint of Content) --- */}
                            <div className="absolute top-4 right-4 z-20 transform skew-x-[6deg]">
                                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-sm flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">{episodeCount} EPS</span>
                                </div>
                            </div>

                            {/* Reverse Skew Image */}
                            <div className="w-[120%] h-full -ml-[10%] transform skew-x-[6deg]">
                                <img 
                                    src={series.img} 
                                    alt={series.title}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out blur-[2px] group-hover:blur-0" 
                                />
                            </div>
                            
                            {/* --- FEATURE 2: PULSING PLAY BUTTON (Encourage Click) --- */}
                            <div className="absolute inset-0 flex items-center justify-center z-10 transform skew-x-[6deg]">
                                <div className="group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                                    {/* The button pulses when IDLE to draw attention, stops pulsing on hover */}
                                    <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(212,175,55,0.4)] animate-[pulse_2s_infinite] group-hover:animate-none group-hover:shadow-[0_0_50px_rgba(212,175,55,0.8)] transition-all">
                                      {series.icon}
                                    </div>
                                </div>
                            </div>

                            {/* --- FEATURE 3: SLIDE-UP FOOTER (Explicit CTA) --- */}
                            {/* Update: Removed skew-x from parent container so the background slants (matches card). Added inner skew to text. */}
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-black/80 backdrop-blur-sm border-t border-gold/30 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out origin-bottom">
                                <div className="w-full h-full flex items-center justify-between px-6 transform skew-x-[6deg]">
                                    <span className="text-gold font-sora text-xs font-bold uppercase tracking-widest">View Archive</span>
                                    <ArrowRight className="text-gold w-4 h-4" />
                                </div>
                            </div>
                          </div>
                          
                          {/* Text Below */}
                          <div className="mt-8 ml-6 relative">
                            <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold to-transparent h-12"></div>
                            <h3 className="text-3xl font-sora font-black text-white group-hover:text-gold transition-colors leading-[0.9] uppercase italic mb-2">
                                {series.title}
                            </h3>
                            <p className="text-xs text-gray-500 font-inter font-bold tracking-widest uppercase group-hover:text-gray-300 transition-colors">{series.subtitle}</p>
                          </div>
                      </div>
                  )})}
              </div>
           )}
        </Reveal>

        {/* Spacer for the staggered items */}
        <div className="h-0 md:h-24"></div>
      </div>

      {/* === SERIES MODAL === */}
      {activeSeries && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            onClick={() => setActiveSeries(null)}
          ></div>

          <div 
            id="series-modal"
            // FIXED: Using calc(100%_-_20px) with underscores for correct CSS generation in Tailwind
            className="relative w-full max-w-7xl h-full max-h-[90vh] bg-[#0A0A0A] border border-white/10 flex flex-col md:flex-row overflow-hidden shadow-2xl [clip-path:polygon(20px_0,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)] animate-in fade-in zoom-in-95 duration-300"
          >
             <button 
                onClick={() => setActiveSeries(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white hover:text-gold hover:bg-white/10 border border-white/10 rounded-full transition-colors"
             >
                <X size={20} />
             </button>

             {/* Left Panel: Series Info */}
             <div className="w-full md:w-1/4 bg-black/50 border-r border-white/10 p-8 flex flex-col justify-end relative group hidden md:flex">
                <div className="absolute inset-0 z-0">
                  <img src={activeInfo?.img} alt="" className="w-full h-full object-cover opacity-20 grayscale" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80"></div>
                </div>
                
                <div className="relative z-10">
                   <h2 className="text-4xl font-sora font-black text-white uppercase italic leading-none mb-2">{activeInfo?.title}</h2>
                   <p className="text-gold font-bold uppercase tracking-widest text-sm mb-6">{activeInfo?.subtitle}</p>
                   <p className="text-gray-400 font-inter text-sm mb-8 leading-relaxed">
                     Dive into the archive. {activeData.length} episodes available.
                   </p>
                </div>
             </div>

             {/* Right Panel: Episode List with Videos */}
             <div className="w-full md:w-3/4 overflow-y-auto p-4 md:p-8 bg-[#0A0A0A]" ref={scrollContainerRef}>
                <div className="space-y-8">
                  {activeData.map((episode) => (
                    <div key={episode.id} className="bg-white/5 border border-white/5 p-4 md:p-6 rounded-lg hover:border-gold/30 transition-colors group">
                      <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                          <div>
                             <h4 className="text-white font-sora font-bold text-xl mb-1 leading-tight group-hover:text-gold transition-colors">{episode.title}</h4>
                             <p className="text-gray-500 text-xs font-inter uppercase tracking-widest">{episode.date}</p>
                          </div>
                          <a 
                            href={`https://twitter.com/thegreatola/status/${episode.id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gold text-xs font-bold uppercase tracking-wider hover:text-white flex items-center gap-1 whitespace-nowrap"
                          >
                            View on X <ExternalLink size={12} />
                          </a>
                      </div>
                      
                      {/* Video Embed Container */}
                      <div className="w-full flex justify-center bg-black/50 rounded overflow-hidden min-h-[300px]">
                          <blockquote className="twitter-tweet" data-media-max-width="550" data-theme="dark" data-dnt="true">
                            <a href={`https://twitter.com/thegreatola/status/${episode.id}`}></a>
                          </blockquote>
                      </div>
                    </div>
                  ))}
                  
                  {activeData.length === 0 && (
                     <div className="h-full flex flex-col items-center justify-center text-gray-500 py-20">
                        <Loader2 className="animate-spin mb-4" />
                        <p>Loading episodes...</p>
                     </div>
                  )}
                </div>
             </div>

          </div>
        </div>,
        document.body
      )}
    </Section>
  );
};

export default RawUncut;
