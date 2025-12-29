"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { socialLinks } from "@/content/socialLinks";

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

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

  // Handle hash scrolling when arriving at home page with hash
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      // Small delay to ensure page is fully rendered
      setTimeout(() => {
        scrollToSection(hash);
      }, 100);
    }
  }, [pathname]);

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // Extract the hash from the href
    const hash = href.includes('#') ? href.split('#')[1] : '';
    
    // If we're on a different page, navigate to home first
    if (pathname !== '/') {
      router.push(href);
      // Use a longer timeout to ensure page has loaded
      setTimeout(() => {
        scrollToSection(hash);
      }, 300);
    } else {
      // We're already on home page, just scroll
      scrollToSection(hash);
    }
  };

  const navigationLinks = [
    { href: "/#about", label: "About" },
    { href: "/#resume", label: "Resume" },
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-brandcolour1 shadow-[0_0_30px_rgba(128,255,0,0.5)]">
      <div className="w-full px-4 tablet:px-6 desktop:px-8">
        <div className="h-14 tablet:h-16 desktop:h-16 flex items-center justify-between">
          {/* Brand Logo - Left Side */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              onClick={(e) => {
                // Close mobile menu if open
                setIsMenuOpen(false);
                
                if (pathname === '/') {
                  e.preventDefault();
                  // Clear any hash and scroll to top
                  window.history.replaceState(null, '', '/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  // When navigating from another page, ensure we go to home without hash
                  e.preventDefault();
                  router.push('/');
                  // Scroll to top after navigation
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'auto' });
                  }, 100);
                }
              }}
              className="text-2xl tablet:text-3xl desktop:text-3xl font-mono text-brandcolour1 hover:text-brandcolour1/80 transition-colors cursor-pointer no-underline hover:no-underline"
            >
              Timothy
            </Link>
            {/* Social Icons - Desktop/Tablet Only */}
            <div className="hidden tablet:flex items-center gap-4">
              <a 
                href={socialLinks.github}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-brandcolour1 transition-colors"
                aria-label="GitHub"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a 
                href={socialLinks.linkedin}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-brandcolour1 transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href={socialLinks.instagram}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-brandcolour1 transition-colors"
                aria-label="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
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
              {navigationLinks.map((link) => {
                // Use Link for all routes (hash links will navigate to home page with hash)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.includes('#')) {
                        handleHashLink(e, link.href);
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                    className="text-foreground hover:text-brandcolour1 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div ref={dropdownRef} className="tablet:hidden pb-4 animate-bounce-in">
            <div className="flex flex-col gap-1 pt-4">
              {navigationLinks.map((link, index) => {
                // Use Link for all routes (hash links will navigate to home page with hash)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.includes('#')) {
                        handleHashLink(e, link.href);
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                    className="text-foreground hover:text-brandcolour1 transition-colors py-2 cursor-pointer"
                  >
                    {index + 1}. {link.label.toUpperCase()}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

