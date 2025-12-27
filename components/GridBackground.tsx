"use client";

export default function GridBackground() {
  return (
    <>
      {/* Base grid layer */}
      <div className="grid-base" aria-hidden="true" />
      {/* Animated horizontal glow wave */}
      <div className="grid-glow-horizontal" aria-hidden="true" />
      {/* Animated vertical glow wave */}
      <div className="grid-glow-vertical" aria-hidden="true" />
    </>
  );
}

