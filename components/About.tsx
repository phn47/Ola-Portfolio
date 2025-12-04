
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import Section from './ui/Section';
import { Mic, Dumbbell, Users, Zap } from 'lucide-react';

// === REUSABLE SCROLL TRIGGER COMPONENT ===
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
          // Trigger once: Stop observing after it becomes visible
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

// Deconstructed, "Anti-Box" Trait Component with Animation Props
const Trait = ({ 
  icon, 
  title, 
  desc, 
  delay, 
  isVisible 
}: { 
  icon: React.ReactNode, 
  title: string, 
  desc: string, 
  delay: number,
  isVisible: boolean
}) => (
  <div 
    className={`group relative pl-6 py-2 transition-all duration-[1500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {/* Left Accent Line */}
    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 group-hover:bg-gold transition-colors duration-500"></div>
    <div className="absolute left-0 top-0 w-4 h-0.5 bg-gold transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    
    <div className="flex items-start gap-5">
      <div className="text-gray-500 group-hover:text-gold transition-colors duration-300 transform group-hover:-translate-y-1">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-sora font-bold text-lg mb-1 uppercase tracking-wide group-hover:text-gold transition-colors">{title}</h3>
        <p className="text-gray-500 text-sm font-inter group-hover:text-gray-300 transition-colors">{desc}</p>
      </div>
    </div>
  </div>
);

const About: React.FC = () => {
  return (
    <Section id="about" className="bg-darkbg relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-gold/5 to-transparent blur-[100px] pointer-events-none transform rotate-45 translate-x-1/3 -translate-y-1/3"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* === BEAT 1: IMAGE COLUMN === */}
        <Reveal threshold={0.2} className="relative order-2 md:order-1">
          {(isVisible) => (
            <div className={`group transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
              
              {/* The Main Shape */}
              <div className="relative z-10 w-full aspect-[4/5] [clip-path:polygon(10%_0,100%_0,100%_90%,90%_100%,0_100%,0_10%)] bg-white/5 p-2 transition-transform duration-[1500ms] hover:scale-[1.02]">
                  <div className="w-full h-full [clip-path:polygon(10%_0,100%_0,100%_90%,90%_100%,0_100%,0_10%)] overflow-hidden">
                    <img 
                      src="https://res.cloudinary.com/derzqoidk/image/upload/v1764653767/GjuwBQSXsAA1Hl2_swjily.jpg" 
                      alt="Ola Lifestyle" 
                      className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 ${isVisible ? 'scale-100' : 'scale-110'}`}
                    />
                  </div>
                  
                  {/* Animated Tech Overlay Lines */}
                  <div 
                    className={`absolute top-4 right-4 h-1 bg-gold transition-all duration-[1500ms] delay-500 ease-out`}
                    style={{ width: isVisible ? '3rem' : '0' }}
                  ></div>
                  <div 
                    className={`absolute bottom-4 left-4 h-1 bg-white transition-all duration-[1500ms] delay-700 ease-out`}
                    style={{ width: isVisible ? '3rem' : '0' }}
                  ></div>
              </div>
              
              {/* Back Shadow Shape */}
              <div className={`absolute top-4 left-4 w-full h-full border border-white/10 z-0 [clip-path:polygon(10%_0,100%_0,100%_90%,90%_100%,0_100%,0_10%)] transition-opacity duration-[1500ms] delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
              
              {/* Decorative 2025 Text */}
              <div className={`absolute -bottom-6 -right-6 z-20 transition-all duration-[1500ms] delay-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-20 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <span className="font-sora font-black text-6xl text-transparent text-outline select-none">2025</span>
              </div>
            </div>
          )}
        </Reveal>

        {/* === RIGHT COLUMN: Content Side === */}
        <div className="space-y-10 order-1 md:order-2">
          
          {/* === BEAT 2: HEADLINE === */}
          <Reveal threshold={0.5}>
            {(isVisible) => (
              <div className="relative overflow-hidden">
                <div className={`absolute -left-8 top-0 bottom-0 w-1 bg-gold/20 hidden md:block transition-all duration-[1000ms] delay-300 ${isVisible ? 'h-full opacity-100' : 'h-0 opacity-0'}`}></div>
                
                <h2 className={`text-5xl md:text-7xl font-sora font-extrabold text-white uppercase leading-[0.85] tracking-tighter transition-all duration-[1500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                  More Than <br/>
                  <span className="text-transparent bg-clip-text bg-gold-sheen italic">Just A JPEG.</span>
                </h2>
              </div>
            )}
          </Reveal>
          
          {/* === BEAT 3: TEXT PARAGRAPHS === */}
          <Reveal threshold={0.3}>
             {(isVisible) => (
                <div className="space-y-6 font-inter text-gray-300 leading-relaxed text-lg border-l border-white/10 pl-6 md:border-none md:pl-0">
                  <p className={`transition-all duration-[1500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                    Yo, I'm Ola. I don't just talk about the blockchain; I live on the block. 
                    I bring that raw, unfiltered energy to Web3. While everyone else is larping 
                    as financial advisors, I'm here building real communities and dropping alpha 
                    with a side of humor.
                  </p>
                  <p className={`transition-all duration-[1500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                    Family man first, gym rat second, degen always. Whether I'm hitting a PR 
                    on the bench or minting the next blue chip, I keep it 100.
                  </p>
                </div>
             )}
          </Reveal>

          {/* === BEAT 4: TRAIT GRID === */}
          <Reveal threshold={0.2}>
            {(isVisible) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 pt-4">
                <Trait 
                  icon={<Mic className="w-6 h-6" />} 
                  title="Rap & Culture" 
                  desc="Bars & Business."
                  isVisible={isVisible}
                  delay={100}
                />
                <Trait 
                  icon={<Dumbbell className="w-6 h-6" />} 
                  title="Gym Life" 
                  desc="Health is wealth." 
                  isVisible={isVisible}
                  delay={300}
                />
                <Trait 
                  icon={<Users className="w-6 h-6" />} 
                  title="Gang Vibe" 
                  desc="Community first." 
                  isVisible={isVisible}
                  delay={500}
                />
                <Trait 
                  icon={<Zap className="w-6 h-6" />} 
                  title="High Signal" 
                  desc="No fluff, just alpha." 
                  isVisible={isVisible}
                  delay={700}
                />
              </div>
            )}
          </Reveal>

        </div>
      </div>
    </Section>
  );
};

export default About;
