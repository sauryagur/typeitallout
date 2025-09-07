import React from "react";
import TopBar from "./TopBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paperwhite text-black dark:bg-night dark:text-white font-sans">
      <TopBar />
      <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
    </div>
  );
}
