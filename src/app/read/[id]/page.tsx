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

  // Handle key input (overwrite only, no insertion, passage is fixed)
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!book) return;
    // Typing (overwrite only)
    if (e.key.length === 1 && caret < book.passage.length && !e.ctrlKey && !e.metaKey && !e.altKey) {
      let newInput = input.split("");
      newInput[caret] = e.key;
      setInput(newInput.join("").slice(0, book.passage.length));
      setCaret(caret + 1);
      e.preventDefault();
    }
    // Backspace (remove previous char)
    else if (e.key === "Backspace" && caret > 0) {
      let newInput = input.split("");
      newInput.splice(caret - 1, 1);
      setInput(newInput.join("").slice(0, book.passage.length));
      setCaret(caret - 1);
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
        setCaret(Math.min(book.passage.length, caret + 1));
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

  // Render passage as a fixed skeleton, with user input overwriting, caret at current position, and natural word wrapping
  function renderSkeleton() {
    if (!book) return null;
    const chars = Array.from(book.passage);
    return (
      <div
        ref={inputRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="mt-8 mb-8 outline-none cursor-text min-h-[200px] font-serif text-lg leading-relaxed whitespace-pre-wrap bg-transparent wrap-normal"
        style={{ letterSpacing: "0.01em" }}
        aria-label="Typing area"
      >
        {chars.map((char, i) => {
          let displayChar = char === " " ? "\u00A0" : char;
          const caretHere = i === caret;
          let content = null;
          if (input[i] !== undefined) {
            if (input[i] === char) {
              content = <span className="text-black dark:text-white bg-transparent">{displayChar}</span>;
            } else {
              content = <span className="underline decoration-red-400/60 text-red-600 dark:text-red-400 bg-transparent">{displayChar}</span>;
            }
          } else {
            content = <span className="text-neutral-400/60 dark:text-neutral-600/60">{displayChar}</span>;
          }
          return (
            <React.Fragment key={i}>
              {caretHere && (
                <span className="w-0.5 align-middle bg-blue-500 animate-pulse" style={{height: '1em', verticalAlign: 'middle'}}></span>
              )}
              {content}
            </React.Fragment>
          );
        })}
        {/* If caret is at end, render it after all */}
        {caret === book.passage.length && (
          <span className="inline-block w-0.5 align-middle bg-blue-500 animate-pulse" style={{height: '1em', verticalAlign: 'middle'}}></span>
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
