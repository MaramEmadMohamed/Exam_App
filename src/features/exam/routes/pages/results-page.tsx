import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import NavbarSide from "@/shared/components/navbar/navbar-side";
import type { Exam, Question, QuizResult } from "../../apis/exam.types";

interface ResultsState {
  exam: Exam;
  questions: Question[];
  answers: Record<string, string>;
  result: QuizResult;
}

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultsState | null;

  if (!state?.exam || !state.result) {
    return (
      <ResultsShell>
        <p className="text-slate-600">Results are available after you submit an exam.</p>
        <Link to="/diploma" className="mt-4 inline-block text-blue-600 hover:underline">Explore diplomas</Link>
      </ResultsShell>
    );
  }

  const analytics = state.result.analytics ?? [];
  const correct = analytics.filter((item) => item.isCorrect).length;
  const incorrect = analytics.length - correct;
  const total = Math.max(analytics.length, state.questions.length);
  const correctPercent = total ? (correct / total) * 100 : 0;
  const score = state.result.submission?.score;

  return (
    <ResultsShell>
      <nav className="mb-5 text-sm text-slate-500" aria-label="Breadcrumb">
        <Link to="/diploma" className="hover:text-blue-600">Diplomas</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{state.exam.title} Results</span>
      </nav>
      <header className="rounded-lg bg-blue-600 px-5 py-5 text-white shadow-sm">
        <Link to={`/exams/${state.exam.id}`} className="mb-3 inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white"><ArrowLeft size={16} /> Back to questions</Link>
        <h1 className="font-mono text-2xl font-bold md:text-3xl">{state.exam.title} Questions</h1>
        <div className="mt-5 flex items-center justify-between text-sm text-blue-100"><span>Question {total} of {total}</span><span>100%</span></div>
        <div className="mt-2 h-2 rounded-full bg-blue-400"><div className="h-full w-full rounded-full bg-white" /></div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <section className="rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
          <h2 className="font-mono text-lg font-bold text-slate-800">Your result</h2>
          <div className="mx-auto mt-6 h-48 w-48">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" role="img" aria-label={`${correct} correct and ${incorrect} incorrect`}>
              <circle cx="60" cy="60" r="44" fill="none" stroke="#fee2e2" strokeWidth="16" />
              <circle cx="60" cy="60" r="44" fill="none" stroke="#16a34a" strokeWidth="16" strokeDasharray={`${correctPercent * 2.7646} 276.46`} strokeLinecap="butt" />
            </svg>
          </div>
          <div className="space-y-2 text-sm">
            <p className="flex items-center justify-between"><span className="text-emerald-600">Correct</span><strong>{correct}</strong></p>
            <p className="flex items-center justify-between"><span className="text-red-600">Incorrect</span><strong>{incorrect}</strong></p>
            {typeof score === "number" && <p className="flex items-center justify-between border-t pt-2 text-slate-600"><span>Score</span><strong>{score}%</strong></p>}
          </div>
        </section>

        <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-mono text-lg font-bold text-slate-800">Question review</h2>
          <div className="mt-5 max-h-128 space-y-4 overflow-y-auto pr-1">
            {analytics.map((item, index) => (
              <article key={item.questionId} className="border-b border-slate-100 pb-4 last:border-0">
                <p className="font-semibold text-slate-800">{index + 1}. {item.questionText}</p>
                <p className={`mt-3 rounded-md p-3 text-sm ${item.isCorrect ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
                  {item.isCorrect ? "Your answer: " : "Your wrong choice: "}{item.selectedAnswer?.text ?? "Not answered"}
                </p>
                {!item.isCorrect && <p className="mt-2 rounded-md bg-emerald-50 p-3 text-sm text-emerald-800">Correct answer: {item.correctAnswer?.text ?? "Unavailable"}</p>}
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-6 flex justify-end gap-3 pb-8">
        <button type="button" onClick={() => navigate(`/exams/${state.exam.id}`)} className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"><RotateCcw size={16} /> Restart</button>
        <Link to="/diploma" className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">Explore</Link>
      </footer>
    </ResultsShell>
  );
}

function ResultsShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-screen bg-slate-50">
      <NavbarSide />
      <main className="min-w-0 flex-1 overflow-y-auto p-5 md:p-8">{children}</main>
    </section>
  );
}
