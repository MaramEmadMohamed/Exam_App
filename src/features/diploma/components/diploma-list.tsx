import useDiplomaList from "../api/qures/use-diploma-list";
import DiplomaCard from "./diploma-card";

const gridClass =
  "mx-auto mt-4 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3";

// برا الكومبوننت عشان الـ reference يفضل ثابت ومايحصلش refetch كل render
const params = new URLSearchParams({ limit: "100" });

export default function DiplomaList() {
  const { data, isLoading, isError, error } = useDiplomaList(params);

  if (isLoading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="aspect-3/4 animate-pulse rounded-xl bg-slate-200"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="mt-4 text-red-600">{error.message}</p>;
  }

  const diplomas =
    data?.data.map((diploma) => ({
      id: diploma.id,
      title: diploma.title,
      description: diploma.description,
      image: diploma.image,
      to: `/diplomas/${diploma.id}/exams`,
    })) ?? [];

  return (
    <div className={gridClass}>
      {diplomas.map(({ id, ...diploma }) => (
        <DiplomaCard key={id} {...diploma} />
      ))}
    </div>
  );
}