import React from "react";

export default function TypingInput({ value, onChange, disabled }: { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  return (
    <textarea
      className="w-full mt-8 p-4 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-paper dark:focus:ring-night transition min-h-[120px]"
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      placeholder="Start typing here..."
      spellCheck={false}
      autoFocus
    />
  );
}
