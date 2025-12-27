import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Light angle in degrees (0-360). 0° = top, 90° = right, 180° = bottom, 270° = left. Default is 315° (top-left). */
  lightAngle?: number;
  /** Border radius in pixels. Default is 24 (equivalent to rounded-3xl). */
  borderRadius?: number;
}

export default function Card({ children, className = '', lightAngle = 315, borderRadius = 24 }: CardProps) {
  // Convert angle to radians for calculations
  const angleRad = (lightAngle * Math.PI) / 180;
  
  // Calculate positions based on light angle
  // Light source position (where the highlight should be)
  const lightX = 50 + Math.sin(angleRad) * 50; // 0-100%
  const lightY = 50 - Math.cos(angleRad) * 50; // 0-100%
  
  // Opposite position (for secondary reflection)
  const oppositeX = 50 - Math.sin(angleRad) * 50;
  const oppositeY = 50 + Math.cos(angleRad) * 50;
  
  // Gradient direction (light flows from light source)
  const gradientAngle = lightAngle + 180;
  
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
          background: `linear-gradient(${lightAngle + 30}deg, transparent 0%, rgba(255,180,255,0.12) 25%, rgba(180,255,255,0.12) 50%, rgba(255,255,180,0.12) 75%, transparent 100%)`,
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
  );
}

