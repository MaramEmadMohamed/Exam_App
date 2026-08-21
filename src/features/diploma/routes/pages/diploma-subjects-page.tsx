import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { ArrowLeft, Code2 } from "lucide-react";
import NavbarSide from "@/shared/components/navbar/navbar-side";
import { useDiplomaDetails } from "../../apis/queries/use-diploma-details";

interface Subject {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  icon?: string;
  image?: string;
  description?: string;
}

interface SubjectResponse {
  categories?: Subject[];
  subjects?: Subject[];
  data?: Subject[];
  payload?: { categories?: Subject[]; subjects?: Subject[]; data?: Subject[] };
}

function getSubjects(data: unknown): Subject[] {
  if (Array.isArray(data)) {
    return data;
  }
  if (!data || typeof data !== "object") {
    return [];
  }
  const response = data as SubjectResponse;
  return response.categories ?? response.subjects ?? response.data ?? response.payload?.categories ?? response.payload?.subjects ?? response.payload?.data ?? [];
}

export default function DiplomaSubjectsPage() {
  const { diplomaId } = useParams<{ diplomaId: string }>();
  const navigate = useNavigate();
  const { data: diploma } = useDiplomaDetails(diplomaId);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(Boolean(diplomaId));
  const [error, setError] = useState<string | null>(
    diplomaId ? null : "Diploma was not specified.",
  );
  const diplomaName = diploma?.title ?? diploma?.name ?? "Diploma";

  useEffect(() => {
    let isMounted = true;

    async function fetchSubjects() {
      const token =
        localStorage.getItem("token") ??
        localStorage.getItem("userToken") ??
        localStorage.getItem("accessToken") ??
        "";
      const encodedId = encodeURIComponent(diplomaId ?? "");
      const endpoints = [
        `https://exam-app.elevate-bootcamp.cloud/api/v1/subjects?category=${encodedId}`,
        `https://exam-app.elevate-bootcamp.cloud/api/v1/categories/${encodedId}`,
        `https://exam-app.elevate-bootcamp.cloud/api/subjects?category=${encodedId}`,
      ];

      let lastError: unknown;
      for (const endpoint of endpoints) {
        try {
          const response = await axios.get<unknown>(endpoint, {
            headers: { token, Authorization: token ? `Bearer ${token}` : "" },
          });
          const records = getSubjects(response.data);
          if (records.length > 0) {
            if (isMounted) {
              setSubjects(records);
            }
            return;
          }
        } catch (requestError) {
          lastError = requestError;
        }
      }

      if (isMounted) {
        const message = axios.isAxiosError(lastError)
          ? (lastError.response?.data as { message?: unknown } | undefined)?.message
          : undefined;
        setError(
          typeof message === "string" ? message : "Unable to load subjects.",
        );
      }

      if (isMounted) {
        setLoading(false);
      }
    }

    if (diplomaId) {
      void fetchSubjects();
    }

    return () => {
      isMounted = false;
    };
  }, [diplomaId]);

  return (
    <section className="flex min-h-screen bg-slate-50">
      <NavbarSide />
      <main className="min-w-0 flex-1 overflow-y-auto p-5 md:p-8">
        <nav className="mb-5 text-sm text-slate-500" aria-label="Breadcrumb">
          <button type="button" onClick={() => navigate("/diplomas")} className="hover:text-blue-600">Diplomas</button>
          <span className="mx-2">/</span>
          <span className="text-slate-800">{diplomaName}</span>
          <span className="mx-2">/ Subjects</span>
        </nav>
        <header className="flex items-center gap-4 rounded-lg bg-blue-600 p-4 text-white shadow-sm">
          <button type="button" onClick={() => navigate("/diplomas")} aria-label="Back to diplomas" className="rounded-md bg-blue-500/50 p-2 hover:bg-blue-500">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-mono text-xl font-bold">{diplomaName} Subjects</h1>
        </header>
        {loading && <p className="mt-8 font-mono text-slate-500">Loading subjects...</p>}
        {error && <p className="mt-8 rounded-md bg-red-50 p-4 text-red-600">{error}</p>}
        {!loading && !error && !subjects.length && <p className="mt-8 font-mono text-slate-500">No subjects found.</p>}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => {
            const subjectId = subject._id ?? subject.id;
            const subjectName = subject.name ?? subject.title ?? "Subject";
            if (!subjectId) return null;
            return (
              <button key={subjectId} type="button" onClick={() => navigate(`/subjects/${subjectId}/exams`)} className="group relative h-56 overflow-hidden rounded-lg border bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                {subject.icon || subject.image ? <img src={subject.icon ?? subject.image} alt={subjectName} className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105" /> : <div className="absolute inset-0 flex items-center justify-center bg-blue-50 text-blue-500"><Code2 size={56} /></div>}
                <div className="absolute inset-x-0 bottom-0 bg-blue-600/90 p-4 text-white">
                  <h2 className="font-mono text-xl font-bold">{subjectName}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-blue-100">{subject.description ?? `Explore ${subjectName} exams.`}</p>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </section>
  );
}
