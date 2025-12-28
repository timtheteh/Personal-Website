"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import { projectTags } from '@/content/projects/tags';

interface Project {
  slug: string;
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  tags?: string[];
}

export default function Projects() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>('date-desc');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const filterDropdownRefDesktop = useRef<HTMLDivElement>(null);
  const filterDropdownRefMobile = useRef<HTMLDivElement>(null);
  const sortDropdownRefDesktop = useRef<HTMLDivElement>(null);
  const sortDropdownRefMobile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch projects from API route
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setAllProjects(data);
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInsideDesktop =
        filterDropdownRefDesktop.current?.contains(target);
      const isClickInsideMobile =
        filterDropdownRefMobile.current?.contains(target);

      if (!isClickInsideDesktop && !isClickInsideMobile) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInsideDesktop =
        sortDropdownRefDesktop.current?.contains(target);
      const isClickInsideMobile =
        sortDropdownRefMobile.current?.contains(target) ||
        filterDropdownRefMobile.current?.contains(target);

      if (!isClickInsideDesktop && !isClickInsideMobile) {
        setIsSortOpen(false);
      }
    };

    if (isSortOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortOpen]);

  // Get all unique tags that are actually used in projects
  const availableTags = new Set<string>();
  allProjects.forEach((project) => {
    project.tags?.forEach((tag) => availableTags.add(tag));
  });

  // Toggle tag selection
  const toggleTag = (tagSlug: string) => {
    setSelectedTags((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tagSlug)) {
        newSet.delete(tagSlug);
      } else {
        newSet.add(tagSlug);
      }
      return newSet;
    });
  };

  // Clear all selected tags
  const clearAllTags = () => {
    setSelectedTags(new Set());
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Filter and sort projects based on search query, selected tags, and sort option
  useEffect(() => {
    let filtered = allProjects;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)
      );
    }

    // Apply tag filter
    if (selectedTags.size > 0) {
      filtered = filtered.filter((project) =>
        project.tags?.some((tag) => selectedTags.has(tag))
      );
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortOption) {
      case 'alphabetical-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'alphabetical-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'date-desc':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }
    filtered = sorted;

    setProjects(filtered);
  }, [searchQuery, selectedTags, sortOption, allProjects]);

  if (loading) {
    return (
      <main className="min-h-screen px-4 tablet:px-6 desktop:px-8 py-12 tablet:py-16 desktop:py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center py-12">
            <div className="text-foreground/50">Loading projects...</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 tablet:px-6 desktop:px-8 py-12 tablet:py-16 desktop:py-20">
      <div className="max-w-[1200px] mx-auto">
        {/* Back Button */}
        <div className="mb-6 tablet:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2C2C2C] border-2 border-white/30 text-foreground hover:border-brandcolour1 transition-[border-color] no-underline hover:no-underline"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-mono">Back to Home</span>
          </Link>
        </div>
        
        {/* Header Section - Two columns on desktop/tablet, one column on mobile */}
        <div className="flex flex-col tablet:flex-row gap-8 tablet:gap-12 desktop:gap-12 mb-8 tablet:mb-12">
          {/* Column 1: Image (placeholder) - Desktop/Tablet only */}
          <div className="w-full tablet:w-[40%] hidden tablet:flex items-center justify-center">
            <div className="w-full aspect-square max-w-[400px] rounded-2xl bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center">
              <span className="text-foreground/50">Image placeholder</span>
            </div>
          </div>
          
          {/* Column 2: Card Component */}
          <div className="w-full tablet:w-[60%] flex items-center justify-center tablet:pr-8 desktop:pr-8">
            <Card className="p-8">
              <h1 className="text-5xl font-bold mb-4">Projects</h1>
              <p className="text-foreground/70">
                Explore my portfolio of projects showcasing my work in web development, design, and technology.
              </p>
            </Card>
          </div>
        </div>
        
        {/* Search, Filter, and Sort Controls */}
        <div className="mb-6 tablet:mb-8">
          {/* Desktop/Tablet: Single row */}
          <div className="hidden tablet:flex items-center gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 py-3 rounded-lg bg-[#2C2C2C] border-2 border-white/30 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-brandcolour1 transition-[border-color] ${searchQuery ? 'pr-12' : 'pr-4'}`}
              />
            </div>
            {/* Filter Button */}
            <div className="relative" ref={filterDropdownRefDesktop}>
              <button
                onClick={() => {
                  setIsFilterOpen(!isFilterOpen);
                  if (!isFilterOpen) setIsSortOpen(false);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2C2C2C] border-2 ${
                  isFilterOpen
                    ? 'border-brandcolour1'
                    : 'border-white/30'
                } text-foreground hover:border-brandcolour1 transition-[border-color]`}
              >
                Filter
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              
              {/* Filter Dropdown */}
              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 max-h-96 overflow-y-auto rounded-lg bg-[#2C2C2C] border-2 border-white/30 p-4 z-50 animate-bounce-in">
                  <div className="flex flex-col gap-2">
                    {/* Clear All Button */}
                    <button
                      onClick={clearAllTags}
                      className="w-full px-3 py-2 rounded border border-white/30 text-foreground/70 hover:bg-white/5 hover:text-foreground transition-colors text-sm font-mono mb-1"
                      disabled={selectedTags.size === 0}
                    >
                      Clear all
                    </button>
                    {Object.entries(projectTags)
                      .filter(([tagSlug]) => availableTags.has(tagSlug))
                      .map(([tagSlug, tag]) => (
                        <button
                          key={tagSlug}
                          onClick={() => toggleTag(tagSlug)}
                          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 transition-colors text-left"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTags.has(tagSlug)}
                            onChange={() => toggleTag(tagSlug)}
                            className="w-4 h-4 rounded border-white/30 bg-transparent"
                            style={{ accentColor: tag.color }}
                          />
                          <span
                            className="text-sm font-mono"
                            style={{ color: tag.color }}
                          >
                            {tag.name}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
            {/* Sort Button */}
            <div className="relative" ref={sortDropdownRefDesktop}>
              <button
                onClick={() => {
                  setIsSortOpen(!isSortOpen);
                  if (!isSortOpen) setIsFilterOpen(false);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2C2C2C] border-2 ${
                  isSortOpen ? 'border-brandcolour1' : 'border-white/30'
                } text-foreground hover:border-brandcolour1 transition-[border-color]`}
              >
                Sort
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </button>
              
              {/* Sort Dropdown */}
              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-lg bg-[#2C2C2C] border-2 border-white/30 p-4 z-50 animate-bounce-in">
                  <div className="flex flex-col gap-2">
                    {/* Alphabetically Ascending */}
                    <button
                      onClick={() => {
                        setSortOption('alphabetical-asc');
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 transition-colors text-left ${
                        sortOption === 'alphabetical-asc' ? 'bg-white/10' : ''
                      }`}
                    >
                      <span className="text-sm font-mono text-foreground">Alphabetically</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    {/* Alphabetically Descending */}
                    <button
                      onClick={() => {
                        setSortOption('alphabetical-desc');
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 transition-colors text-left ${
                        sortOption === 'alphabetical-desc' ? 'bg-white/10' : ''
                      }`}
                    >
                      <span className="text-sm font-mono text-foreground">Alphabetically</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Date Ascending */}
                    <button
                      onClick={() => {
                        setSortOption('date-asc');
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 transition-colors text-left ${
                        sortOption === 'date-asc' ? 'bg-white/10' : ''
                      }`}
                    >
                      <span className="text-sm font-mono text-foreground">Date</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    {/* Date Descending */}
                    <button
                      onClick={() => {
                        setSortOption('date-desc');
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 transition-colors text-left ${
                        sortOption === 'date-desc' ? 'bg-white/10' : ''
                      }`}
                    >
                      <span className="text-sm font-mono text-foreground">Date</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile: Two rows */}
          <div className="flex flex-col gap-4 tablet:hidden">
            {/* First row: Search Bar */}
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 py-3 rounded-lg bg-[#2C2C2C] border-2 border-white/30 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-brandcolour1 transition-[border-color] ${searchQuery ? 'pr-12' : 'pr-4'}`}
              />
            </div>
            {/* Second row: Filter and Sort Buttons */}
            <div className="flex gap-4 relative" ref={filterDropdownRefMobile}>
              <div className="flex-1">
                <button
                  onClick={() => {
                    setIsFilterOpen(!isFilterOpen);
                    if (!isFilterOpen) setIsSortOpen(false);
                  }}
                  className={`flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-[#2C2C2C] border-2 ${
                    isFilterOpen
                      ? 'border-brandcolour1'
                      : 'border-white/30'
                  } text-foreground hover:border-brandcolour1 transition-[border-color]`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter
                </button>
              </div>
              
              {/* Filter Dropdown */}
              {isFilterOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 w-full max-h-96 overflow-y-auto rounded-lg bg-[#2C2C2C] border-2 border-white/30 p-4 z-50 animate-bounce-in">
                  <div className="flex flex-col gap-2">
                    {/* Clear All Button */}
                    <button
                      onClick={clearAllTags}
                      className="w-full px-3 py-2 rounded border border-white/30 text-foreground/70 hover:bg-white/5 hover:text-foreground transition-colors text-sm font-mono mb-1"
                      disabled={selectedTags.size === 0}
                    >
                      Clear all
                    </button>
                    {Object.entries(projectTags)
                      .filter(([tagSlug]) => availableTags.has(tagSlug))
                      .map(([tagSlug, tag]) => (
                        <button
                          key={tagSlug}
                          onClick={() => toggleTag(tagSlug)}
                          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 transition-colors text-left"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTags.has(tagSlug)}
                            onChange={() => toggleTag(tagSlug)}
                            className="w-4 h-4 rounded border-white/30 bg-transparent"
                            style={{ accentColor: tag.color }}
                          />
                          <span
                            className="text-sm font-mono"
                            style={{ color: tag.color }}
                          >
                            {tag.name}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              )}
              <div className="flex-1" ref={sortDropdownRefMobile}>
                <button
                  onClick={() => {
                    setIsSortOpen(!isSortOpen);
                    if (!isSortOpen) setIsFilterOpen(false);
                  }}
                  className={`flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-[#2C2C2C] border-2 ${
                    isSortOpen ? 'border-brandcolour1' : 'border-white/30'
                  } text-foreground hover:border-brandcolour1 transition-[border-color]`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  Sort
                </button>
              </div>
              
              {/* Sort Dropdown - positioned relative to parent container */}
              {isSortOpen && (
                <div className="absolute left-0 top-full mt-2 w-full rounded-lg bg-[#2C2C2C] border-2 border-white/30 p-4 z-50 animate-bounce-in">
                    <div className="flex flex-col gap-2">
                      {/* Alphabetically Ascending */}
                      <button
                        onClick={() => {
                          setSortOption('alphabetical-asc');
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 transition-colors text-left ${
                          sortOption === 'alphabetical-asc' ? 'bg-white/10' : ''
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        <span className="text-sm font-mono text-foreground">Alphabetically</span>
                      </button>
                      {/* Alphabetically Descending */}
                      <button
                        onClick={() => {
                          setSortOption('alphabetical-desc');
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 transition-colors text-left ${
                          sortOption === 'alphabetical-desc' ? 'bg-white/10' : ''
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="text-sm font-mono text-foreground">Alphabetically</span>
                      </button>
                      {/* Date Ascending */}
                      <button
                        onClick={() => {
                          setSortOption('date-asc');
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 transition-colors text-left ${
                          sortOption === 'date-asc' ? 'bg-white/10' : ''
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        <span className="text-sm font-mono text-foreground">Date</span>
                      </button>
                      {/* Date Descending */}
                      <button
                        onClick={() => {
                          setSortOption('date-desc');
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 transition-colors text-left ${
                          sortOption === 'date-desc' ? 'bg-white/10' : ''
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="text-sm font-mono text-foreground">Date</span>
                      </button>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="flex flex-col rounded-2xl border-2 border-white/30 overflow-hidden hover:border-brandcolour1 transition-[border-color] cursor-pointer no-underline hover:no-underline text-inherit hover:text-inherit"
            >
              {/* Thumbnail */}
              <div className="w-full aspect-video bg-gradient-to-br from-brandcolour1/20 to-brandcolour2/20 flex items-center justify-center">
                <span className="text-foreground/50 text-sm">Thumbnail</span>
              </div>
              {/* Description Section */}
              <div className="p-4 flex flex-col gap-2 bg-[#2C2C2C] flex-1">
                <h2 className="text-xl font-semibold text-brandcolour2">{project.title}</h2>
                <p className="text-sm text-foreground/70">{project.description}</p>
                <span className="text-xs text-brandcolour1 font-mono mt-2">{project.date}</span>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags?.map((tagSlug) => {
                    const tag = projectTags[tagSlug];
                    if (!tag) return null;
                    return (
                      <span
                        key={tagSlug}
                        className="px-2 py-1 text-xs font-mono rounded"
                        style={{ 
                          backgroundColor: tag.color + '20',
                          color: tag.color,
                          border: `1px solid ${tag.color}40`
                        }}
                      >
                        {tag.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
