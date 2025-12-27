"use client";

import React from 'react';
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
  // Mobile/Tablet: most recent (highest id) first
  const mobileItems = [...items].reverse();
  
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
        <div className="flex flex-col gap-8 w-full">
          {mobileItems.map((item, index) => (
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

      {/* Horizontal Timeline (Desktop) */}
      <div className="hidden desktop:block relative py-40">
        {/* Horizontal line - centered vertically with checkpoints */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-brandcolour1" />
        
        {/* Timeline items - checkpoints all on same line */}
        <div className="flex justify-between items-center">
          {items.map((item, index) => {
            const isAbove = index % 2 === 0;
            
            return (
              <div 
                key={item.id} 
                className="relative flex items-center justify-center" 
                style={{ flex: 1 }}
              >
                {/* Checkpoint - always centered */}
                <div className="relative flex-shrink-0 z-10">
                  {/* Outer ring */}
                  <div className="w-6 h-6 rounded-full border-[3px] border-brandcolour2 bg-background flex items-center justify-center">
                    {/* Inner filled circle */}
                    <div className="w-3 h-3 rounded-full bg-brandcolour2" />
                  </div>
                </div>
                
                {/* Content - absolutely positioned above or below */}
                <div 
                  className={`absolute left-1/2 -translate-x-1/2 w-full max-w-[250px] ${
                    isAbove ? 'bottom-full mb-4' : 'top-full mt-4'
                  }`}
                >
                  <Card draggable={false} borderRadius={12} className="p-3 text-center">
                    <h3 className="text-base font-semibold text-brandcolour2">{item.title}</h3>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

