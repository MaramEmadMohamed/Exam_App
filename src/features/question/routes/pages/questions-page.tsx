// features/question/routes/pages/questions-page.tsx
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useExam } from "@/features/exam/apis/queries/use-exam";
import useDiplomaDetails from "@/features/diploma/api/qures/use-diploma-details";
import { useSubmitExam } from "@/features/submission/apis/mutations/use-submit-exam";
import ExamResult from "@/features/submission/components/exam-result";
import { useExamQuestions } from "../../apis/queries/use-questions";
import { useExamSession } from "../../apis/queries/use-exam-session";
import { useCountdown } from "../../hooks/use-countdown";
import ExamHeader from "../../components/exam-header";
import ExamTimer from "../../components/exam-timer";
import QuestionCard from "../../components/question-card";
import type { Question } from "../../types/question";

interface SessionProps {
  questions: Question[];
  examId: string;
  examTitle: string;
  diplomaTitle?: string;
  durationMinutes: number;
  backTo: string;
  onRestart: () => void;
}

function ExamSession({
  questions,
  examId,
  examTitle,
  diplomaTitle,
  durationMinutes,
  backTo,
  onRestart,
}: SessionProps) {
  const s = useExamSession(questions);
  const submittedRef = useRef(false);
  const startedAtRef = useRef("");
  const { mutate, isPending, isError, data: result } = useSubmitExam();

  const quizTitle = diplomaTitle ? `${diplomaTitle} - ${examTitle}` : examTitle;

  // وقت بداية الامتحان (جوه effect عشان الـ render يفضل pure)
  useEffect(() => {
    startedAtRef.current = new Date().toISOString();
  }, []);

  const submit = () => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    // نبعت الأسئلة اللي اتجاوبت بس
    const answers = questions
      .filter((q) => s.selected[q.id])
      .map((q) => ({ questionId: q.id, answerId: s.selected[q.id] }));

    mutate(
      { examId, answers, startedAt: startedAtRef.current },
      {
        onError: () => {
          submittedRef.current = false; // يسمح بإعادة المحاولة
        },
      },
    );
  };

  const handleSubmitClick = () => {
    const unanswered = questions.length - Object.keys(s.selected).length;
    if (
      unanswered > 0 &&
      !window.confirm(`${unanswered} question(s) unanswered. Submit anyway?`)
    )
      return;
    submit();
  };

  const { remaining, total } = useCountdown(durationMinutes * 60, submit);

  // بعد التسليم: الهيدر + صفحة النتيجة
  if (result) {
    return (
      <div>
        <ExamHeader title={examTitle} backTo={backTo} />
        <ExamResult
          result={result}
          quizTitle={quizTitle}
          backTo={backTo}
          onRestart={onRestart}
        />
      </div>
    );
  }

  return (
    <div>
      <ExamHeader title={examTitle} backTo={backTo} />

      {isError && (
        <p className="mb-2 bg-red-50 p-2 text-sm text-red-600">
          Submission failed, please try again.
        </p>
      )}

      <QuestionCard
        question={s.current}
        quizTitle={quizTitle}
        currentIndex={s.currentIndex}
        total={s.total}
        progress={s.progress}
        selectedAnswerId={s.selectedAnswerId}
        isFirst={s.isFirst}
        isLast={s.isLast}
        isSubmitting={isPending}
        onSelect={s.selectAnswer}
        onNext={s.next}
        onPrevious={s.previous}
        onSubmit={handleSubmitClick}
        timer={<ExamTimer remaining={remaining} total={total} />}
      />
    </div>
  );
}

export default function QuestionsPage() {
  const { examId } = useParams<{ examId: string }>();
  const [attempt, setAttempt] = useState(0);

  const questionsQuery = useExamQuestions(examId);
  const examQuery = useExam(examId);

  const exam = examQuery.data;
  const diplomaId = exam?.diplomaId ?? exam?.diploma?.id;
  const diplomaQuery = useDiplomaDetails(diplomaId);

  if (questionsQuery.isLoading || examQuery.isLoading) {
    return <div className="h-64 animate-pulse bg-slate-200" />;
  }
  if (questionsQuery.isError || !questionsQuery.data?.length || !exam) {
    return <p className="text-red-600">No questions found</p>;
  }

  return (
    <ExamSession
      key={attempt}
      onRestart={() => setAttempt((a) => a + 1)}
      questions={questionsQuery.data}
      examId={exam.id}
      examTitle={exam.title}
      diplomaTitle={exam.diploma?.title ?? diplomaQuery.data?.title}
      durationMinutes={exam.duration ?? 30}
      backTo={diplomaId ? `/diplomas/${diplomaId}/exams` : "/diplomas"}
    />
  );
}