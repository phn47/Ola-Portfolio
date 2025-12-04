
import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Section from './ui/Section';
import { MapPin, Calendar, Play, X, ExternalLink, Ticket, ChevronLeft, ChevronRight, Clock, AlignLeft } from 'lucide-react';
import Masonry, { MasonryItem } from './ui/Masonry';

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

const UPCOMING_SCHEDULE = [
  {
    id: 1,
    date: { month: 'MAY', day: '29', year: 2025 },
    title: "Consensus 2025",
    location: "Austin, TX",
    type: "Panel Speaker",
    desc: "Discussing the future of Consumer Crypto & SocialFi. Join me on the main stage for a deep dive into community building.",
    status: "Confirmed",
    time: "14:00 PM"
  },
  {
    id: 2,
    date: { month: 'JUN', day: '14', year: 2025 },
    title: "Ola Cabal Summit",
    location: "London",
    type: "Private Event",
    desc: "Exclusive dinner and networking for Cabal members. Black tie attire. Location revealed 24h prior.",
    status: "Invite Only",
    time: "19:00 PM"
  },
  {
    id: 3,
    date: { month: 'JUL', day: '22', year: 2025 },
    title: "EthCC Paris",
    location: "Paris, France",
    type: "Networking",
    desc: "Hosting the 'Raw Insights' side event near the venue. Open bar for holders.",
    status: "RSVP Open",
    time: "16:30 PM"
  },
  {
    id: 4,
    date: { month: 'SEP', day: '18', year: 2025 },
    title: "Token2049",
    location: "Singapore",
    type: "Keynote",
    desc: "Main stage presentation: Building Personal Brands in Web3. Don't miss the alpha drop at the end.",
    status: "Confirmed",
    time: "10:00 AM"
  },
  {
    id: 5,
    date: { month: 'DEC', day: '05', year: 2024 },
    title: "Art Basel",
    location: "Miami, FL",
    type: "Gallery Host",
    desc: "Curating a digital art exhibition featuring top Solana artists.",
    status: "Past",
    time: "All Day"
  }
];

const monthMap: Record<string, number> = {
  'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
  'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
};

// === EVENT IMAGE DATASETS ===
const EVENT_IMAGES = {
  panelTalk: [
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584464/G3r3CudWoAA0PRO_sojf7o.jpg',
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584455/G2VQoH1bMAU5cvP_vskk1z.jpg',
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584458/G2V6fvja4AA1eCW_w9fmzc.jpg'
  ],
  networkingNight: [
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584447/G2ejhZoXoAAP6T5_hj3xzg.jpg',
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584457/G2Wg1TbbMAAdSBG_as5m6g.jpg',
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584446/G0pcB8hWcAAe4V2_u03pvn.jpg'
  ],
  communityMeet: [
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584461/G3NPUTZWcAAJzw5_yunv8e.jpg',
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584466/G3SuoKuXAAAjyia_zhnay3.jpg',
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584450/G2OwyuhbAAA8--m_gbcynr.jpg'
  ],
  cabalDinner: [
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584447/G2E9TxCaAAAULeS_aru1gw.jpg',
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584454/G2V6fvuaUAAvdWb_v2k8js.jpg'
  ],
  techTalk: [
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584450/G2OwyuhbAAA8--m_gbcynr.jpg',
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584446/G0pcB8hWcAAe4V2_u03pvn.jpg',
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584448/G2Jn5cLaIAcLwlz_elwygj.jpg'
  ],
  workshop: [
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584505/GFPmyWhWIAA0CTG_tragfe.jpg',
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584474/G4sRWoDXcAA-9iI_inw238.jpg',
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584450/G2OwyuhbAAA8--m_gbcynr.jpg'
  ],
  afterParty: [
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584510/GR0Hl19WsAEAeCy_ecpwmx.jpg',
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584508/GR0Hl2cacAQNd6o_jfpjos.jpg',
    'https://res.cloudinary.com/derzqoidk/image/upload/v1764584493/G25OD6-XsAAaVM__wvwmd3.jpg'
  ]
};

const EventCard = ({ 
  size = 'small', 
  image, 
  images, // New prop for array of images
  videoSrc,
  title, 
  location, 
  date,
  externalLink,
  onClick,
  className = ""
}: { 
  size?: 'small' | 'large' | 'wide' | 'tall', 
  image?: string, 
  images?: string[],
  videoSrc?: string,
  title?: string, 
  location?: string, 
  date?: string,
  externalLink?: string,
  onClick?: () => void,
  className?: string
}) => {
  // Use a Clip Path polygon to cut the corners for a tech/stepped look
  const polygonClass = "[clip-path:polygon(20px_0,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]";
  
  // Explicitly ensuring pointer-events and z-index are set for clickability
  let containerClasses = `relative group overflow-hidden bg-gray-900 block h-full w-full ${polygonClass} ${className} ${onClick ? 'cursor-pointer z-10' : ''}`;
  
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Auto-rotate images every 2 seconds if an array is provided
  useEffect(() => {
    if (images && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImgIndex(prev => (prev + 1) % images.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [images]);

  if (videoSrc) {
    return (
      <div className={`${containerClasses} flex items-center justify-center p-0 transition-colors`}>
         <div className="absolute inset-0 bg-white/10 z-0"></div>
         <div className={`absolute inset-[1px] bg-black z-10 ${polygonClass}`}>
             <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
                <blockquote className="twitter-tweet" data-media-max-width="1080" data-theme="dark">
                  <p lang="en" dir="ltr">Video Post <a href={videoSrc}>pic.twitter.com</a></p>
                  &mdash; Ola Ξlixir (@thegreatola) <a href={videoSrc}>Link</a>
                </blockquote>
             </div>
         </div>
      </div>
    );
  }

  // Determine which image source to use
  const activeImage = images ? images[currentImgIndex] : image;

  return (
    <div className={containerClasses} onClick={onClick}>
      {/* Fake Border Effect */}
      <div className="absolute inset-0 bg-white/10 group-hover:bg-gold/50 transition-colors z-0"></div>
      
      {/* Inner Content Content - Clipped slightly smaller */}
      <div className={`absolute inset-[1px] bg-black z-10 ${polygonClass}`}>
        
        {/* IMAGE LAYER with Transition */}
        {images ? (
            // If multiple images, render them all stacked for cross-fade
            images.map((img, idx) => (
                <img 
                    key={img}
                    src={img} 
                    alt={title || "Event"} 
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110
                        ${idx === currentImgIndex ? 'opacity-70 group-hover:opacity-100 z-10' : 'opacity-0 z-0'}
                    `} 
                />
            ))
        ) : (
            // Single image fallback
            activeImage && (
                <img 
                    src={activeImage} 
                    alt={title || "Event"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                />
            )
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-300 z-20" />
        
        {/* Technical Deco Corner */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-white/20 group-hover:border-gold transition-colors z-30"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-white/20 group-hover:border-gold transition-colors z-30"></div>

        <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-30">
          {date && (
              <div className="flex items-center gap-4 text-xs font-bold font-sora uppercase tracking-widest text-gold mb-2">
              <span className="flex items-center gap-1"><Calendar size={12} /> {date}</span>
              </div>
          )}
          {title && <h3 className="text-xl md:text-2xl font-sora font-bold text-white mb-1 leading-tight">{title}</h3>}
          {location && (
              <div className="flex items-center gap-2 text-gray-400 text-xs font-inter uppercase tracking-wide">
              <MapPin size={12} /> {location}
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Calendar View Component (Google Calendar Style) ---
const CalendarView = ({ onClose }: { onClose: () => void }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const prevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    const goToToday = () => setCurrentDate(new Date());

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentDate(new Date(parseInt(e.target.value), currentMonth, 1));
    };

    // Prepare grid cells (5 rows = 35 slots)
    const totalSlots = 35;
    const days: Array<{ day: number | null, type: 'prev' | 'current' | 'next', dateObj?: Date }> = [];

    // Prev month padding
    const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
        days.push({ day: prevMonthDays - i, type: 'prev' });
    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
        days.push({ day: i, type: 'current', dateObj: new Date(currentYear, currentMonth, i) });
    }

    // Next month padding
    const remainingSlots = totalSlots - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
        days.push({ day: i, type: 'next' });
    }

    const getEventsForDate = (date: Date) => {
        return UPCOMING_SCHEDULE.filter(evt => {
            const evtMonthIndex = monthMap[evt.date.month];
            const evtDay = parseInt(evt.date.day);
            const evtYear = evt.date.year;
            return (
                evtMonthIndex === date.getMonth() &&
                evtDay === date.getDate() &&
                evtYear === date.getFullYear()
            );
        });
    };

    const selectedEvent = UPCOMING_SCHEDULE.find(e => e.id === selectedEventId);

    return (
        <div className="w-full h-full flex flex-col bg-[#050505] text-white overflow-hidden">
            {/* Header */}
            <div className="flex items-center p-6 border-b border-white/10 gap-6">
                <div className="flex items-center gap-4">
                    <button onClick={goToToday} className="px-4 py-2 border border-white/20 rounded-md text-xs font-bold uppercase hover:bg-white hover:text-black transition-colors">
                        Today
                    </button>
                    <div className="flex gap-1">
                        <button onClick={prevMonth} className="p-1 hover:bg-white/10 rounded-full"><ChevronLeft size={20} /></button>
                        <button onClick={nextMonth} className="p-1 hover:bg-white/10 rounded-full"><ChevronRight size={20} /></button>
                    </div>
                    <h2 className="text-2xl font-sora font-bold">
                        {currentDate.toLocaleString('default', { month: 'long' })} <span className="text-gray-500 ml-2">{currentYear}</span>
                    </h2>
                </div>
                
                <div className="ml-auto flex items-center gap-4">
                    <select 
                        value={currentYear} 
                        onChange={handleYearChange}
                        className="bg-black border border-white/20 text-white text-sm p-2 rounded-md outline-none focus:border-gold"
                    >
                        {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 flex flex-col min-h-0">
                {/* Days Header */}
                <div className="grid grid-cols-7 border-b border-white/10">
                    {daysOfWeek.map(day => (
                        <div key={day} className="py-3 text-center text-xs font-sora font-semibold text-gray-500 uppercase tracking-widest border-r border-white/5 last:border-r-0">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="flex-1 grid grid-cols-7 grid-rows-5">
                    {days.slice(0, 35).map((d, idx) => {
                        const isToday = d.type === 'current' && d.dateObj && 
                                        d.dateObj.getDate() === new Date().getDate() && 
                                        d.dateObj.getMonth() === new Date().getMonth() && 
                                        d.dateObj.getFullYear() === new Date().getFullYear();
                        
                        const events = d.type === 'current' && d.dateObj ? getEventsForDate(d.dateObj) : [];

                        return (
                            <div 
                                key={idx} 
                                className={`
                                    relative border-b border-r border-white/5 last:border-r-0 p-2 group transition-colors hover:bg-white/5
                                    ${d.type !== 'current' ? 'bg-white/[0.02] text-white/20' : 'text-white'}
                                `}
                            >
                                <div className="flex justify-center mb-1">
                                    <span className={`
                                        text-xs font-inter font-medium w-7 h-7 flex items-center justify-center rounded-full
                                        ${isToday ? 'bg-gold text-black font-bold' : ''}
                                    `}>
                                        {d.day}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    {events.map(evt => (
                                        <button 
                                            key={evt.id}
                                            onClick={() => setSelectedEventId(evt.id)}
                                            className={`
                                                w-full text-left px-2 py-1 rounded text-[10px] font-bold truncate transition-all hover:scale-105
                                                ${evt.type.includes('Private') || evt.type.includes('Invite') 
                                                    ? 'bg-web3purple text-white' 
                                                    : evt.type.includes('Panel') || evt.type.includes('Keynote')
                                                        ? 'bg-gold text-black'
                                                        : 'bg-gray-800 text-gray-200'
                                                }
                                            `}
                                        >
                                            {evt.time.split(' ')[0]} {evt.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Event Detail Modal Overlay */}
            {selectedEvent && (
                <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#0A0A0A] border border-gold/30 p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(0,0,0,1)] animate-in zoom-in duration-300">
                        <button 
                            onClick={() => setSelectedEventId(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gold flex items-center justify-center text-black font-bold text-xl rounded-lg">
                                {selectedEvent.date.day}
                            </div>
                            <div>
                                <span className="text-gold text-xs font-bold uppercase tracking-widest">{selectedEvent.date.month} {selectedEvent.date.year}</span>
                                <h3 className="text-white font-sora font-bold text-xl leading-none">{selectedEvent.title}</h3>
                            </div>
                        </div>

                        <div className="space-y-4 border-t border-white/10 pt-6">
                             <div className="flex items-center gap-3 text-gray-300">
                                <Clock size={16} className="text-gold" />
                                <span className="text-sm">{selectedEvent.time}</span>
                             </div>
                             <div className="flex items-center gap-3 text-gray-300">
                                <MapPin size={16} className="text-gold" />
                                <span className="text-sm">{selectedEvent.location}</span>
                             </div>
                             <div className="flex items-center gap-3 text-gray-300">
                                <Ticket size={16} className="text-gold" />
                                <span className="text-sm">{selectedEvent.type}</span>
                             </div>
                             <div className="bg-white/5 p-4 rounded text-sm text-gray-400 font-inter leading-relaxed">
                                {selectedEvent.desc}
                             </div>
                             <div className="pt-2">
                                <span className={`
                                    inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded
                                    ${selectedEvent.status === 'Confirmed' ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-gray-800 text-gray-400 border border-gray-700'}
                                `}>
                                    Status: {selectedEvent.status}
                                </span>
                             </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Events: React.FC = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<MasonryItem[]>([]);
  const [galleryTitle, setGalleryTitle] = useState("");

  // Open Masonry Gallery
  const handleOpenGallery = (images: string[], title?: string) => {
      // Safety check: Prevent infinite loops or errors if images is undefined/empty
      if (!images || images.length === 0) return;

      // Update the gallery title
      setGalleryTitle(title || "EVENT GALLERY");

      // MIXING LOGIC:
      // To make the grid interesting, we mix the specific event images with random "related" images
      // from other sets to create a full feel, but keep the specific ones first.
      
      // 1. Start with the specific event images
      let mixedImages = [...images];
      
      // 2. Collect all other available images
      const allOtherImages = Object.values(EVENT_IMAGES).flat().filter(img => !images.includes(img));
      
      // 3. Shuffle other images
      const shuffledOthers = allOtherImages.sort(() => 0.5 - Math.random());
      
      // 4. Fill up to 15 items
      while (mixedImages.length < 15 && shuffledOthers.length > 0) {
        mixedImages.push(shuffledOthers.pop()!);
      }
      
      // If we still don't have enough (rare case), duplicate existing
      while (mixedImages.length < 12) {
         mixedImages = [...mixedImages, ...images];
      }
      
      // 5. Trim to max 15
      mixedImages = mixedImages.slice(0, 15);

      // Map to MasonryItem with random heights
      const items: MasonryItem[] = mixedImages.map((img, idx) => ({
          id: idx,
          img: img,
          // Random height between 300 and 600 for variety
          height: Math.floor(Math.random() * (600 - 300 + 1) + 300)
      }));

      setGalleryImages(items);
      setIsGalleryOpen(true);
  };

  // Lock scroll when gallery is open
  useEffect(() => {
    if (isGalleryOpen || isCalendarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isGalleryOpen, isCalendarOpen]);

  // Load Twitter Widgets JS when component mounts to ensure videos render
  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
      
      script.onload = () => {
        if (window.twttr) {
           window.twttr.widgets.load(document.getElementById('events'));
        }
      };
    } else {
       // Re-scan if already loaded
       window.twttr.widgets.load(document.getElementById('events'));
    }
  }, []);

  return (
    <Section id="events" className="bg-black border-t border-white/5 relative">
      <Reveal threshold={0.3}>
          {(isVisible) => (
             <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 transition-all duration-[1500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div>
                   <span className="text-gold font-sora text-xs font-bold uppercase tracking-[0.3em] mb-4 block">On Tour</span>
                   <h2 className="text-4xl md:text-5xl font-sora font-extrabold text-white uppercase">
                     UPCOMING <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">EVENTS</span>
                   </h2>
                </div>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <p className="text-gray-400 max-w-sm text-right font-inter text-sm md:text-left">
                      Catch Ola live. Keynotes, panels, and exclusive Cabal dinners.
                    </p>
                    <button 
                        onClick={() => setIsCalendarOpen(true)}
                        className="px-6 py-3 border border-gold/30 text-gold font-sora font-bold text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-2"
                    >
                        <Calendar size={16} /> View Schedule
                    </button>
                </div>
             </div>
          )}
      </Reveal>

      {/* Main Grid Layout - 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-fr gap-6 h-auto md:h-[1000px] px-4">
        
        {/* Row 1 & 2 Left: Video 1 (2x2) */}
        <Reveal threshold={0.1} className="md:col-span-2 md:row-span-2">
            {(isVisible) => (
                <div className={`flex items-center justify-center relative group h-full transition-all duration-[1500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <EventCard 
                        videoSrc="https://twitter.com/thegreatola/status/1985334750241059131"
                        className="h-full"
                    />
                </div>
            )}
        </Reveal>

        {/* Row 1 Right: 2 Images */}
        <Reveal threshold={0.1} className="md:col-span-1 md:row-span-1">
             {(isVisible) => (
                <div className={`h-full transition-all duration-[1500ms] delay-100 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <EventCard 
                        images={EVENT_IMAGES.networkingNight}
                        title="Networking Night"
                        location="New York"
                        date="OCT 2025"
                        onClick={() => handleOpenGallery(EVENT_IMAGES.networkingNight, "NETWORKING NIGHT")}
                    />
                </div>
             )}
        </Reveal>
        <Reveal threshold={0.1} className="md:col-span-1 md:row-span-1">
             {(isVisible) => (
                <div className={`h-full transition-all duration-[1500ms] delay-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <EventCard 
                        images={EVENT_IMAGES.panelTalk}
                        title="Panel Talk"
                        location="Dubai"
                        date="NOV 2025"
                        onClick={() => handleOpenGallery(EVENT_IMAGES.panelTalk, "PANEL TALK")}
                    />
                </div>
             )}
        </Reveal>

        {/* Row 2 Right: 2 Images */}
        <Reveal threshold={0.1} className="md:col-span-1 md:row-span-1">
             {(isVisible) => (
                <div className={`h-full transition-all duration-[1500ms] delay-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <EventCard 
                        images={EVENT_IMAGES.communityMeet}
                        title="Community Meet"
                        location="London"
                        date="DEC 2025"
                        onClick={() => handleOpenGallery(EVENT_IMAGES.communityMeet, "COMMUNITY MEET")}
                    />
                </div>
             )}
        </Reveal>
        <Reveal threshold={0.1} className="md:col-span-1 md:row-span-1">
             {(isVisible) => (
                <div className={`h-full transition-all duration-[1500ms] delay-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <EventCard 
                        images={EVENT_IMAGES.cabalDinner}
                        title="Cabal Dinner"
                        location="Paris"
                        date="JAN 2026"
                        onClick={() => handleOpenGallery(EVENT_IMAGES.cabalDinner, "CABAL DINNER")}
                    />
                </div>
             )}
        </Reveal>

        {/* Row 3 Left: 2 Images + 1 Wide */}
        <Reveal threshold={0.1} className="md:col-span-1 md:row-span-1">
            {(isVisible) => (
                <div className={`h-full transition-all duration-[1500ms] delay-[350ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <EventCard 
                        images={EVENT_IMAGES.techTalk}
                        title="Tech Talk"
                        location="Berlin"
                        date="FEB 2026"
                        onClick={() => handleOpenGallery(EVENT_IMAGES.techTalk, "TECH TALK")}
                    />
                </div>
            )}
        </Reveal>
        <Reveal threshold={0.1} className="md:col-span-1 md:row-span-1">
            {(isVisible) => (
                <div className={`h-full transition-all duration-[1500ms] delay-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <EventCard 
                        images={EVENT_IMAGES.workshop}
                        title="Workshop"
                        location="Tokyo"
                        date="MAR 2026"
                        onClick={() => handleOpenGallery(EVENT_IMAGES.workshop, "WORKSHOP")}
                    />
                </div>
            )}
        </Reveal>

        {/* Row 3 & 4 Right: Video 2 (2x2) */}
        <Reveal threshold={0.1} className="md:col-span-2 md:row-span-2">
            {(isVisible) => (
                <div className={`flex items-center justify-center relative group h-full transition-all duration-[1500ms] delay-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <EventCard 
                        videoSrc="https://twitter.com/thegreatola/status/1973825506501144738"
                        className="h-full"
                    />
                </div>
            )}
        </Reveal>

        {/* Row 4 Left: Wide Image */}
        <Reveal threshold={0.1} className="md:col-span-2 md:row-span-1">
            {(isVisible) => (
                <div className={`h-full transition-all duration-[1500ms] delay-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <EventCard 
                        images={EVENT_IMAGES.afterParty}
                        title="After Party"
                        location="Miami"
                        date="APR 2026"
                        className="h-full"
                        onClick={() => handleOpenGallery(EVENT_IMAGES.afterParty, "AFTER PARTY")}
                    />
                </div>
            )}
        </Reveal>

      </div>

      {/* Calendar Modal */}
      {isCalendarOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                onClick={() => setIsCalendarOpen(false)}
            ></div>
            
            <div className="relative w-full max-w-5xl h-[85vh] bg-[#0A0A0A] border border-gold/20 shadow-[0_0_100px_rgba(212,175,55,0.15)] flex flex-col animate-in zoom-in-95 duration-300">
                <CalendarView onClose={() => setIsCalendarOpen(false)} />
                
                {/* Footer Sync */}
                <div className="h-12 bg-black border-t border-white/10 flex items-center justify-between px-6">
                    <span className="text-xs text-gray-500 font-inter">Time Zone: GMT+1 (London)</span>
                    <button className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">
                        <Calendar size={12} /> Sync to Calendar
                    </button>
                </div>
            </div>
        </div>,
        document.body
      )}

      {/* === EVENT GALLERY MODAL === */}
      {isGalleryOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-500">
          <button 
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-28 right-8 z-50 p-2 bg-black/50 hover:bg-white text-white hover:text-black border border-white/20 rounded-full transition-all duration-300"
          >
            <X size={24} />
          </button>

          <div className="w-full h-full pt-32 pb-12 px-4 md:px-12 overflow-hidden flex flex-col">
             <div className="text-center mb-8 animate-in slide-in-from-top-10 duration-700">
                <h2 className="text-4xl font-sora font-black text-white uppercase italic">
                   {galleryTitle}
                </h2>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-2">Captured Moments</p>
             </div>
             
             <div className="flex-1 w-full max-w-[1800px] mx-auto overflow-y-auto custom-scrollbar">
                <Masonry 
                   items={galleryImages}
                   animateFrom="bottom"
                   stagger={0.05}
                   duration={0.8}
                   colorShiftOnHover={true}
                />
             </div>
          </div>
        </div>,
        document.body
      )}
    </Section>
  );
};

export default Events;
