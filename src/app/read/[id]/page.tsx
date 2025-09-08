"use client";

import React, { useRef, useState, useEffect, use } from "react"
import Layout from "@/components/Layout"
import ProgressBar from "@/components/ProgressBar"
import { books } from "@/lib/data"

export default function ReadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const book = books.find((b) => b.id === id)

  const [input, setInput] = useState<string>("")
  const [caret, setCaret] = useState(0)
  const inputRef = useRef<HTMLDivElement>(null)

  if (!book) return <Layout><div>Not found</div></Layout>

  // progress: percent of characters typed
  const progress = Math.min(
    100,
    Math.round((input.length / book.passage.length) * 100)
  );

  // word boundary helpers
  function findPrevWordBoundary(str: string, pos: number) {
    if (pos === 0) return 0;
    let i = pos;
    while (i > 0 && str[i - 1] === " ") i--;
    while (i > 0 && str[i - 1] !== " ") i--;
    return i;
  }
  function findNextWordBoundary(str: string, pos: number) {
    let i = pos;
    while (i < str.length && str[i] !== " ") i++;
    while (i < str.length && str[i] === " ") i++;
    return i;
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!book) return;

    // overwrite typing
    if (
      e.key.length === 1 &&
      caret < book.passage.length &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      const newInput = input.split("");
      while (newInput.length < book.passage.length) newInput.push("");
      newInput[caret] = e.key;
      setInput(newInput.join(""));
      setCaret((c) => Math.min(c + 1, book.passage.length));
      e.preventDefault();
    }

    // backspace deletes at caret-1
    else if (e.key === "Backspace" && caret > 0) {
      const newInput = input.split("");
      newInput[caret - 1] = "";
      setInput(newInput.join(""));
      setCaret((c) => Math.max(0, c - 1));
      e.preventDefault();
    }

    // left arrow / ctrl+left
    else if (e.key === "ArrowLeft") {
      if (e.ctrlKey) {
        setCaret(findPrevWordBoundary(input, caret));
      } else {
        setCaret((c) => Math.max(0, c - 1));
      }
      e.preventDefault();
    }

    // right arrow / ctrl+right
    else if (e.key === "ArrowRight") {
      if (e.ctrlKey) {
        setCaret(findNextWordBoundary(input, caret));
      } else {
        setCaret((c) => Math.min(book.passage.length, c + 1));
      }
      e.preventDefault();
    }
  }

  // autofocus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // keep caret in bounds
  useEffect(() => {
    setCaret((c) => Math.min(c, book.passage.length));
  }, [input, book?.passage.length]);

  function renderSkeleton() {
    const chars = Array.from(book.passage);
    const typed = input.split("");

    return (
      <div
        ref={inputRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="mt-8 mb-8 outline-none cursor-text min-h-[200px] font-serif text-lg leading-relaxed whitespace-pre-wrap break-words bg-transparent"
        style={{ letterSpacing: "0.01em" }}
        aria-label="Typing area"
      >
        {chars.map((char, i) => {
          const displayChar = char === " " ? "\u00A0" : char;
          const caretHere = i === caret;
          let content: React.ReactNode;

          if (typed[i]) {
            if (typed[i] === char) {
              content = (
                <span className="text-black dark:text-white bg-transparent">
                  {displayChar}
                </span>
              );
            } else {
              content = (
                <span className="underline decoration-red-400/60 text-red-600 dark:text-red-400 bg-transparent">
                  {displayChar}
                </span>
              );
            }
          } else {
            content = (
              <span className="text-neutral-400/60 dark:text-neutral-600/60">
                {displayChar}
              </span>
            );
          }

          return (
            <React.Fragment key={i}>
              {caretHere && (
                <span
                  className="w-0.5 align-middle bg-blue-500 animate-pulse"
                  style={{ height: "1em", verticalAlign: "middle" }}
                />
              )}
              {content}
            </React.Fragment>
          );
        })}

        {caret === book.passage.length && (
          <span
            className="inline-block w-0.5 align-middle bg-blue-500 animate-pulse"
            style={{ height: "1em", verticalAlign: "middle" }}
          />
        )}
      </div>
    );
  }

  return (
    <Layout topBarVariant="reader">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl">{renderSkeleton()}</div>
      </div>
      <ProgressBar progress={progress} />
    </Layout>
  );
}