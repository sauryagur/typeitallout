"use client"

import React, { useRef, useState, useEffect } from "react";
import Layout from "@/components/Layout";
import TopBar from "@/components/TopBar";
import ProgressBar from "@/components/ProgressBar";
import { books } from "@/lib/data";

export default function ReadPage({ params }: { params: { id: string } }) {
  const book = books.find(b => b.id === params.id);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);
  if (!book) return <Layout><div>Not found</div></Layout>;

  // Progress calculation (simple: percent of chars typed)
  const progress = Math.min(100, Math.round((input.length / book.passage.length) * 100));

  // Handle key input
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!book) return;
    if (e.key.length === 1 && input.length < book.passage.length) {
      setInput(input + e.key);
      e.preventDefault();
    } else if (e.key === "Backspace" && input.length > 0) {
      setInput(input.slice(0, -1));
      e.preventDefault();
    }
  }

  // Focus the div on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Render passage as skeleton with user input overlay
  function renderSkeleton() {
    if (!book) return null;
    return (
      <div
        ref={inputRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="mt-8 mb-8 outline-none cursor-text min-h-[200px] font-serif text-lg leading-relaxed whitespace-pre-wrap bg-transparent"
        style={{ letterSpacing: "0.01em" }}
        aria-label="Typing area"
      >
        {book.passage.split("").map((char, i) => {
          let displayChar = char === " " ? "\u00A0" : char;
          if (i < input.length) {
            if (input[i] === char) {
              return <span key={i} className="text-black dark:text-white bg-transparent">{displayChar}</span>;
            } else {
              return <span key={i} className="underline decoration-red-400/60 text-red-600 dark:text-red-400 bg-transparent">{displayChar}</span>;
            }
          } else {
            return <span key={i} className="text-neutral-400/60 dark:text-neutral-600/60">{displayChar}</span>;
          }
        })}
      </div>
    );
  }

  return (
    <Layout>
      <TopBar />
      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl">
          {renderSkeleton()}
        </div>
      </div>
      <ProgressBar progress={progress} />
    </Layout>
  );
}
