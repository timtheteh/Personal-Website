"use client";

import React, { useState, useEffect, useRef } from 'react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [goToPageValue, setGoToPageValue] = useState('');
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);
  const itemsPerPageRef = useRef<HTMLDivElement>(null);

  const itemsPerPageOptions = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 50, label: '50 / page' },
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (itemsPerPageRef.current && !itemsPerPageRef.current.contains(event.target as Node)) {
        setIsItemsPerPageOpen(false);
      }
    };

    if (isItemsPerPageOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isItemsPerPageOpen]);

  const handleItemsPerPageSelect = (value: number) => {
    onItemsPerPageChange(value);
    setIsItemsPerPageOpen(false);
    // Reset to page 1 when items per page changes
    onPageChange(1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleGoToPage = () => {
    const page = parseInt(goToPageValue);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setGoToPageValue('');
    }
  };

  const handleIncrementPage = () => {
    const currentValue = goToPageValue !== '' ? parseInt(goToPageValue) : currentPage;
    const newValue = Math.min(currentValue + 1, totalPages);
    setGoToPageValue(newValue.toString());
  };

  const handleDecrementPage = () => {
    const currentValue = goToPageValue !== '' ? parseInt(goToPageValue) : currentPage;
    const newValue = Math.max(currentValue - 1, 1);
    setGoToPageValue(newValue.toString());
  };



  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages === 0) {
      // If no items, show page 1 as disabled
      pages.push(1);
    } else if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Show first few pages
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last few pages
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show pages around current
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-lg">
      {/* Left Navigation */}
      <div className={`rounded-lg bg-[#2C2C2C] border-2 ${
        currentPage === 1 || totalPages === 0
          ? 'border-white/30'
          : 'border-white/30 hover:border-brandcolour1'
      } transition-[border-color]`}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || totalPages === 0}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-sm w-full ${
            currentPage === 1 || totalPages === 0
              ? 'text-foreground/10 opacity-50'
              : 'text-foreground'
          } transition-colors`}
          aria-label="Previous page"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Prev
        </button>
      </div>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="text-foreground/50 px-2">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-brandcolour1/20 border-2 border-brandcolour1 text-brandcolour1'
                  : 'text-foreground hover:bg-white/10 border-2 border-transparent'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Right Navigation */}
      <div className={`rounded-lg bg-[#2C2C2C] border-2 ${
        currentPage === totalPages || totalPages === 0
          ? 'border-white/30'
          : 'border-white/30 hover:border-brandcolour1'
      } transition-[border-color]`}>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-sm w-full ${
            currentPage === totalPages || totalPages === 0
              ? 'text-foreground/10 opacity-50'
              : 'text-foreground'
          } transition-colors`}
          aria-label="Next page"
        >
          Next
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Items Per Page Selector - Hidden on mobile */}
      <div className="hidden tablet:flex items-center gap-2 ml-auto">
        <div className="relative" ref={itemsPerPageRef}>
          <button
            onClick={() => setIsItemsPerPageOpen(!isItemsPerPageOpen)}
            className={`flex items-center justify-between gap-3 w-36 px-4 py-2 rounded-lg bg-[#2C2C2C] border-2 ${
              isItemsPerPageOpen
                ? 'border-brandcolour1'
                : 'border-white/30'
            } text-foreground hover:border-brandcolour1 transition-[border-color]`}
          >
            <span className="text-sm font-mono whitespace-nowrap">
              {itemsPerPageOptions.find(opt => opt.value === itemsPerPage)?.label || `${itemsPerPage} / page`}
            </span>
            <svg
              className={`w-4 h-4 flex-shrink-0 transition-transform ${isItemsPerPageOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu - Expands Upwards */}
          {isItemsPerPageOpen && (
            <div className="absolute right-0 bottom-full mb-2 w-36 rounded-lg bg-[#2C2C2C] border-2 border-white/30 p-2 z-50 animate-bounce-in">
              <div className="flex flex-col gap-1">
                {itemsPerPageOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleItemsPerPageSelect(option.value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 transition-colors text-left ${
                      itemsPerPage === option.value ? 'bg-white/10' : ''
                    }`}
                  >
                    <span className="text-sm font-mono text-foreground">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Go To Page - Hidden on mobile */}
      <div className="hidden tablet:flex items-center gap-2">
        <span className="text-foreground text-sm font-mono">Go to</span>
        <div className="flex items-center rounded-lg bg-[#2C2C2C] border-2 border-white/30 hover:border-brandcolour1 transition-[border-color]">
          {/* Decrement Button - Left */}
          <button
            onClick={handleDecrementPage}
            disabled={totalPages === 0 || (goToPageValue !== '' ? parseInt(goToPageValue) : currentPage) <= 1}
            className={`px-3 py-2 rounded-l-lg transition-colors ${
              totalPages === 0 || (goToPageValue !== '' ? parseInt(goToPageValue) : currentPage) <= 1
                ? 'text-foreground/10 opacity-50'
                : 'text-foreground hover:bg-white/10'
            }`}
            aria-label="Decrease page"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Input Field */}
          <input
            type="number"
            min="1"
            max={totalPages}
            value={goToPageValue !== '' ? goToPageValue : currentPage}
            onChange={(e) => setGoToPageValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleGoToPage();
              }
            }}
            placeholder={currentPage.toString()}
            className="w-16 px-2 py-2 bg-transparent text-foreground text-sm font-mono focus:outline-none text-center border-x border-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />

          {/* Increment Button - Right */}
          <button
            onClick={handleIncrementPage}
            disabled={totalPages === 0 || (goToPageValue !== '' ? parseInt(goToPageValue) : currentPage) >= totalPages}
            className={`px-3 py-2 rounded-r-lg transition-colors ${
              totalPages === 0 || (goToPageValue !== '' ? parseInt(goToPageValue) : currentPage) >= totalPages
                ? 'text-foreground/10 opacity-50'
                : 'text-foreground hover:bg-white/10'
            }`}
            aria-label="Increase page"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 3L6 9M3 6L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <span className="text-foreground text-sm font-mono">Page</span>
        <button
          onClick={handleGoToPage}
          className="px-4 py-2 rounded-lg bg-[#2C2C2C] border-2 border-white/30 text-foreground text-sm font-mono hover:border-brandcolour1 transition-[border-color]"
        >
          Go
        </button>
      </div>
    </div>
  );
}

