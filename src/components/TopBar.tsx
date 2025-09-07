import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { User, Settings } from "lucide-react";

export default function TopBar() {
  return (
    <header className="flex items-center justify-between py-4 px-4 border-b border-neutral-200 dark:border-neutral-800 bg-inherit">
      <div className="flex items-center gap-4">
        <a href="/" className="text-lg font-semibold">Back</a>
        <span className="hidden sm:inline text-sm font-medium">Chapter 1</span>
        <span className="hidden sm:inline text-sm font-medium">Page 1/19</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-sm">79 WPM</span>
        <span className="text-sm">92.2% ACC</span>
        <ThemeToggle />
        <User className="w-5 h-5" />
        <Settings className="w-5 h-5" />
      </div>
    </header>
  );
}
