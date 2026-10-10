// features/question/components/question-card.tsx
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Question } from "../types/question";

interface Props {
  question: Question;
  quizTitle: string;
  currentIndex: number;
  total: number;
  progress: number;
  selectedAnswerId?: string;
  isFirst: boolean;
  isLast: boolean;
  isSubmitting?: boolean;
  timer: ReactNode;
  onSelect: (answerId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export default function QuestionCard({
  question,
  quizTitle,
  currentIndex,
  total,
  progress,
  selectedAnswerId,
  isFirst,
  isLast,
  isSubmitting = false,
  timer,
  onSelect,
  onNext,
  onPrevious,
  onSubmit,
}: Props) {
  return (
    <div className="bg-white p-6">
      {/* Quiz title + Progress + Timer */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between font-mono text-sm text-gray-700">
            <span>{quizTitle}</span>
            <span className="text-xs text-gray-500">
              Question{" "}
              <span className="font-bold text-blue-600">{currentIndex + 1}</span>{" "}
              of {total}
            </span>
          </div>
          <div className="h-2 w-full bg-blue-100">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="h-12 w-px bg-gray-200" />
        {timer}
      </div>

      {/* Question */}
      <h2 className="mb-4 font-mono text-xl font-semibold text-blue-600">
        {question.text}
      </h2>

      {/* Answers */}
      <div className="space-y-2">
        {question.answers.map((a) => (
          <label
            key={a.id}
            className="flex cursor-pointer items-center gap-3 bg-gray-50 px-4 py-3 hover:bg-gray-100"
          >
            <input
              type="radio"
              name={question.id}
              checked={selectedAnswerId === a.id}
              onChange={() => onSelect(a.id)}
              className="accent-blue-600"
            />
            <span className="font-mono text-sm">{a.text}</span>
          </label>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          className="flex items-center justify-center gap-2 bg-gray-200 py-3 text-sm text-gray-500 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} /> Previous
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 bg-blue-600 py-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="flex items-center justify-center gap-2 bg-blue-600 py-3 text-sm text-white"
          >
            Next <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}