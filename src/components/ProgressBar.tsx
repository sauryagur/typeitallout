import React from "react";

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="fixed bottom-0 left-0 w-full h-1 bg-neutral-200 dark:bg-neutral-800">
      <div
        className="h-full bg-black dark:bg-white transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
