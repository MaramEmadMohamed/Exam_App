import { useState } from "react";
import type { Question } from "../../types/question";

export function useExamSession(questions: Question[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // { [questionId]: answerId }
  const [selected, setSelected] = useState<Record<string, string>>({});

  const total = questions.length;
  const current = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  const selectAnswer = (answerId: string) => {
    setSelected((prev) => ({ ...prev, [current.id]: answerId }));
  };

  const next = () => setCurrentIndex((i) => Math.min(i + 1, total - 1));
  const previous = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  return {
    current,
    currentIndex,
    total,
    isFirst,
    isLast,
    selected,
    selectedAnswerId: current ? selected[current.id] : undefined,
    selectAnswer,
    next,
    previous,
    progress: total ? ((currentIndex + 1) / total) * 100 : 0,
  };
}