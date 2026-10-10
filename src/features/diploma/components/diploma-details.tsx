import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import useDiplomaDetails from "../api/qures/use-diploma-details";
import { useExams } from "@/features/exam/apis/queries/use-exam";
import ExamCard from "@/features/exam/components/exam-card";

export default function DiplomaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const diplomaQuery = useDiplomaDetails(id);
  const examsQuery = useExams({ diplomaId: id });

  console.log("diplomaditas", diplomaQuery.data);
  if (diplomaQuery.isLoading || examsQuery.isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-lg bg-slate-200" />
        ))}
      </div>
    );
  }

  const error = diplomaQuery.error ?? examsQuery.error;
  if (error) return <p className="text-red-600">{error.message}</p>;

  const diploma = diplomaQuery.data;
  const exams = examsQuery.data?.items ?? [];

  return (
    <div>
      <div className="mb-4 flex items-stretch gap-2">
        <button
          type="button"
          onClick={() => navigate("/diplomas")}
          aria-label="Back to diplomas"
          className="flex w-10 items-center justify-center border border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="flex-1 bg-blue-600 px-6 py-4 text-2xl font-bold text-white">
          {diploma?.title} Exams
        </h1>
      </div>

      <div className="space-y-3 bg-white p-4">
        {exams.length === 0 && (
          <p className="py-6 text-center text-sm text-slate-500">
            No exams found for this diploma.
          </p>
        )}

        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}

        <p className="pt-4 text-center text-sm text-slate-700">End of list</p>
      </div>
    </div>
  );
}