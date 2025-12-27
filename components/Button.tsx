"use client";

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'brandcolour1' | 'brandcolour2';
  className?: string;
  href?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'brandcolour1',
  className = '',
  href,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95';
  
  const variantClasses = {
    brandcolour1: 'bg-brandcolour1 hover:bg-brandcolour1/90 text-[#2C2C2C]',
    brandcolour2: 'bg-brandcolour2 hover:bg-brandcolour2/90 text-[#2C2C2C]',
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
      <ArrowIcon />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${buttonClasses} group`}
        onClick={onClick}
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

