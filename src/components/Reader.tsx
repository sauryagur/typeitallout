import React from "react";

export default function Reader({ text }: { text: string }) {
  return (
    <article className="prose prose-lg max-w-none font-serif leading-relaxed bg-transparent">
      {text.split("\n").map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </article>
  );
}
