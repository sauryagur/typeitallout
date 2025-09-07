import { useRef, useState } from "react";

export function useTyping(target: string) {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState<number[]>([]);
  const timer = useRef<NodeJS.Timeout | null>(null);

  function onChange(val: string) {
    if (startTime === null && val.length > 0) setStartTime(Date.now());
    setInput(val);
    // WPM calculation
    if (startTime) {
      const elapsed = (Date.now() - startTime) / 1000 / 60;
      const words = val.trim().split(/\s+/).length;
      setWpm(Math.round(words / (elapsed || 1/60)));
    }
    // Accuracy calculation
    let correct = 0;
    let errArr: number[] = [];
    for (let i = 0; i < val.length; i++) {
      if (val[i] === target[i]) correct++;
      else errArr.push(i);
    }
    setAccuracy(val.length ? Math.round((correct / val.length) * 100) : 100);
    setErrors(errArr);
  }

  function reset() {
    setInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setErrors([]);
  }

  return { input, onChange, wpm, accuracy, errors, reset };
}
