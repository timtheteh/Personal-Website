"use client";

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'brandcolour1' | 'brandcolour2';
  className?: string;
  href?: string;
  showArrow?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = 'brandcolour1',
  className = '',
  href,
  showArrow = true,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-between gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95';
  
  const variantClasses = {
    brandcolour1: 'bg-[#2C2C2C] border-2 border-brandcolour1 text-brandcolour1 hover:bg-[#2C2C2C]/90 hover:text-brandcolour1',
    brandcolour2: 'bg-[#2C2C2C] border-2 border-brandcolour2 text-brandcolour2 hover:bg-[#2C2C2C]/90 hover:text-brandcolour2',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  // Arrow icon SVG (right arrow)
  const ArrowIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-200 group-hover:translate-x-1"
    >
      <path
        d="M4 4L10 8L4 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const content = (
    <>
      {children}
      {showArrow && <ArrowIcon />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${buttonClasses} group no-underline hover:no-underline`}
        onClick={onClick}
        style={{ textDecoration: 'none' }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${buttonClasses} group`}
    >
      {content}
    </button>
  );
}

