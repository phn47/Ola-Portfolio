
import React, { useEffect, useRef, useState } from "react";
import Section from "./ui/Section";
import { ArrowLeft, ArrowRight } from "lucide-react";

type GalleryCategory = "MEMES" | "LIFE" | "EVENTS";

type GalleryItem = {
  src: string;
  alt: string;
};

const galleryData: Record<GalleryCategory, GalleryItem[]> = {
  MEMES: [
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584512/GylRtqLWcAAi0mr_z1drup.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584504/G414udkWwAAIMp7_ltrczu.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584502/G61VbGbWcAANKDK_lkztoi.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584500/G45owQcXUAAnj4K_ukcaoq.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584497/G41b9QCWMAIQ5SQ_d8gpch.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584495/G32SyFbXEAAD8D__ucyvsp.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584493/G6xMtMQWYAEuZ-V_aqxsys.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584490/G6QxJhiXgAA-2xL_fya9nu.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584488/G6qhRFyXAAExsRj_ky07id.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584486/G6I9-s-XoAAbEDF_v5dvin.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584485/G6gYyPsXkAAUVWN_wex9fz.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584483/G6cAYznXkAA4vER_fkyjaf.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584481/G6BOErkWwAEOXUY_wqirli.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584478/G5yn4QHXkAAGNqp_kk79gr.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584476/G5FJzkTWIAA0oG6_kifd7p.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584474/G4sRWoDXcAA-9iI_inw238.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584471/G4l2JtMXQAAMYaD_mox5qq.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584463/G3NQnkkW4AAbHr8_qx6nm1.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584460/G3n8nWDXEAARwh5_gk4h52.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584448/G1EPzLYXMAEapOU_kydwnc.jpg", alt: "Ola Meme" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584446/G1IgkWyXoAEOZ8C_uqnpwg.jpg", alt: "Ola Meme" }
  ],
  LIFE: [
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764653767/GjuwBQSXsAA1Hl2_swjily.jpg", alt: "Ola Life" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584510/GR0Hl19WsAEAeCy_ecpwmx.jpg", alt: "Ola Life" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584508/GR0Hl2cacAQNd6o_jfpjos.jpg", alt: "Ola Life" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584505/GFPmyWhWIAA0CTG_tragfe.jpg", alt: "Ola Life" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584498/G41i2oXXgAAyhYU_pyi27o.jpg", alt: "Ola Life" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584493/G25OD6-XsAAaVM__wvwmd3.jpg", alt: "Ola Life" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584480/G5ZlfhZXMAEEmz__vdmau7.jpg", alt: "Ola Life" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584475/G4p5JWIXsAE0qU4_bvbnt1.jpg", alt: "Ola Life" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584469/G4BU9fcWgAAPpH8_rjnkqk.jpg", alt: "Ola Life" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584468/G3ziCBPXoAAeKR0_bbm2mv.jpg", alt: "Ola Life" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584466/G3SuoKuXAAAjyia_zhnay3.jpg", alt: "Ola Life" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584461/G3NPUTZWcAAJzw5_yunv8e.jpg", alt: "Ola Life" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584458/G3c1AGYXkAAyACc_ksydzw.jpg", alt: "Ola Life" }
  ],
  EVENTS: [
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584498/G41i2oXXgAAyhYU_pyi27o.jpg", alt: "Ola Events" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584464/G3r3CudWoAA0PRO_sojf7o.jpg", alt: "Ola Events" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584458/G2V6fvja4AA1eCW_w9fmzc.jpg", alt: "Ola Events" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584457/G2Wg1TbbMAAdSBG_as5m6g.jpg", alt: "Ola Events" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584455/G2VQoH1bMAU5cvP_vskk1z.jpg", alt: "Ola Events" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584454/G2V6fvuaUAAvdWb_v2k8js.jpg", alt: "Ola Events" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584448/G2Jn5cLaIAcLwlz_elwygj.jpg", alt: "Ola Events" },
    { src: "https://res.cloudinary.com/derzqoidk/image/upload/v1764584447/G2E9TxCaAAAULeS_aru1gw.jpg", alt: "Ola Events" }
  ],
};

// Helper function for style calculation
const getSlideStyle = (offset: number): React.CSSProperties => {
  switch (offset) {
      case -2: return { left: '0%', transform: 'translateY(-50%) translateX(-33%) scale(0.33)', opacity: 0.1, zIndex: 0 };
      case -1: return { left: '25%', transform: 'translateY(-50%) translateX(-66%) scale(0.66)', opacity: 0.45, zIndex: 1 };
      case 0:  return { left: '50%', transform: 'translateY(-50%) translateX(-50%) scale(1)',    opacity: 1,    zIndex: 2 };
      case 1:  return { left: '75%', transform: 'translateY(-50%) translateX(-33%) scale(0.66)', opacity: 0.45, zIndex: 1 };
      case 2:  return { left: '100%', transform: 'translateY(-50%) translateX(-66%) scale(0.33)', opacity: 0.1, zIndex: 0 };
      default: return { opacity: 0, pointerEvents: 'none', transform: 'scale(0)' };
  }
};

// Custom Nav Button Component with Unique Animation
const NavButton = ({ direction, onClick }: { direction: 'prev' | 'next', onClick: () => void }) => {
  const isNext = direction === 'next';
  const Icon = isNext ? ArrowRight : ArrowLeft;

  return (
    <button
      onClick={onClick}
      className="group relative w-16 h-16 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full transition-all duration-300 hover:scale-105"
      aria-label={isNext ? "Next image" : "Previous image"}
    >
      {/* 1. Base Ring (Faint) */}
      <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-white/0 transition-colors duration-300"></div>

      {/* 2. Animated Orbiting Ring (The "Draw" Effect) */}
      {/* We use an SVG circle with stroke-dasharray to simulate a drawing line around the button on hover */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 64 64">
        <circle
          cx="32" cy="32" r="31"
          fill="none"
          stroke="#D4AF37" // Gold
          strokeWidth="1.5"
          strokeDasharray="195" // Circumference approx 2*PI*31
          strokeDashoffset="195" // Initially hidden
          strokeLinecap="round"
          className="transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:stroke-dashoffset-0"
        />
      </svg>
      
      {/* 3. Inner Glow Pulse */}
      <div className="absolute inset-0 rounded-full bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500"></div>

      {/* 4. Teleporting Arrow Animation */}
      <div className="relative z-10 w-6 h-6 overflow-hidden">
        {/* Primary Arrow - Slides Out */}
        <div 
          className={`
            absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
            ${isNext 
               ? 'group-hover:translate-x-[150%] group-hover:opacity-0' 
               : 'group-hover:-translate-x-[150%] group-hover:opacity-0'
            }
          `}
        >
          <Icon className="text-white w-6 h-6" />
        </div>

        {/* Secondary Arrow - Slides In (Teleport) */}
        <div 
          className={`
            absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
            ${isNext 
               ? '-translate-x-[150%] group-hover:translate-x-0' 
               : 'translate-x-[150%] group-hover:translate-x-0'
            }
          `}
        >
           {/* Gold Arrow on Hover */}
          <Icon className="text-gold w-6 h-6 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
        </div>
      </div>
    </button>
  );
};

const Gallery: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [category, setCategory] = useState<GalleryCategory>("MEMES");
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const items = galleryData[category];
  const total = items.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // dùng khi click vào ảnh hai bên
  const go = (offset: number) => {
    setIndex((i) => (i + offset + total) % total);
  };

  // intersection observer cho mascot slide-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // reset index khi đổi category
  useEffect(() => {
    setIndex(0);
  }, [category]);

  const getItemAt = (offset: number) => {
    if (!total) return null;
    const i = (index + offset + total) % total;
    return items[i];
  };

  // Define the relative offsets we want to render
  const visibleOffsets = [-2, -1, 0, 1, 2];

  return (
    <div
      ref={sectionRef}
      className="relative bg-[#050509] overflow-hidden py-16"
      id="gallery"
    >
      {/* Mascot slide-in - CENTERED VERTICALLY */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 left-0 z-20 pointer-events-none hidden xl:block transition-transform duration-700 ease-in-out ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <img
          src="https://res.cloudinary.com/derzqoidk/image/upload/v1764669157/GylRtqLWcAAi0mr-removebg-preview_cxpvwp.png"
          alt="Ola Mascot"
          className="h-[350px] 2xl:h-[450px] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
        />
      </div>

      <Section className="!bg-transparent relative z-10">
        {/* Tiêu đề */}
        <div className="flex flex-col items-center md:items-start xl:pl-64 mb-10">
          <h2 className="text-4xl md:text-5xl font-sora font-extrabold text-white uppercase text-center md:text-left">
            Gallery
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/60 max-w-xl md:text-left text-center">
            Memes, events, and late–night vibes from Ola’s world.
          </p>
        </div>

        <div className="xl:ml-64">
          <div className="max-w-5xl mx-auto rounded-3xl border border-white/5 bg-gradient-to-br from-black via-[#050815] to-[#111827] shadow-[0_30px_80px_rgba(0,0,0,0.9)] px-4 py-8 md:px-10 md:py-10">
            {/* Tabs chọn category */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur">
                {(["MEMES", "LIFE", "EVENTS"] as GalleryCategory[]).map(
                  (c) => {
                    const active = c === category;
                    return (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`px-5 py-2 rounded-full text-xs md:text-sm font-sora font-semibold transition-all duration-300 flex items-center gap-2 ${
                          active
                            ? "bg-white text-black shadow-[0_0_25px_rgba(250,250,250,0.25)]"
                            : "text-white/70 hover:bg-white/10"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" />
                        {c}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* CAROUSEL */}
            <div className="relative flex justify-center items-center w-full h-[260px] md:h-[320px] mb-8 overflow-hidden perspective-[1000px]">
              <div className="relative w-full h-full">
                {visibleOffsets.map(offset => {
                   const item = getItemAt(offset);
                   if (!item) return null;
                   
                   // Use the src as key to allow stable DOM elements to animate smoothly
                   // Dynamic key based on index logic would break the transition
                   const styles = getSlideStyle(offset);
                   const isCenter = offset === 0;

                   return (
                      <div
                        key={item.src}
                        className="absolute top-1/2 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer"
                        style={{ ...styles }}
                        onClick={() => { if (!isCenter) go(offset); }}
                        role="button"
                      >
                         <div 
                           className={`
                              rounded-2xl overflow-hidden transition-all duration-500
                              ${isCenter ? 'bg-black shadow-[0_0_30px_rgba(251,191,36,0.35)] border border-yellow-400/60' : 'bg-white/5 backdrop-blur-sm'}
                           `}
                           style={{
                              // Use inline styles or classes for sizing based on offset
                              width: isCenter ? 'clamp(12rem, 40vw, 18rem)' : 'clamp(10rem, 30vw, 14rem)',
                              height: isCenter ? 'clamp(12rem, 40vw, 18rem)' : 'clamp(10rem, 30vw, 14rem)',
                           }}
                         >
                            <img
                               src={item.src}
                               alt={item.alt}
                               className={`w-full h-full object-cover transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                            />
                         </div>
                      </div>
                   );
                })}
              </div>
            </div>

            {/* Controls nút prev / next */}
            <div className="flex items-center justify-center gap-8 md:gap-12">
               <NavButton direction="prev" onClick={prev} />
               <NavButton direction="next" onClick={next} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Gallery;
