// features/questions/components/exam-timer.tsx
interface Props {
  remaining: number; 
  total: number; 
}

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function format(seconds: number) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function ExamTimer({ remaining, total }: Props) {
  const ratio = total ? remaining / total : 0;
  const offset = CIRCUMFERENCE * (1 - ratio);

  return (
    <div className="relative h-14 w-14">
      <svg viewBox="0 0 48 48" className="h-full w-full -rotate-90">
       
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          strokeWidth="4"
          className="stroke-blue-100"
        />
       
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="stroke-blue-600 transition-all duration-1000 ease-linear"
        />
      </svg>

      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
        {format(remaining)}
      </span>
    </div>
  );
}