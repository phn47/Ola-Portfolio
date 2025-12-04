
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Masonry.css';

// Hook to detect media queries
const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const match = () => values[queries.findIndex(q => window.matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(match);

  useEffect(() => {
    const handler = () => setValue(match);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return value;
};

// Hook to measure element size
const useMeasure = (): [React.RefObject<HTMLDivElement | null>, { width: number; height: number }] => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async (urls: string[]) => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    )
  );
};

export interface MasonryItem {
  id: string | number;
  height: number;
  img: string;
  url?: string;
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}) => {
  // Determine columns based on screen width
  const columns = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    [5, 4, 3],
    2
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  // Preload images to ensure correct layout calculations
  useEffect(() => {
    setImagesReady(false); // Reset readiness when items change to prevent layout glitches
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  // Calculate grid positions
  const grid = useMemo(() => {
    if (!width) return [];
    // Guard against empty items
    if (!items || items.length === 0) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2; // Scaling height down for better density or use actual height
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady || grid.length === 0) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h
      };

      if (!hasMounted.current) {
        // Initial Entrance Animation
        let initialX = item.x;
        let initialY = item.y;

        // Simple calculation for initial offset based on 'animateFrom'
        if (animateFrom === 'bottom') initialY += 200;
        else if (animateFrom === 'top') initialY -= 200;
        else if (animateFrom === 'left') initialX -= 200;
        else if (animateFrom === 'right') initialX += 200;
        else if (animateFrom === 'center') {
           initialX = width / 2 - item.w / 2;
           initialY = 300; // rough center
        }

        gsap.fromTo(selector, 
          {
            opacity: 0,
            x: initialX,
            y: initialY,
            width: item.w,
            height: item.h,
            filter: blurToFocus ? 'blur(10px)' : 'none'
          },
          {
            opacity: 1,
            x: item.x,
            y: item.y,
            width: item.w,
            height: item.h,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        // Re-layout Animation (resize)
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, width]);

  const handleMouseEnter = (e: React.MouseEvent, item: any) => {
    const selector = `[data-key="${item.id}"]`;
    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out',
        zIndex: 10
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent, item: any) => {
    const selector = `[data-key="${item.id}"]`;
    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        zIndex: 1
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div ref={containerRef} className="list h-full w-full">
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="item-wrapper"
          onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={e => handleMouseEnter(e, item)}
          onMouseLeave={e => handleMouseLeave(e, item)}
        >
          <div className="item-img group relative overflow-hidden">
             <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.img})` }} 
             />
             {colorShiftOnHover && (
                <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"></div>
             )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
