
import React, { useState } from 'react';
import { Mail, Send, ArrowRight, Check } from 'lucide-react';
import Section from './ui/Section';

// Custom X (Twitter) Logo Component
const XIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 50 50" 
    fill="currentColor"
    className={className}
  >
    <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
  </svg>
);

const SocialLink = ({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
    <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:border-gold group-hover:text-gold group-hover:scale-110 bg-black">
      {icon}
    </div>
    <span className="font-sora text-xs text-gray-500 group-hover:text-white uppercase tracking-wider transition-colors">{label}</span>
  </a>
);

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
    }, 2000);
  };

  const fieldTransition = "transition-all duration-700 ease-out transform";
  const getFieldState = (delayClass: string) => isUnlocked 
    ? `opacity-100 translate-y-0 ${delayClass}` 
    : "opacity-0 translate-y-8 pointer-events-none";

  return (
    <footer id="contact" className="bg-black border-t border-white/10 relative overflow-hidden">
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-12deg); }
          50% { transform: translateX(150%) skewX(-12deg); }
          100% { transform: translateX(150%) skewX(-12deg); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
      
      <Section className="!py-12 md:!py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Side: Copy & Socials */}
            <div className="space-y-10">
                <div className="space-y-6">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-sora font-black text-white tracking-tighter leading-none">
                        LET'S <br/>
                        <span className="text-outline-gold">BUILD</span>
                    </h2>
                    <p className="text-gray-400 font-inter text-lg max-w-md leading-relaxed">
                        Got a high-signal project? Need strategic advising or want to book a speaking engagement? 
                        Fill out the form or hit me up on the timeline.
                    </p>
                </div>

                <div className="flex gap-8">
                    <SocialLink href="https://twitter.com/thegreatola" icon={<XIcon size={20} />} label="X / Twitter" />
                    <SocialLink href="https://t.me/olacabal" icon={<Send size={20} />} label="Telegram" />
                    <SocialLink href="mailto:contact@ola.xyz" icon={<Mail size={20} />} label="Email" />
                </div>
            </div>

            {/* Right Side: THE BLACK BOX */}
            <div className="w-full relative min-h-[500px] flex items-center justify-center p-4">
                 
                 {/* 
                    Wrapper div acts as the anchor for positioning.
                    It handles the sizing transition of the whole interactive area.
                 */}
                 <div 
                    className={`
                        relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center
                        ${isUnlocked ? 'w-full h-full' : 'w-64 h-24 cursor-pointer hover:scale-105'}
                    `}
                    onClick={() => !isUnlocked && setIsUnlocked(true)}
                 >
                     {/* The Box (Background & Overflow Hidden) */}
                     <div 
                        className={`
                           relative bg-black border border-gold overflow-hidden flex flex-col justify-center
                           transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                           ${isUnlocked 
                              ? 'w-full min-h-[500px] shadow-[0_0_50px_rgba(212,175,55,0.15)] cursor-default' 
                              : 'w-64 h-24 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]'
                           }
                        `}
                     >
                        {/* Border Sparkle/Shine */}
                        <div className="absolute inset-0 pointer-events-none z-10">
                            <div className="absolute top-0 bottom-0 left-0 w-full opacity-40 animate-shimmer bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                        </div>
                        
                        {/* === STATE 1: LOCKED === */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 z-20 ${isUnlocked ? 'opacity-0 scale-150 pointer-events-none' : 'opacity-100 scale-100'}`}>
                           <span className="font-sora font-semibold text-white tracking-widest text-sm select-none uppercase z-10 relative">
                             click to contact
                           </span>
                        </div>

                        {/* === STATE 2: UNLOCKED FORM === */}
                        <div className={`w-full relative z-30 px-6 py-8 md:p-12 transition-all duration-700 ${isUnlocked ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
                            {formState === 'success' ? (
                                <div className="flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in zoom-in duration-500">
                                    <div className="w-20 h-20 rounded-full border border-gold flex items-center justify-center text-gold shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                                        <Check size={40} />
                                    </div>
                                    <h3 className="font-sora font-bold text-2xl text-white">Message Sent</h3>
                                    <p className="font-inter text-gray-400">I'll be in touch shortly.</p>
                                    <button onClick={() => setFormState('idle')} className="text-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors border-b border-gold/50 hover:border-white pb-1">Send Another</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-2">
                                        <h3 className="text-gold font-sora font-bold uppercase tracking-widest text-sm">Contact Uplink</h3>
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse delay-75"></div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse delay-150"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className={`${fieldTransition} ${getFieldState('delay-[300ms]')}`}>
                                            <input 
                                                required
                                                type="text" 
                                                placeholder="Name" 
                                                className="w-full bg-black border border-gold/30 p-4 text-white font-inter placeholder:text-white/40 focus:border-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div className={`${fieldTransition} ${getFieldState('delay-[400ms]')}`}>
                                            <input 
                                                required
                                                type="email" 
                                                placeholder="Email" 
                                                className="w-full bg-black border border-gold/30 p-4 text-white font-inter placeholder:text-white/40 focus:border-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div className={`${fieldTransition} ${getFieldState('delay-[500ms]')}`}>
                                            <textarea 
                                                required
                                                rows={4}
                                                placeholder="Message" 
                                                className="w-full bg-black border border-gold/30 p-4 text-white font-inter placeholder:text-white/40 focus:border-gold focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] focus:outline-none transition-all resize-none"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className={`${fieldTransition} ${getFieldState('delay-[600ms]')}`}>
                                        <button 
                                            type="submit"
                                            disabled={formState === 'submitting'}
                                            className="w-full border border-gold text-gold font-sora font-bold uppercase tracking-widest py-4 hover:bg-gold hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {formState === 'submitting' ? 'Sending...' : 'Send to Ola'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                     </div>

                     {/* Mascot Image - Placed OUTSIDE the overflow-hidden box but inside the wrapper */}
                     <div className={`absolute -bottom-8 -right-10 z-30 transition-all duration-300 ${isUnlocked ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'}`}>
                         <img 
                            src="https://res.cloudinary.com/derzqoidk/image/upload/v1764823739/G6BOErkWwAEOXUY-removebg-preview_kjlzc3.png" 
                            alt="Mascot"
                            className="w-20 animate-bounce drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                         />
                     </div>
                 </div>
            </div>
        </div>

        {/* Footer Bottom */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />
        <div className="flex flex-row justify-between items-center w-full text-[10px] md:text-xs text-gray-600 font-inter uppercase tracking-widest whitespace-nowrap gap-4">
            <p>&copy; 2025 Ola Portfolio. All Rights Reserved.</p>
            <p>Designed for Web3</p>
        </div>
      </Section>
    </footer>
  );
};

export default Contact;
