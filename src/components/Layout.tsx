import React from "react";
import TopBar from "./TopBar";

export default function Layout({ children, topBarVariant = "default" }: { children: React.ReactNode; topBarVariant?: "default" | "reader" }) {
  return (
    <div className="min-h-screen bg-paperwhite text-black dark:bg-night dark:text-white font-sans">
      <TopBar variant={topBarVariant} />
      <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
    </div>
  );
}
