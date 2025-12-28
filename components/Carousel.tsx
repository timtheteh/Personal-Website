"use client";

import React, { useRef, useState, useId, useMemo, useEffect } from 'react';

export interface CarouselItem {
  id: string;
  text: string;
  icon: React.ReactNode;
}

interface ResponsiveSize {
  mobile: number;
  tablet: number;
  desktop: number;
}

interface CarouselProps {
  items: CarouselItem[];
  /** Size of each item square in pixels - can be a number or responsive object */
  itemSize?: number | ResponsiveSize;
  /** Gap between items in pixels */
  gap?: number;
  /** Speed in pixels per second */
  speed?: number;
  /** Direction of scroll: 'left' or 'right' */
  direction?: 'left' | 'right';
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Tilt angle in degrees (positive = clockwise) */
  tilt?: number;
  className?: string;
}

export default function Carousel({
  items,
  itemSize = { mobile: 120, tablet: 160, desktop: 160 },
  gap = 24,
  speed = 100,
  direction = 'left',
  pauseOnHover = true,
  tilt = 0,
  className = '',
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentSize, setCurrentSize] = useState(
    typeof itemSize === 'number' ? itemSize : itemSize.mobile
  );
  
  // Generate unique ID for this carousel instance to avoid animation conflicts
  const uniqueId = useId().replace(/:/g, '');
  
  // Handle responsive sizing based on screen width
  useEffect(() => {
    const updateSize = () => {
      if (typeof itemSize === 'number') {
        setCurrentSize(itemSize);
        return;
      }
      
      const width = window.innerWidth;
      if (width >= 1024) {
        setCurrentSize(itemSize.desktop);
      } else if (width >= 768) {
        setCurrentSize(itemSize.tablet);
      } else {
        setCurrentSize(itemSize.mobile);
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [itemSize]);
  
  // Calculate the width of all items (one complete set)
  const singleSetWidth = items.length * (currentSize + gap);
  
  // Measure container width to determine how many duplications we need
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  // Calculate how many times we need to duplicate to fill the screen plus extra for smooth looping
  // We need at least 2 full sets, plus enough to cover the container width
  const duplicationsNeeded = useMemo(() => {
    if (containerWidth === 0 || singleSetWidth === 0) return 10; // Default high number
    const setsToFillScreen = Math.ceil(containerWidth / singleSetWidth);
    // Need at least 2 sets for seamless loop, plus enough to fill screen twice
    return Math.max(10, (setsToFillScreen + 2) * 2);
  }, [containerWidth, singleSetWidth]);
  
  // Calculate animation duration based on speed (pixels per second)
  const animationDuration = singleSetWidth / speed;

  // Duplicate items enough times to ensure seamless looping on any screen width
  const duplicatedItems = useMemo(() => {
    const result: CarouselItem[] = [];
    for (let i = 0; i < duplicationsNeeded; i++) {
      result.push(...items);
    }
    return result;
  }, [items, duplicationsNeeded]);
  
  // Generate unique keyframe names for this instance
  const animationName = `carousel-scroll-${uniqueId}`;
  
  // Generate the keyframes CSS
  const keyframesCSS = useMemo(() => {
    const startTransform = direction === 'left' ? 0 : -singleSetWidth;
    const endTransform = direction === 'left' ? -singleSetWidth : 0;
    
    return `
      @keyframes ${animationName} {
        0% {
          transform: translateX(${startTransform}px);
        }
        100% {
          transform: translateX(${endTransform}px);
        }
      }
    `;
  }, [animationName, direction, singleSetWidth]);

  // Calculate extra width needed to account for tilt angle
  // When tilted, we need the carousel to extend beyond viewport so items enter/exit smoothly
  const extraWidthPercent = useMemo(() => {
    if (tilt === 0) return 0;
    // For each degree of tilt, add roughly 3% extra width on each side
    // This accounts for the angled entry/exit points
    return Math.abs(tilt) * 3;
  }, [tilt]);
  
  // Calculate vertical padding needed for tilted content
  // When rotated, the corners extend vertically based on sin(angle) * width
  const verticalPadding = useMemo(() => {
    if (tilt === 0) return 0;
    // Approximate extra height needed: for small angles, use angle in radians * half-width estimate
    // Simplified: ~2px per degree of tilt per 100px of estimated visible width
    return Math.abs(tilt) * 15;
  }, [tilt]);

  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        paddingTop: verticalPadding > 0 ? `${verticalPadding}px` : undefined,
        paddingBottom: verticalPadding > 0 ? `${verticalPadding}px` : undefined,
      }}
    >
      <div
        className="relative"
        style={{
          transform: tilt !== 0 ? `rotate(${tilt}deg)` : undefined,
          transformOrigin: 'center center',
          width: `calc(100% + ${extraWidthPercent * 2}%)`,
          marginLeft: `-${extraWidthPercent}%`,
          marginRight: `-${extraWidthPercent}%`,
        }}
      >
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden"
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
        {/* Inject keyframes dynamically */}
        <style dangerouslySetInnerHTML={{ __html: keyframesCSS }} />

        {/* Scrolling container */}
        <div
          className="flex"
          style={{
            gap: `${gap}px`,
            animation: `${animationName} ${animationDuration}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
            width: 'fit-content',
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-white shadow-lg overflow-hidden p-3 pointer-events-none select-none"
              style={{
                width: `${currentSize}px`,
                height: `${currentSize}px`,
              }}
            >
              <div className="text-3xl tablet:text-4xl">{item.icon}</div>
              <span className="text-xs tablet:text-sm font-semibold text-black text-center leading-tight">{item.text}</span>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
