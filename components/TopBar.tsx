"use client";

import { useState } from "react";

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigationLinks = [
    { href: "#about", label: "About" },
    { href: "#resume", label: "Resume" },
    { href: "#blog", label: "Blog" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-brandcolour1 shadow-[0_0_30px_rgba(128,255,0,0.5)]">
      <div className="container mx-auto px-4">
        <div className="h-14 tablet:h-16 desktop:h-16 flex items-center justify-between">
          {/* Brand Logo - Left Side */}
          <div className="flex items-center">
            {/* Brand logo placeholder - you can add your logo here later */}
            <div className="text-xl font-bold text-foreground">
              {/* Logo will go here */}
            </div>
          </div>

          {/* Navigation - Right Side */}
          <nav className="flex items-center">
            {/* Hamburger Menu Icon - Mobile Only */}
            <button
              onClick={toggleMenu}
              className="tablet:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <span className="w-6 h-0.5 bg-brandcolour1"></span>
              <span className="w-6 h-0.5 bg-brandcolour1"></span>
              <span className="w-6 h-0.5 bg-brandcolour1"></span>
            </button>

            {/* Navigation Links - Tablet and Desktop Only */}
            <div className="hidden tablet:flex items-center gap-6">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-brandcolour1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="tablet:hidden pb-4 animate-bounce-in">
            <div className="flex flex-col gap-1 pt-4">
              {navigationLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-foreground hover:text-brandcolour1 transition-colors py-2"
                >
                  {index + 1}. {link.label.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

