"use client";
import React, { createContext, useContext, useState } from "react";

interface SessionState {
  wpm: number;
  accuracy: number;
  progress: number;
  setWpm: (wpm: number) => void;
  setAccuracy: (acc: number) => void;
  setProgress: (p: number) => void;
}

const SessionContext = createContext<SessionState | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [progress, setProgress] = useState(0);

  return (
    <SessionContext.Provider value={{ wpm, accuracy, progress, setWpm, setAccuracy, setProgress }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
