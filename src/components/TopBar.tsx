"use client";

import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { User, Settings, BookOpen, BarChart2, Home } from "lucide-react";

interface TopBarProps {
  variant?: "default" | "reader";
  wpm?: number;
  accuracy?: number;
}

export default function TopBar({ variant = "default", wpm, accuracy }: TopBarProps) {
  if (variant === "reader") {
    return (
      <header className="flex items-center justify-between py-4 px-4 border-b border-neutral-200 dark:border-neutral-800 bg-inherit">
        {/* Left side: back to library */}
        <div className="flex items-center gap-4">
          <a
            href="/library"
            className="text-lg font-semibold flex items-center gap-2 hover:opacity-80 transition"
          >
            <BookOpen className="w-5 h-5" />
            Library
          </a>
        </div>

        {/* Right side: WPM/Accuracy + controls */}
        <div className="flex items-center gap-6">
          {typeof wpm === "number" && (
            <span className="text-sm font-mono">{wpm} WPM</span>
          )}
          {typeof accuracy === "number" && (
            <span className="text-sm font-mono">{accuracy.toFixed(1)}% ACC</span>
          )}
          <ThemeToggle />
          <button aria-label="User">
            <User className="w-5 h-5" />
          </button>
          <button aria-label="Settings">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>
    );
  }

  // Default (home/library/progress)
  return (
    <header className="flex items-center justify-between py-4 px-4 border-b border-neutral-200 dark:border-neutral-800 bg-inherit">
      <nav className="flex items-center gap-6">
        <a
          href="/"
          className="text-lg font-semibold flex items-center gap-2 hover:opacity-80 transition"
        >
          <Home className="w-5 h-5" />
          Home
        </a>
        <a
          href="/library"
          className="text-base font-medium flex items-center gap-2 hover:opacity-80 transition"
        >
          <BookOpen className="w-5 h-5" />
          Library
        </a>
        <a
          href="/progress"
          className="text-base font-medium flex items-center gap-2 hover:opacity-80 transition"
        >
          <BarChart2 className="w-5 h-5" />
          Progress
        </a>
      </nav>

      <div className="flex items-center gap-6">
        <ThemeToggle />
        <button aria-label="User">
          <User className="w-5 h-5" />
        </button>
        <button aria-label="Settings">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
