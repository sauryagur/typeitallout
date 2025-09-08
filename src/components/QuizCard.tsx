import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function QuizCard({ question, value, onChange, onNext, onSubmit, isLast }: {
  question: string;
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onSubmit: () => void;
  isLast: boolean;
}) {
  return (
    <Card className="max-w-xl mx-auto mt-12">
      <CardContent className="py-8 text-lg font-serif">{question}</CardContent>
      <CardFooter className="flex gap-4">
        <input
          className="flex-1 border rounded p-2 font-sans text-base"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Type your answer..."
        />
        {isLast ? (
          <Button onClick={onSubmit}>Submit</Button>
        ) : (
          <Button onClick={onNext}>Next</Button>
        )}
      </CardFooter>
    </Card>
  );
}
