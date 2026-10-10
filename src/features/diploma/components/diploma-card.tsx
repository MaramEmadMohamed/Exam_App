import { Link } from "react-router";

export interface DiplomaCardProps {
  title: string;
  description: string;
  image: string;
  badge?: string;
  to?: string;
}

export default function DiplomaCard({
  title,
  description,
  image,
  badge,
  to,
}: DiplomaCardProps) {
  const content = (
    <>
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-x-3 bottom-3 rounded-sm bg-[#1d63ed]/95 px-4 py-4 text-white transition-all duration-300 group-hover:px-5 group-hover:py-5">
        {badge && (
          <span className="absolute -top-4 right-4 flex size-8 items-center justify-center rounded-full bg-yellow-400 font-mono text-sm font-bold text-slate-900 shadow-md">
            {badge}
          </span>
        )}
        <h2 className="font-mono text-base leading-5 font-bold">{title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-blue-100 transition-all duration-300 group-hover:line-clamp-3">
          {description}
        </p>
      </div>
    </>
  );

  const className =
    "group relative block aspect-3/4 overflow-hidden rounded-xl bg-slate-200 shadow-sm transition-shadow duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600";

  return to ? (
    <Link to={to} aria-label={`${title}: ${description}`} className={className}>
      {content}
    </Link>
  ) : (
    <article className={className} aria-label={title}>
      {content}
    </article>
  );
}
