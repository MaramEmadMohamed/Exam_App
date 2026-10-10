import { Button } from "@/ui/button/button";
import React from "react";
import { Link, useLocation } from "react-router";
import useDiplomaDetails from "@/features/diploma/api/qures/use-diploma-details";
import { useExam } from "@/features/exam/apis/queries/use-exam";

const LABELS: Record<string, string> = {
  diplomas: "Diplomas",
  exams: "Exams",
  "account-settings": "Account Settings",
};

const formatSegment = (segment: string) =>
  LABELS[segment] ??
  decodeURIComponent(segment)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function NavigateTopNav() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  // /diplomas/:id/...
  const pathDiplomaId =
    segments[0] === "diplomas" && segments.length > 1 ? segments[1] : undefined;

  // /exams/:examId
  const examId =
    segments[0] === "exams" && segments.length > 1 ? segments[1] : undefined;
  const { data: exam } = useExam(examId);

  // الـ diploma إما من الـ URL أو من الامتحان
  const diplomaId = pathDiplomaId ?? exam?.diplomaId ?? exam?.diploma?.id;
  const { data: diploma } = useDiplomaDetails(diplomaId);

  const items = examId
    ? [
        { label: "Diplomas", to: "/diplomas" },
        {
          label: diploma?.title ?? exam?.diploma?.title ?? "...",
          to: diplomaId ? `/diplomas/${diplomaId}/exams` : "/diplomas",
        },
        { label: exam?.title ?? "...", to: pathname },
      ]
    : segments.map((segment, index) => ({
        label:
          index === 1 && pathDiplomaId
            ? (diploma?.title ?? "...")
            : formatSegment(segment),
        to: "/" + segments.slice(0, index + 1).join("/"),
      }));

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 text-[10px] text-gray-400"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={`${index}-${item.to}`}>
            {isLast ? (
              <span className="text-lg text-blue-600" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Button>
                <Link to={item.to} className="hover:underline">
                  {item.label}
                </Link>
              </Button>
            )}
            {!isLast && <span>/</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}