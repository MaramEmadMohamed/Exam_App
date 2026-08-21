import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, BookOpen, Clock, HelpCircle } from "lucide-react";
import axios from "axios";
import NavbarSide from "@/shared/components/navbar/navbar-side";

interface Exam {
  _id: string;
  title: string;
  duration?: number;
  numberOfQuestions?: number;
  questionCount?: number;
  description?: string;
  icon?: string;
}

interface ExamResponse {
  exams?: Exam[];
  data?: Exam[];
  payload?: {
    exams?: Exam[];
    data?: Exam[];
  };
}

function getExams(data: unknown): Exam[] {
  if (Array.isArray(data)) {
    return data;
  }
  if (!data || typeof data !== "object") {
    return [];
  }
  const response = data as ExamResponse;
  return response.exams ?? response.data ?? response.payload?.exams ?? response.payload?.data ?? [];
}

export default function ExamListPage() {
  const { diplomaId, subjectId } = useParams<{ diplomaId?: string; subjectId?: string }>();
  const selectedId = diplomaId ?? subjectId;
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchExams() {
      if (!selectedId) {
        setError("Diploma was not specified.");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token") || localStorage.getItem("userToken") || "";
        const response = await axios.get<unknown>(
          `https://exam-app.elevate-bootcamp.cloud/api/v1/exams?subject=${encodeURIComponent(selectedId)}`,
          { headers: { token } },
        );
        if (isMounted) {
          setExams(getExams(response.data));
        }
      } catch (requestError) {
        if (isMounted) {
          const message = axios.isAxiosError(requestError)
            ? (requestError.response?.data as { message?: unknown } | undefined)?.message
            : undefined;
          setError(typeof message === "string" ? message : "Failed to load exams for this diploma.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void fetchExams();
    return () => {
      isMounted = false;
    };
  }, [selectedId]);

  return (
    <section className="flex min-h-screen bg-slate-50">
      <NavbarSide />
      <main className="min-w-0 flex-1 overflow-y-auto p-5 md:p-8">
        <div className="flex max-w-6xl flex-col gap-6 p-1 md:p-6">
          <div className="font-mono text-xs text-slate-400">
            Diplomas / <span className="text-slate-600">Selected Diploma</span> / <span className="text-blue-600">Exams</span>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" onClick={() => navigate("/diplomas")} aria-label="Back to diplomas" className="rounded-lg border border-slate-200 bg-white p-3 text-blue-600 transition hover:bg-blue-50">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex flex-1 items-center gap-3 rounded-lg bg-blue-600 p-4 font-mono text-xl font-bold text-white shadow-sm">
              <BookOpen className="h-6 w-6" />
              <span>Exams List</span>
            </div>
          </div>

          {loading && <div className="p-8 text-center font-mono text-slate-500">Loading exams...</div>}
          {error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center font-mono text-red-600">{error}</div>}
          {!loading && !error && exams.length === 0 && <div className="p-12 text-center font-mono text-slate-400">No exams available for this diploma yet.</div>}

          {!loading && !error && exams.length > 0 && (
            <div className="flex flex-col gap-4">
              {exams.map((exam) => (
                <article key={exam._id} className="flex flex-col items-start justify-between gap-5 rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-blue-300 md:flex-row md:items-center">
                  <div className="flex min-w-0 flex-1 items-start gap-4 pr-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white p-2">
                      <img src={exam.icon || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"} alt={exam.title} className="h-full w-full object-contain" />
                    </div>
                    <div className="flex min-w-0 flex-col gap-1">
                      <h2 className="font-mono text-lg font-bold text-blue-700">{exam.title}</h2>
                      <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">{exam.description || "Practice and evaluate your knowledge in this subject test."}</p>
                    </div>
                  </div>
                  <div className="flex w-full shrink-0 flex-col items-start gap-3 md:w-auto md:items-end">
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-500">
                      <span className="flex items-center gap-1"><HelpCircle className="h-3.5 w-3.5 text-slate-400" /> {exam.numberOfQuestions ?? exam.questionCount ?? 25} Questions</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-slate-400" /> {exam.duration ?? 20} minutes</span>
                    </div>
                    <button type="button" onClick={() => navigate(`/exams/${exam._id}`)} className="flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 font-mono text-xs font-bold text-white shadow-sm transition hover:bg-blue-700">
                      START <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </article>
              ))}
              <div className="py-4 text-center font-mono text-xs text-slate-400">End of list</div>
            </div>
          )}
        </div>
      </main>
    </section>
  );
}
