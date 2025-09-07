"use client"

import React, { useRef, useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import { books } from "@/lib/data";

export default function ReadPage({ params }: { params: { id: string } }) {
  const book = books.find(b => b.id === params.id);
  const [input, setInput] = useState("");
  const [caret, setCaret] = useState(0); // caret position
  const inputRef = useRef<HTMLDivElement>(null);
  if (!book) return <Layout><div>Not found</div></Layout>;

  // Progress calculation (simple: percent of chars typed)
  const progress = Math.min(100, Math.round((input.length / book.passage.length) * 100));

  // Helper: find previous/next word boundary
  function findPrevWordBoundary(str: string, pos: number) {
    if (pos === 0) return 0;
    let i = pos - 1;
    while (i > 0 && str[i - 1] === ' ') i--;
    while (i > 0 && str[i - 1] !== ' ') i--;
    return i;
  }
  function findNextWordBoundary(str: string, pos: number) {
    let i = pos;
    while (i < str.length && str[i] !== ' ') i++;
    while (i < str.length && str[i] === ' ') i++;
    return i;
  }

  // Handle key input
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!book) return;
    // Typing
    if (e.key.length === 1 && caret < book.passage.length && !e.ctrlKey && !e.metaKey && !e.altKey) {
      setInput(input.slice(0, caret) + e.key + input.slice(caret));
      setCaret(caret + 1);
      e.preventDefault();
    }
    // Backspace
    else if (e.key === "Backspace" && caret > 0) {
      if (e.ctrlKey) {
        // Ctrl+Backspace: delete previous word
        const prev = findPrevWordBoundary(input, caret);
        setInput(input.slice(0, prev) + input.slice(caret));
        setCaret(prev);
      } else {
        setInput(input.slice(0, caret - 1) + input.slice(caret));
        setCaret(caret - 1);
      }
      e.preventDefault();
    }
    // Left arrow
    else if (e.key === "ArrowLeft") {
      if (e.ctrlKey) {
        setCaret(findPrevWordBoundary(input, caret));
      } else {
        setCaret(Math.max(0, caret - 1));
      }
      e.preventDefault();
    }
    // Right arrow
    else if (e.key === "ArrowRight") {
      if (e.ctrlKey) {
        setCaret(findNextWordBoundary(input, caret));
      } else {
        setCaret(Math.min(input.length, caret + 1));
      }
      e.preventDefault();
    }
  }

  // Focus the div on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keep caret in bounds if input changes
  useEffect(() => {
    setCaret(c => Math.min(c, input.length));
  }, [input]);

  // Render passage as skeleton with user input overlay, with word wrapping and caret
  function renderSkeleton() {
    if (!book) return null;
    // Split passage into words and spaces, preserving newlines
    const words = book.passage.match(/[^\s\n]+|\s+|\n/g) || [];
    let charIndex = 0;
    let caretRendered = false;
    return (
      <div
        ref={inputRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="mt-8 mb-8 outline-none cursor-text min-h-[200px] font-serif text-lg leading-relaxed whitespace-pre-wrap bg-transparent"
        style={{ letterSpacing: "0.01em" }}
        aria-label="Typing area"
      >
        {words.map((word, wi) => {
          if (word === "\n") {
            return <br key={wi} />;
          }
          // Render each word or space as a span for wrapping
          const chars = word.split("");
          const wordSpans = chars.map((char, ci) => {
            let displayChar = char === " " ? "\u00A0" : char;
            const i = charIndex;
            charIndex++;
            let caretHere = i === caret && !caretRendered;
            if (caretHere) caretRendered = true;
            let content = null;
            if (i < input.length) {
              if (input[i] === char) {
                content = <span className="text-black dark:text-white bg-transparent">{displayChar}</span>;
              } else {
                content = <span className="underline decoration-red-400/60 text-red-600 dark:text-red-400 bg-transparent">{displayChar}</span>;
              }
            } else {
              content = <span className="text-neutral-400/60 dark:text-neutral-600/60">{displayChar}</span>;
            }
            return (
              <span key={ci} className="relative">
                {caretHere && (
                  <span className="absolute left-0 top-0 h-full w-0.5 bg-blue-500 animate-pulse" style={{marginLeft: -1}}></span>
                )}
                {content}
              </span>
            );
          });
          // Use inline-block for words, normal for spaces
          if (/^\s+$/.test(word)) {
            return <span key={wi}>{wordSpans}</span>;
          } else {
            return <span key={wi} className="inline-block">{wordSpans}</span>;
          }
        })}
        {/* If caret is at end, render it after all */}
        {caret === book.passage.length && (
          <span className="relative">
            <span className="absolute left-0 top-0 h-full w-0.5 bg-blue-500 animate-pulse" style={{marginLeft: -1}}></span>
          </span>
        )}
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl">
          {renderSkeleton()}
        </div>
      </div>
      <ProgressBar progress={progress} />
    </Layout>
  );
}
