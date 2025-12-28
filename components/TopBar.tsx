"use client";

import { useState, useEffect, useRef } from "react";

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Update body padding when menu opens/closes or on resize
  useEffect(() => {
    const updateBodyPadding = () => {
      if (headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        document.body.style.paddingTop = `${headerHeight}px`;
      }
    };

    // Update on mount and when menu state changes
    updateBodyPadding();

    // Also update on window resize
    window.addEventListener('resize', updateBodyPadding);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateBodyPadding);
    };
  }, [isMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Close mobile menu if open
    const wasMenuOpen = isMenuOpen;
    setIsMenuOpen(false);
    
    // Get the target element
    const targetId = href.substring(1); // Remove the '#'
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // If menu was open, wait for it to close and header height to update
      const scrollToSection = () => {
        // Get the actual top bar height dynamically
        const topBarHeight = headerRef.current?.offsetHeight || (window.innerWidth >= 768 ? 64 : 56);
        // Additional margin for spacing (24px)
        const additionalMargin = 24;
        
        // Calculate the position to scroll to
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topBarHeight - additionalMargin;
        
        // Smooth scroll to the position
        window.scrollTo({
          top: Math.max(0, offsetPosition), // Ensure we don't scroll to negative position
          behavior: 'smooth'
        });
      };

      if (wasMenuOpen) {
        // Wait for menu to close and DOM to update
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            scrollToSection();
          });
        });
      } else {
        // Menu wasn't open, scroll immediately
        scrollToSection();
      }
    }
  };

  const navigationLinks = [
    { href: "#about", label: "About" },
    { href: "#resume", label: "Resume" },
    { href: "#blog", label: "Blog" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-brandcolour1 shadow-[0_0_30px_rgba(128,255,0,0.5)]">
      <div className="w-full px-4 tablet:px-6 desktop:px-8">
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
              className="tablet:hidden flex flex-col gap-1.5 p-2 relative w-8 h-8 justify-center items-center"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <span
                className={`w-6 h-0.5 bg-brandcolour1 transition-all duration-300 ease-in-out origin-center block ${
                  isMenuOpen
                    ? "rotate-45 absolute top-1/2 -translate-y-1/2"
                    : "rotate-0"
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-brandcolour1 transition-all duration-300 ease-in-out origin-center block ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-brandcolour1 transition-all duration-300 ease-in-out origin-center block ${
                  isMenuOpen
                    ? "-rotate-45 absolute top-1/2 -translate-y-1/2"
                    : "rotate-0"
                }`}
              ></span>
            </button>

            {/* Navigation Links - Tablet and Desktop Only */}
            <div className="hidden tablet:flex items-center gap-6">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-foreground hover:text-brandcolour1 transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div ref={dropdownRef} className="tablet:hidden pb-4 animate-bounce-in">
            <div className="flex flex-col gap-1 pt-4">
              {navigationLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-foreground hover:text-brandcolour1 transition-colors py-2 cursor-pointer"
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

