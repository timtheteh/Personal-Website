"use client";

import React, { useState, useEffect } from 'react';

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  text: string;
}

const terminalCommands = [
  // { command: 'whoami', output: 'timothy' },
  // { command: 'pwd', output: '/home/timothy/projects' },
  // { command: 'ls -la', output: 'total 24\ndrwxr-xr-x  8 timothy timothy 4096 Jan 15 10:30 .\ndrwxr-xr-x  3 timothy timothy 4096 Jan 10 09:00 ..\n-rw-r--r--  1 timothy timothy 1204 Jan 15 10:30 README.md\ndrwxr-xr-x  8 timothy timothy 4096 Jan 15 09:15 personal-website' },
  { command: 'cat README.md', output: 'Welcome to my portfolio!\nI build things with code.\n\nTech Stack:\n- React/Next.js\n- TypeScript\n- Three.js\n- Tailwind CSS' },
  { command: 'git status', output: 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nnothing to commit, working tree clean' },
];

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < terminalCommands.length) {
      setIsTyping(true);
      const command = terminalCommands[lineIndex];
      let charIndex = 0;

      // Type the command
      const typeCommand = setInterval(() => {
        if (charIndex < command.command.length) {
          setCurrentLine(command.command.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeCommand);
          // Wait a bit, then show output
          setTimeout(() => {
            setLines((prev) => [...prev, { type: 'command', text: command.command }]);
            setCurrentLine('');
            
            // Show output
            setTimeout(() => {
              setLines((prev) => [...prev, { type: 'output', text: command.output }]);
              setLineIndex((prev) => prev + 1);
              setIsTyping(false);
            }, 300);
          }, 500);
        }
      }, 50);

      return () => clearInterval(typeCommand);
    }
  }, [lineIndex]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border-b border-white/10">
        {/* Window Controls */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        {/* Terminal Title */}
        <div className="flex-1 text-center">
          <span className="text-xs text-gray-400 font-mono">terminal</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-mono text-sm bg-black/60 min-h-[300px] tablet:min-h-[350px] desktop:min-h-[350px]">
        <div className="space-y-1">
          {/* Display completed lines */}
          {lines.map((line, index) => (
            <div key={index} className="flex flex-col">
              {line.type === 'command' ? (
                <div className="flex items-start gap-2">
                  <span className="text-green-400">$</span>
                  <span className="text-foreground">{line.text}</span>
                </div>
              ) : (
                <div className="text-gray-300 whitespace-pre-line ml-4">{line.text}</div>
              )}
            </div>
          ))}

          {/* Current typing line */}
          {isTyping && (
            <div className="flex items-start gap-2">
              <span className="text-green-400">$</span>
              <span className="text-foreground">
                {currentLine}
                <span className="animate-pulse text-green-400">|</span>
              </span>
            </div>
          )}

          {/* Cursor when not typing */}
          {!isTyping && lineIndex < terminalCommands.length && (
            <div className="flex items-start gap-2">
              <span className="text-green-400">$</span>
              <span className="text-foreground">
                <span className="animate-pulse text-green-400">|</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

