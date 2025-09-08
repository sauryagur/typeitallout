import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function StatsPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="mb-8">
      <CardHeader className="font-semibold text-lg mb-2">{title}</CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
