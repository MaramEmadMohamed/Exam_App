import { Link, useParams } from "react-router";
import { useDiplomaDetails } from "../../apis/queries/use-diploma-details";
import { getApiErrorMessage } from "@/features/auth/apis/mutations/user-login";

export default function DiplomaDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: diploma, error, isLoading, isError } = useDiplomaDetails(id);

  if (isLoading) {
    return <p className="mt-6 text-slate-500">Loading diploma...</p>;
  }

  if (isError) {
    return (
      <div className="mt-6 space-y-4">
        <p className="text-red-500">
          {getApiErrorMessage(error, "Unable to load diploma details.")}
        </p>
        <Link to="/diploma" className="text-blue-600 hover:underline">
          Back to diplomas
        </Link>
      </div>
    );
  }

  if (!diploma) {
    return <p className="mt-6 text-slate-500">Diploma not found.</p>;
  }

  return (
    <article className="mt-6 max-w-3xl overflow-hidden rounded-lg border bg-white shadow-sm">
      {diploma.image && (
        <img
          src={diploma.image}
          alt={diploma.title}
          className="h-64 w-full object-cover"
        />
      )}
      <div className="space-y-4 p-6">
        <Link to="/diploma" className="text-sm text-blue-600 hover:underline">
          Back to diplomas
        </Link>
        <h2 className="text-2xl font-bold text-slate-800">{diploma.title}</h2>
        <p className="text-slate-600">
          {diploma.description || "No description available."}
        </p>
        {diploma.createdAt && (
          <p className="text-sm text-slate-500">
            Created {new Date(diploma.createdAt).toLocaleDateString()}
          </p>
        )}
        <Link
          to={`/diplomas/${diploma.id}/exams`}
          className="inline-flex rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          View exams
        </Link>
      </div>
    </article>
  );
}
