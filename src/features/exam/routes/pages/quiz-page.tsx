import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getApiErrorMessage } from "@/features/auth/apis/mutations/user-login";
import NavbarSide from "@/shared/components/navbar/navbar-side";
import { submitExam } from "../../apis/exam.apis";
import { useExam, useExamQuestions } from "../../apis/queries/use-exam";

export default function QuizPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { data: exam, isLoading: isExamLoading } = useExam(examId);
  const { data: questions, error, isLoading: areQuestionsLoading } = useExamQuestions(examId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [startedAt] = useState(() => new Date().toISOString());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<unknown>(null);

  if (isExamLoading || areQuestionsLoading) {
    return <QuizShell><p className="text-slate-500">Loading quiz...</p></QuizShell>;
  }

  if (error || !exam) {
    return <QuizShell><p className="text-red-500">{getApiErrorMessage(error, "Unable to load this quiz.")}</p></QuizShell>;
  }

  if (!questions?.length) {
    return <QuizShell><p className="text-slate-500">This exam has no questions yet.</p></QuizShell>;
  }

  const activeExam = exam;
  const question = questions[currentIndex];
  const selectedAnswer = answers[question.id];
  const isComplete = questions.every((item) => Boolean(answers[item.id]?.trim()));
  const progress = ((currentIndex + 1) / questions.length) * 100;

  function selectAnswer(answerId: string) {
    setAnswers((current) => ({ ...current, [question.id]: answerId }));
  }

  async function handleSubmit() {
    if (!isComplete) {
      setSubmitError(new Error("Please answer every question before submitting."));
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitExam({
        examId: activeExam.id,
        startedAt,
        answers: Object.entries(answers)
          .filter(([questionId, answerId]) => questionId.trim() && answerId.trim())
          .map(([questionId, answerId]) => ({ questionId, answerId })),
      });
      navigate(`/exams/${activeExam.id}/results`, {
        state: { exam: activeExam, questions, answers, result },
      });
    } catch (submissionError) {
      setSubmitError(submissionError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <QuizShell>
      <nav className="mb-5 text-sm text-slate-500" aria-label="Breadcrumb">
        <Link to="/diploma" className="hover:text-blue-600">Diplomas</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{activeExam.title}</span>
      </nav>
      <header className="rounded-lg bg-blue-600 px-5 py-5 text-white shadow-sm">
        <Link to="/diploma" className="mb-3 inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white"><ArrowLeft size={16} /> Back to diplomas</Link>
        <h1 className="font-mono text-2xl font-bold md:text-3xl">{activeExam.title} Questions</h1>
      </header>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between gap-4 text-sm font-semibold text-slate-600">
          <span>{activeExam.title}</span>
          <span>Question {currentIndex + 1} of {questions.length}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-blue-100">
          <div className="h-full rounded-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-8">
        <p className="font-mono text-lg font-bold leading-8 text-slate-800">{question.text}</p>
        <div className="mt-6 space-y-3">
          {(question.answers ?? []).map((answer) => {
            const answerId = answer.id;
            const isSelected = selectedAnswer === answerId;
            return (
              <label key={answerId} className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 transition ${isSelected ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}>
                <input type="radio" name={question.id} value={answerId} checked={isSelected} onChange={() => selectAnswer(answerId)} className="h-4 w-4 accent-blue-600" />
                <span className="text-slate-700">{answer.text}</span>
              </label>
            );
          })}
        </div>
        {submitError ? <p className="mt-4 text-sm text-red-500">{getApiErrorMessage(submitError, "Unable to submit the exam.")}</p> : null}
        <div className="mt-8 flex justify-between gap-3">
          <button type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => index - 1)} className="inline-flex items-center gap-2 rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={16} /> Previous</button>
          {currentIndex < questions.length - 1 ? (
            <button type="button" onClick={() => setCurrentIndex((index) => index + 1)} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">Next <ArrowRight size={16} /></button>
          ) : (
            <button type="button" disabled={isSubmitting || !isComplete} onClick={handleSubmit} className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"><CheckCircle2 size={16} /> {isSubmitting ? "Submitting..." : "Submit"}</button>
          )}
        </div>
      </section>
    </QuizShell>
  );
}

function QuizShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-screen bg-slate-50">
      <NavbarSide />
      <main className="min-w-0 flex-1 overflow-y-auto p-5 md:p-8">{children}</main>
    </section>
  );
}
