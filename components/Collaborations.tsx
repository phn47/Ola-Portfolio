
import React, { useEffect, useRef } from 'react';

const PartnerLogo: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex-shrink-0 w-64 h-full flex items-center justify-center group cursor-pointer relative px-8">
    <span className="font-sora text-2xl md:text-3xl font-black text-white/40 group-hover:text-gold transition-colors uppercase tracking-widest relative z-10 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] duration-500">{name}</span>
  </div>
);

const Collaborations: React.FC = () => {
  const partners = ["ELIXIR", "IRYS", "VARIATIONAL", "MONAD", "BLUR", "TENSOR", "MAGIC EDEN", "PHANTOM"];
  // Quadruple for safety on ultra-wide screens
  const allPartners = [...partners, ...partners, ...partners, ...partners];

  const marqueeRef = useRef<HTMLElement>(null);
  const currentTranslateY = useRef(0);

  useEffect(() => {
    let animationFrameId: number;

    const updateMarquee = () => {
      if (marqueeRef.current) {
        const scrollY = window.scrollY;
        
        // Target scroll value based on scroll position (matching Hero's relative logic)
        const targetTranslateY = -(scrollY * 0.05); 
        
        // LERP for smoothness
        currentTranslateY.current += (targetTranslateY - currentTranslateY.current) * 0.1;

        // Direct DOM update avoids React render cycle for smooth 60fps
        // marqueeRef.current.style.transform = `translateY(${currentTranslateY.current}px) rotate(2.5deg) skewX(0deg)`;
      }
      animationFrameId = requestAnimationFrame(updateMarquee);
    };

    updateMarquee();

    return () => {
       if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
        ref={marqueeRef}
        className="bg-transparent overflow-hidden relative z-10 origin-center shadow-[0_-10px_50px_rgba(0,0,0,0.6)] border-y border-gold/30 bg-[#050505] py-6 -mt-12 will-change-transform"
        style={{ 
            // Initial state
            transform: `translateY(0px) rotate(2.5deg) skewX(0deg)`,
            width: '140%', // Wider to prevent edges showing during rotation
            left: '-20%',   // Center the wider element
        }}
    >
       {/* Subtle Grid Overlay for Tech feel */}
       <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

       <div className="flex w-max animate-marquee-reverse items-center">
          {allPartners.map((partner, idx) => (
             <PartnerLogo key={`${partner}-${idx}`} name={partner} />
          ))}
       </div>
    </section>
  );
};

export default Collaborations;
