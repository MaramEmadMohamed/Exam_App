import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { ArrowDown } from "lucide-react";

interface Subject {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
}

interface SubjectRecord {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
}

interface SubjectsResponse {
  categories?: SubjectRecord[];
  subjects?: SubjectRecord[];
  data?: SubjectRecord[];
  diplomas?: SubjectRecord[];
  payload?: {
    categories?: SubjectRecord[];
    subjects?: SubjectRecord[];
    data?: SubjectRecord[];
    diplomas?: SubjectRecord[];
  };
}

const endpointUrls = [
  "https://exam-app.elevate-bootcamp.cloud/api/v1/categories",
  "https://exam-app.elevate-bootcamp.cloud/api/v1/subjects",
  "https://exam-app.elevate-bootcamp.cloud/api/subjects",
  "https://exam-app.elevate-bootcamp.cloud/api/diplomas",
];

function getSubjectRecords(response: unknown): SubjectRecord[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (!response || typeof response !== "object") {
    return [];
  }

  const data = response as SubjectsResponse;
  const payload = data.payload;
  return (
    data.categories ??
    data.subjects ??
    data.data ??
    data.diplomas ??
    payload?.categories ??
    payload?.subjects ??
    payload?.data ??
    payload?.diplomas ??
    []
  );
}

function normalizeSubjects(records: SubjectRecord[]): Subject[] {
  return records.flatMap((record) => {
    const id = record._id ?? record.id;
    const name = record.name ?? record.title;

    if (!id || !name) {
      return [];
    }

    return [{
      _id: id,
      name,
      description: record.description,
      icon: record.icon ?? record.image,
    }];
  });
}

export default function DiplomaList() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function fetchSubjects() {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("userToken") ||
        localStorage.getItem("accessToken") ||
        "";

      if (!token) {
        if (isMounted) {
          setError("No authentication token found. Please log in first.");
        }
        return;
      }

      let lastError: unknown;

      for (const url of endpointUrls) {
        try {
          const response = await axios.get<unknown>(url, {
            headers: {
              token,
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Subjects API Response:", url, response.data);
          const records = normalizeSubjects(getSubjectRecords(response.data));

          if (records.length > 0) {
            if (isMounted) {
              setSubjects(records);
            }
            return;
          }
        } catch (requestError) {
          lastError = requestError;
          console.error("API Fetch Error Details:", url, requestError);
        }
      }

      if (isMounted) {
        const message = axios.isAxiosError(lastError)
          ? (lastError.response?.data as { message?: unknown } | undefined)?.message
          : undefined;
        setError(
          typeof message === "string"
            ? message
            : "Could not load categories/diplomas from the server.",
        );
      }
    }

    void fetchSubjects().finally(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="py-20 text-center font-mono text-slate-500">Loading diplomas...</div>;
  }

  if (error) {
    return (
      <div className="my-6 flex flex-col items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-6 text-center font-mono text-red-600">
        <p className="font-bold">{error}</p>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Go to Login Page
        </button>
      </div>
    );
  }

  if (!subjects.length) {
    return <div className="py-20 text-center font-mono text-slate-500">No diplomas available right now.</div>;
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
        <button
          key={subject._id}
          type="button"
          onClick={() => navigate(`/diplomas/${subject._id}/exams`)}
          className="group relative h-80 cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-900 text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgb(0 0 0 / 0.2), rgb(0 0 0 / 0.85)), url(${subject.icon || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"})`,
            }}
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-blue-600/90 p-5 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-blue-700/95">
            <h2 className="font-mono text-2xl font-bold tracking-wide">{subject.name}</h2>
            <div className="grid grid-rows-[0fr] transition-all duration-300 group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <p className="pt-2 font-sans text-sm leading-relaxed text-blue-100">
                  {subject.description || `Explore all available exams, quizzes, and practice tests inside ${subject.name}.`}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-blue-400/30 pt-2 font-mono text-xs font-bold text-blue-200 transition group-hover:text-white">
              <span>VIEW EXAMS</span>
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
            </div>
          </div>
        </button>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-400">
        <span>Scroll to view more</span>
        <ArrowDown size={16} aria-hidden="true" />
      </div>
    </div>
  );
}
