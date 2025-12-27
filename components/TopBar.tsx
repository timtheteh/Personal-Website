export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 w-full h-14 tablet:h-16 desktop:h-16 bg-background border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
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
            className="tablet:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className="w-6 h-0.5 bg-brandcolour1"></span>
            <span className="w-6 h-0.5 bg-brandcolour1"></span>
            <span className="w-6 h-0.5 bg-brandcolour1"></span>
          </button>

          {/* Navigation Links - Tablet and Desktop Only */}
          <div className="hidden tablet:flex items-center gap-6">
            <a
              href="#about"
              className="text-foreground hover:text-brandcolour1 transition-colors"
            >
              About
            </a>
            <a
              href="#resume"
              className="text-foreground hover:text-brandcolour1 transition-colors"
            >
              Resume
            </a>
            <a
              href="#blog"
              className="text-foreground hover:text-brandcolour1 transition-colors"
            >
              Blog
            </a>
            <a
              href="#projects"
              className="text-foreground hover:text-brandcolour1 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-foreground hover:text-brandcolour1 transition-colors"
            >
              Contact
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

