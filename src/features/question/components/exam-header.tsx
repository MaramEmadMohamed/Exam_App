// features/question/components/exam-header.tsx
import { ArrowLeft, CircleHelp } from "lucide-react";
import { useNavigate } from "react-router";

interface Props {
  title: string;
  backTo: string;
}

export default function ExamHeader({ title, backTo }: Props) {
  const navigate = useNavigate();

  return (
    <div className="mb-4 flex items-stretch gap-2">
      <button
        type="button"
        onClick={() => navigate(backTo)}
        aria-label="Back to exams"
        className="flex w-10 items-center justify-center border border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
      >
        <ArrowLeft size={18} />
      </button>
      <h1 className="flex flex-1 items-center gap-3 bg-blue-600 px-6 py-4 text-2xl font-bold text-white">
        <CircleHelp size={26} />
        {title} Questions
      </h1>
    </div>
  );
}