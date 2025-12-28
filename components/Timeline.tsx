"use client";

import React, { useRef, useState, useEffect } from 'react';
import Card from './Card';

interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export default function Timeline({ items, className = '' }: TimelineProps) {
  // Sort items by ID (assuming numeric IDs)
  // Desktop: least recent (lowest id) first → most recent (highest id) last
  const desktopItems = [...items].sort((a, b) => {
    const idA = parseInt(a.id, 10);
    const idB = parseInt(b.id, 10);
    return idA - idB;
  });
  
  // Mobile/Tablet: most recent (highest id) first → least recent (lowest id) last
  const mobileItems = [...items].sort((a, b) => {
    const idA = parseInt(a.id, 10);
    const idB = parseInt(b.id, 10);
    return idB - idA;
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  
  const itemsPerRow = 4;
  const rows: TimelineItem[][] = [];
  
  for (let i = 0; i < desktopItems.length; i += itemsPerRow) {
    rows.push(desktopItems.slice(i, i + itemsPerRow));
  }
  
  const rowHeight = 300;
  const cornerRadius = 24;
  const lineWidth = 3;
  const horizontalPadding = 48;
  
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Fixed slot positions (4 slots) - percentages of content width
  const slotPercentages = [12.5, 37.5, 62.5, 87.5];
  
  // Calculate container height based on last row
  const calculateContainerHeight = () => {
    if (rows.length === 0) return 0;
    
    const lastRowIndex = rows.length - 1;
    const lastRow = rows[lastRowIndex];
    const isReversed = lastRowIndex % 2 === 1;
    
    // Check if any cards in the last row are below the timeline
    const hasCardsBelow = lastRow.some((item, itemIndexInRow) => {
      const slotIndex = isReversed 
        ? (itemsPerRow - 1 - itemIndexInRow) 
        : itemIndexInRow;
      const isAbove = slotIndex % 2 === 0;
      return !isAbove;
    });
    
    if (hasCardsBelow) {
      // If cards are below, need full row height
      return rows.length * rowHeight;
    } else {
      // If all cards are above, only need up to timeline center + padding
      const timelineCenterY = lastRowIndex * rowHeight + rowHeight / 2;
      const linePadding = 20; // Extra space for line visibility
      return timelineCenterY + linePadding;
    }
  };
  
  const containerHeight = calculateContainerHeight();
  
  // Generate the S-shape path for the timeline
  const generateSPath = () => {
    if (containerWidth === 0 || rows.length === 0) return '';
    
    const contentWidth = containerWidth - (horizontalPadding * 2);
    const leftEdge = horizontalPadding;
    const rightEdge = containerWidth - horizontalPadding;
    const pathParts: string[] = [];
    
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const isReversed = rowIndex % 2 === 1;
      const isFirstRow = rowIndex === 0;
      const isLastRow = rowIndex === rows.length - 1;
      const centerY = rowIndex * rowHeight + rowHeight / 2;
      const numItemsInRow = rows[rowIndex].length;
      
      if (!isReversed) {
        // Left to right row
        if (isFirstRow) {
          pathParts.push(`M ${leftEdge},${centerY}`);
        }
        
        // Calculate end position based on last item's slot
        let endX: number;
        if (isLastRow) {
          // Stop at the last item's position
          const lastSlotIndex = numItemsInRow - 1;
          endX = leftEdge + (slotPercentages[lastSlotIndex] / 100) * contentWidth;
        } else {
          endX = rightEdge - cornerRadius;
        }
        pathParts.push(`L ${endX},${centerY}`);
        
        // If not last row, add corner and vertical connector
        if (!isLastRow) {
          const nextCenterY = (rowIndex + 1) * rowHeight + rowHeight / 2;
          // Top-right corner (curving down)
          pathParts.push(`A ${cornerRadius},${cornerRadius} 0 0 1 ${rightEdge},${centerY + cornerRadius}`);
          // Vertical line down
          pathParts.push(`L ${rightEdge},${nextCenterY - cornerRadius}`);
          // Bottom-right corner (curving left)
          pathParts.push(`A ${cornerRadius},${cornerRadius} 0 0 1 ${rightEdge - cornerRadius},${nextCenterY}`);
        }
      } else {
        // Right to left row
        // Calculate end position based on last item's slot
        let endX: number;
        if (isLastRow) {
          // Stop at the last item's position (which is at slot itemsPerRow - numItemsInRow)
          const lastSlotIndex = itemsPerRow - numItemsInRow;
          endX = leftEdge + (slotPercentages[lastSlotIndex] / 100) * contentWidth;
        } else {
          endX = leftEdge + cornerRadius;
        }
        pathParts.push(`L ${endX},${centerY}`);
        
        // If not last row, add corner and vertical connector
        if (!isLastRow) {
          const nextCenterY = (rowIndex + 1) * rowHeight + rowHeight / 2;
          // Top-left corner (curving down)
          pathParts.push(`A ${cornerRadius},${cornerRadius} 0 0 0 ${leftEdge},${centerY + cornerRadius}`);
          // Vertical line down
          pathParts.push(`L ${leftEdge},${nextCenterY - cornerRadius}`);
          // Bottom-left corner (curving right)
          pathParts.push(`A ${cornerRadius},${cornerRadius} 0 0 0 ${leftEdge + cornerRadius},${nextCenterY}`);
        }
      }
    }
    
    return pathParts.join(' ');
  };
  
  return (
    <div className={`relative ${className}`}>
      {/* Vertical Timeline (Mobile/Tablet) - Most recent first */}
      <div className="desktop:hidden relative flex flex-col items-center">
        {/* Vertical line */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-brandcolour1"
          style={{ height: '100%' }}
        />
        
        {/* Timeline items */}
        <div className="flex flex-col gap-16 w-full">
          {mobileItems.map((item) => (
            <div key={item.id} className="relative flex flex-col items-center">
              {/* Checkpoint */}
              <div className="relative flex-shrink-0 z-10">
                {/* Outer ring */}
                <div className="w-6 h-6 rounded-full border-[3px] border-brandcolour2 bg-background flex items-center justify-center">
                  {/* Inner filled circle */}
                  <div className="w-3 h-3 rounded-full bg-brandcolour2" />
                </div>
              </div>
              
              {/* Content */}
              <div className="mt-4 px-4 w-full max-w-[300px]">
                <Card draggable={false} borderRadius={16} className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-brandcolour2">{item.title}</h3>
                  {item.description && (
                    <p className="text-foreground/70 text-sm mt-1">{item.description}</p>
                  )}
                  {item.subtitle && (
                    <span className="text-sm text-brandcolour2 font-mono mt-1 block">{item.subtitle}</span>
                  )}
                  <span className="text-sm text-brandcolour2 font-mono mt-1 block">{item.date}</span>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Desktop S-Shape Timeline */}
      <div 
        ref={containerRef} 
        className="hidden desktop:block relative"
        style={{ minHeight: containerHeight }}
      >
        {/* SVG for the S-shaped line */}
        <svg 
          className="absolute inset-0 w-full pointer-events-none overflow-visible"
          style={{ height: containerHeight }}
        >
          <path
            d={generateSPath()}
            stroke="#80FF00"
            strokeWidth={lineWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Timeline rows with items */}
        {rows.map((rowItems, rowIndex) => {
          const isReversed = rowIndex % 2 === 1;
          
          return (
            <div 
              key={rowIndex}
              className="absolute left-0 right-0"
              style={{ 
                top: rowIndex * rowHeight,
                height: rowHeight,
                paddingLeft: horizontalPadding,
                paddingRight: horizontalPadding,
              }}
            >
              {/* Items container with absolute positioning for fixed slots */}
              <div className="relative h-full">
                {rowItems.map((item, itemIndexInRow) => {
                  // Determine which slot this item goes to:
                  // - For left-to-right rows: item 0→slot 0, item 1→slot 1, etc.
                  // - For right-to-left rows: item 0→slot 3, item 1→slot 2, etc.
                  const slotIndex = isReversed 
                    ? (itemsPerRow - 1 - itemIndexInRow) 
                    : itemIndexInRow;
                  
                  // Card position based on slot index (not actual index)
                  // Slot 0: above, Slot 1: below, Slot 2: above, Slot 3: below
                  const isAbove = slotIndex % 2 === 0;
                  
                  const positionPercentage = slotPercentages[slotIndex];
                  
                  return (
                    <div 
                      key={item.id} 
                      className="absolute flex items-center justify-center"
                      style={{ 
                        left: `${positionPercentage}%`,
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {/* Checkpoint */}
                      <div className="relative flex-shrink-0 z-10">
                        <div className="w-6 h-6 rounded-full border-[3px] border-brandcolour2 bg-background flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-brandcolour2" />
                        </div>
                      </div>
                      
                      {/* Content card */}
                      <div 
                        className={`absolute left-1/2 -translate-x-1/2 w-[200px] ${
                          isAbove ? 'bottom-full mb-4' : 'top-full mt-4'
                        }`}
                      >
                        <Card draggable={false} borderRadius={12} className="p-3 text-center">
                          <h3 className="text-sm font-semibold text-brandcolour2">{item.title}</h3>
                          {item.description && (
                            <p className="text-foreground/70 text-xs mt-1">{item.description}</p>
                          )}
                          {item.subtitle && (
                            <span className="text-xs text-brandcolour2 font-mono mt-1 block">{item.subtitle}</span>
                          )}
                          <span className="text-xs text-brandcolour2 font-mono mt-1 block">{item.date}</span>
                        </Card>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
