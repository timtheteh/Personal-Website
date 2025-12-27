"use client";

import React, { useState, useRef } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Light angle in degrees (0-360). 0° = top, 90° = right, 180° = bottom, 270° = left. Default is 315° (top-left). */
  lightAngle?: number;
  /** Border radius in pixels. Default is 24 (equivalent to rounded-3xl). */
  borderRadius?: number;
  /** Enable drag to tilt interaction. Default is true. */
  draggable?: boolean;
  /** Maximum tilt angle in degrees. Default is 15. */
  maxTilt?: number;
}

export default function Card({ 
  children, 
  className = '', 
  lightAngle = 315, 
  borderRadius = 24,
  draggable = true,
  maxTilt = 15,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Calculate the effective light angle based on tilt
  // The tilt affects the perceived light direction
  const calculateEffectiveLightAngle = (baseAngle: number, tiltX: number, tiltY: number) => {
    // tiltX: positive = tilted right, negative = tilted left
    // tiltY: positive = tilted down, negative = tilted up
    // We adjust the light angle based on how the surface is tilted
    // The light appears to shift opposite to the tilt direction
    const tiltInfluence = 3; // How much the tilt affects the light angle (degrees per degree of tilt)
    const angleShift = Math.atan2(-tiltX, -tiltY) * (180 / Math.PI);
    const tiltMagnitude = Math.sqrt(tiltX * tiltX + tiltY * tiltY);
    const effectiveShift = (tiltMagnitude / maxTilt) * tiltInfluence * 15;
    
    return (baseAngle + angleShift * (effectiveShift / 45)) % 360;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggable) return;
    setIsMouseDown(true);
    // Immediately calculate tilt on mouse down
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      const clampedX = Math.max(-1, Math.min(1, x));
      const clampedY = Math.max(-1, Math.min(1, y));
      setTilt({
        x: clampedX * maxTilt,
        y: -clampedY * maxTilt,
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggable || !cardRef.current || !isMouseDown) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate position relative to center (-1 to 1)
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    // Clamp values
    const clampedX = Math.max(-1, Math.min(1, x));
    const clampedY = Math.max(-1, Math.min(1, y));
    
    setTilt({
      x: clampedX * maxTilt,
      y: -clampedY * maxTilt, // Invert Y for natural tilt feel
    });
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setTilt({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isMouseDown) {
      setIsMouseDown(false);
      setTilt({ x: 0, y: 0 });
      setIsDragging(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!draggable || !cardRef.current || e.touches.length === 0) return;
    
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (touch.clientX - centerX) / (rect.width / 2);
    const y = (touch.clientY - centerY) / (rect.height / 2);
    const clampedX = Math.max(-1, Math.min(1, x));
    const clampedY = Math.max(-1, Math.min(1, y));
    
    setTilt({
      x: clampedX * maxTilt,
      y: -clampedY * maxTilt,
    });
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!draggable || !cardRef.current || e.touches.length === 0) return;
    
    // Prevent scrolling while interacting with the card
    e.preventDefault();
    
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (touch.clientX - centerX) / (rect.width / 2);
    const y = (touch.clientY - centerY) / (rect.height / 2);
    
    const clampedX = Math.max(-1, Math.min(1, x));
    const clampedY = Math.max(-1, Math.min(1, y));
    
    setTilt({
      x: clampedX * maxTilt,
      y: -clampedY * maxTilt,
    });
  };

  const handleTouchEnd = () => {
    setTilt({ x: 0, y: 0 });
    setIsDragging(false);
  };

  // Calculate effective light angle based on current tilt
  const effectiveLightAngle = isDragging 
    ? calculateEffectiveLightAngle(lightAngle, tilt.x, tilt.y)
    : lightAngle;

  // Convert angle to radians for calculations
  const angleRad = (effectiveLightAngle * Math.PI) / 180;
  
  // Calculate positions based on light angle
  // Light source position (where the highlight should be)
  const lightX = 50 + Math.sin(angleRad) * 50; // 0-100%
  const lightY = 50 - Math.cos(angleRad) * 50; // 0-100%
  
  // Opposite position (for secondary reflection)
  const oppositeX = 50 - Math.sin(angleRad) * 50;
  const oppositeY = 50 + Math.cos(angleRad) * 50;
  
  // Gradient direction (light flows from light source)
  const gradientAngle = effectiveLightAngle + 180;
  
  // Calculate highlight position offsets
  const highlightTop = lightY < 50 ? `${lightY - 30}%` : 'auto';
  const highlightBottom = lightY >= 50 ? `${100 - lightY - 30}%` : 'auto';
  const highlightLeft = lightX < 50 ? `${lightX - 20}%` : 'auto';
  const highlightRight = lightX >= 50 ? `${100 - lightX - 20}%` : 'auto';
  
  // Calculate secondary highlight position
  const secondaryTop = oppositeY < 50 ? `${oppositeY - 40}%` : 'auto';
  const secondaryBottom = oppositeY >= 50 ? `${100 - oppositeY - 40}%` : 'auto';
  const secondaryLeft = oppositeX < 50 ? `${oppositeX - 30}%` : 'auto';
  const secondaryRight = oppositeX >= 50 ? `${100 - oppositeX - 30}%` : 'auto';
  
  // Edge highlight shadow based on light direction
  const edgeShadowX = Math.sin(angleRad) * 2;
  const edgeShadowY = -Math.cos(angleRad) * 2;

  return (
    <div 
      className="select-none"
      style={{ perspective: '1000px', touchAction: 'none' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={cardRef}
        className={`
          relative
          bg-[#383838]/30
          backdrop-blur-md
          border border-white/20
          shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_0_80px_rgba(255,255,255,0.05)]
          overflow-hidden
          ${className}
        `}
        style={{
          borderRadius: `${borderRadius}px`,
          background: `linear-gradient(${gradientAngle}deg, rgba(56,56,56,0.12) 0%, rgba(56,56,56,0.05) 50%, rgba(56,56,56,0.1) 100%)`,
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: isDragging ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glossy sheen - top gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(${gradientAngle}deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, transparent 50%)`,
          }}
        />
        
        {/* Sharp specular highlight - intense glossy spot */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: highlightTop,
            bottom: highlightBottom,
            left: highlightLeft,
            right: highlightRight,
            width: '40%',
            height: '30%',
            background: `radial-gradient(ellipse at ${lightX}% ${lightY}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 20%, transparent 50%)`,
            filter: 'blur(1px)',
          }}
        />
        
        {/* Bubble highlight - positioned based on light angle */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: highlightTop,
            bottom: highlightBottom,
            left: highlightLeft,
            right: highlightRight,
            width: '70%',
            height: '60%',
            background: `radial-gradient(ellipse at ${lightX}% ${lightY}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 40%, transparent 70%)`,
            filter: 'blur(3px)',
          }}
        />
        
        {/* Secondary highlight - opposite side reflection */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: secondaryTop,
            bottom: secondaryBottom,
            left: secondaryLeft,
            right: secondaryRight,
            width: '60%',
            height: '50%',
            background: `radial-gradient(ellipse at ${oppositeX}% ${oppositeY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
            filter: 'blur(4px)',
          }}
        />
        
        {/* Iridescent shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: `linear-gradient(${effectiveLightAngle + 30}deg, transparent 0%, rgba(255,180,255,0.12) 25%, rgba(180,255,255,0.12) 50%, rgba(255,255,180,0.12) 75%, transparent 100%)`,
            mixBlendMode: 'overlay',
          }}
        />
        
        {/* Edge highlight - simulates light refraction on bubble edge */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: `${borderRadius}px`,
            boxShadow: `inset ${edgeShadowX}px ${edgeShadowY}px 3px rgba(255,255,255,0.5), inset ${-edgeShadowX * 0.5}px ${-edgeShadowY * 0.5}px 2px rgba(255,255,255,0.15)`,
          }}
        />
      
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

