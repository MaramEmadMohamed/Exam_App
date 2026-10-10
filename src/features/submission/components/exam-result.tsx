// features/submission/components/exam-result.tsx
import { Link } from "react-router";
import { FolderOpen, RotateCcw } from "lucide-react";
import type { SubmissionAnalytics, SubmissionResult } from "../types/submission";

interface Props {
  result: SubmissionResult;
  quizTitle: string;
  backTo: string;
  onRestart: () => void;
}

/* ───────── Donut ───────── */
const RADIUS = 60;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function Donut({ correct, total }: { correct: number; total: number }) {
  const ratio = total ? correct / total : 0;

  return (
    <svg viewBox="0 0 160 160" className="size-44 -rotate-90">
      {/* الغلط: دايرة كاملة حمرا تحت */}
      <circle cx="80" cy="80" r={RADIUS} fill="none" strokeWidth="24" className="stroke-red-500" />
      {/* الصح: قوس أخضر فوقها */}
      <circle
        cx="80"
        cy="80"
        r={RADIUS}
        fill="none"
        strokeWidth="24"
        strokeDasharray={`${CIRCUMFERENCE * ratio} ${CIRCUMFERENCE}`}
        className="stroke-emerald-500"
      />
    </svg>
  );
}

/* ───────── صف إجابة ───────── */
type Variant = "correct" | "wrong" | "muted";

const STYLES: Record<Variant, string> = {
  correct: "bg-emerald-50 text-emerald-700",
  wrong: "bg-red-50 text-red-700",
  muted: "bg-gray-50 text-gray-500",
};

function AnswerRow({ text, variant, filled }: { text: string; variant: Variant; filled?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 font-mono text-xs ${STYLES[variant]}`}>
      <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full border border-current">
        {filled && <span className="size-1.5 rounded-full bg-current" />}
      </span>
      {text}
    </div>
  );
}

function QuestionResult({ item }: { item: SubmissionAnalytics }) {
  return (
    <div className="space-y-2">
      <h3 className="font-mono text-sm font-bold text-blue-600">{item.questionText}</h3>

      {item.isCorrect ? (
        <AnswerRow text={item.correctAnswer?.text ?? ""} variant="correct" filled />
      ) : (
        <>
          {item.selectedAnswer ? (
            <AnswerRow text={item.selectedAnswer.text} variant="wrong" filled />
          ) : (
            <AnswerRow text="Not answered" variant="muted" />
          )}
          <AnswerRow text={item.correctAnswer?.text ?? ""} variant="correct" />
        </>
      )}
    </div>
  );
}

/* ───────── الصفحة ───────── */
export default function ExamResult({ result, quizTitle, backTo, onRestart }: Props) {
  const { submission, analytics } = result;
  const total = submission.totalQuestions;
  const correct = submission.correctAnswers;
  const incorrect = total - correct;

  return (
    <div className="bg-white p-6">
      {/* العنوان + الـ progress الكامل */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between font-mono text-sm text-gray-700">
          <span>{quizTitle}</span>
          <span className="text-xs text-gray-500">
            Question <span className="font-bold text-blue-600">{total}</span> of {total}
          </span>
        </div>
        <div className="h-2 w-full bg-blue-600" />
      </div>

      <h2 className="mb-4 font-mono text-xl font-bold text-blue-600">Results:</h2>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {/* الدايرة */}
        <div className="flex flex-col items-center justify-center gap-6 bg-blue-50 p-6">
          <Donut correct={correct} total={total} />
          <ul className="space-y-1 font-mono text-xs">
            <li className="flex items-center gap-2">
              <span className="size-3 bg-emerald-500" /> Correct: {correct}
            </li>
            <li className="flex items-center gap-2">
              <span className="size-3 bg-red-500" /> Incorrect: {incorrect}
            </li>
          </ul>
        </div>

        {/* قايمة الأسئلة */}
        <div className="max-h-[28rem] space-y-5 overflow-y-auto border border-dashed border-blue-200 p-4">
          {analytics.map((item) => (
            <QuestionResult key={item.questionId} item={item} />
          ))}
        </div>
      </div>

      {/* الأزرار */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onRestart}
          className="flex items-center justify-center gap-2 bg-gray-200 py-3 text-sm text-gray-700"
        >
          <RotateCcw size={16} /> Restart
        </button>
        <Link
          to={backTo}
          className="flex items-center justify-center gap-2 bg-blue-600 py-3 text-sm text-white"
        >
          <FolderOpen size={16} /> Explore
        </Link>
      </div>
    </div>
  );
}