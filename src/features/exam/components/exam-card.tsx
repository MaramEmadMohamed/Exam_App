import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Clock, CircleHelp, BookOpen } from "lucide-react";
import type { Exam } from "../types/exam";

export default function ExamCard({ exam }: { exam: Exam }) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = descRef.current;
    if (el && !expanded) setIsClamped(el.scrollHeight > el.clientHeight);
  }, [exam.description, expanded]);

  return (
    <article className="group relative flex gap-4 border border-transparent bg-blue-50 p-3 transition hover:border-dashed hover:border-blue-300">
      {/* Image */}
      <div className="flex size-16 shrink-0 items-center justify-center border border-blue-200 bg-blue-100 p-1.5">
        {exam.image ? (
          <img src={exam.image} alt="" className="size-full object-contain" />
        ) : (
          <BookOpen className="text-blue-400" />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-mono text-base font-bold text-blue-600">
            {exam.title}
          </h2>

          <div className="flex shrink-0 items-center font-mono text-xs text-slate-800">
            <span className="flex items-center gap-1 pr-2">
              <CircleHelp size={14} /> {exam.questionsCount ?? 0} Questions
            </span>
            <span className="h-4 w-px bg-slate-400" />
            <span className="flex items-center gap-1 pl-2">
              <Clock size={14} /> {exam.duration ?? 0} minutes
            </span>
          </div>
        </div>

        <div className="relative mt-1">
          <p
            ref={descRef}
            className={`font-mono text-xs leading-5 text-slate-600 ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {exam.description}
          </p>

          {(isClamped || expanded) && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className={`font-mono text-xs font-bold text-slate-900 ${
                expanded
                  ? "block"
                  : "absolute bottom-0 right-0 bg-blue-50 pl-1 group-hover:hidden"
              }`}
            >
              {expanded ? "See Less" : "… See More"}
            </button>
          )}
        </div>
      </div>

      {/* START (hover) */}
      <Link
        to={`/exams/${exam.id}`}
        className="absolute right-2 bottom-2 flex items-center gap-2 bg-blue-600 px-4 py-1 font-mono text-xs font-medium text-white opacity-0 transition group-hover:opacity-100"
      >
        START <ArrowRight size={14} />
      </Link>
    </article>
  );
}