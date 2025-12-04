
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Events', href: '#events' },
  { name: 'Series', href: '#raw' },
  { name: 'Community', href: '#cabal' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Handle navbar background opacity
      setIsScrolled(scrollY > 50);

      // Guard Clause: If we are in the Hero section (top of page), clear active section.
      if (scrollY < (viewportHeight * 0.3)) {
        setActiveSection('');
        return;
      }

      // --- SCROLL SPY LOGIC ---
      // Trigger activation when the section hits the MIDDLE of the viewport (0.5)
      const scrollTrigger = scrollY + (viewportHeight * 0.5);

      let current = '';
      
      for (const link of NAV_LINKS) {
        const sectionId = link.href.substring(1); // remove '#'
        const element = document.getElementById(sectionId);
        
        if (element) {
          // FIX: Use getBoundingClientRect() to get the element's position relative to the viewport,
          // then add scrollY to get the absolute position relative to the document.
          // This fixes issues where 'offsetTop' is inaccurate because the element is inside a relative parent.
          const rect = element.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;
          const height = rect.height;
          
          // We define the active zone of a section.
          // Subtracting 100px allows the nav to highlight slightly *before* the section hits the middle line.
          const sectionTop = absoluteTop - 100;
          const sectionBottom = absoluteTop + height - 100;

          if (scrollTrigger >= sectionTop && scrollTrigger < sectionBottom) {
            current = link.href;
          }
        }
      }

      // --- BOTTOM OF PAGE OVERRIDE ---
      // Explicitly check if we have reached the bottom of the page to force 'Contact' active.
      const hasReachedBottom = (window.innerHeight + Math.ceil(window.scrollY)) >= document.body.offsetHeight - 50;
      
      if (hasReachedBottom) {
        current = '#contact';
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 80;
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const offsetPosition = absoluteTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, '#')}
          className="text-2xl font-sora font-extrabold tracking-tighter text-white group"
        >
          OLA<span className="text-gold group-hover:text-white transition-colors">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-sora uppercase tracking-wide cursor-pointer transition-all duration-300 relative
                ${activeSection === link.href 
                  ? 'text-gold font-bold' 
                  : 'text-gray-300 font-medium hover:text-white'
                }
              `}
            >
              {link.name}
              {activeSection === link.href && (
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]"></span>
              )}
            </a>
          ))}
          <a 
            href="#cabal" 
            onClick={(e) => handleNavClick(e, '#cabal')}
            className={`px-5 py-2 border text-xs font-bold font-sora uppercase transition-colors cursor-pointer
              ${activeSection === '#cabal' 
                ? 'border-gold text-gold bg-gold/10' 
                : 'border-white/20 hover:border-gold hover:text-gold'
              }
            `}
          >
            Join Community
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col gap-4 md:hidden">
           {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-lg font-sora cursor-pointer transition-colors
                ${activeSection === link.href ? 'text-gold font-bold' : 'text-gray-300 font-bold hover:text-white'}
              `}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
