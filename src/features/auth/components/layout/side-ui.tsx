
import { BookOpenCheck, Brain, RectangleEllipsis } from 'lucide-react';
import type { JSX } from 'react/jsx-runtime';
import type { FC } from 'react';

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}


const features: Feature[] = [
  {
    icon: <Brain />,
    title: "Tailored Diplomas",
    description:
      "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
  {
    icon: <BookOpenCheck />,
    title: "Focused Exams",
    description:
      "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
  },
  {
    icon: <RectangleEllipsis />,
    title: "Smart Multi-Step Forms",
    description:
      "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
];

const FeatureRow: FC<Feature> = ({ icon, title, description }) => (
  <div className="flex items-start gap-4">
    <div className="shrink-0 w-11 h-11  border-2 border-blue-400 text-blue-600 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className=" text-blue-600 font-semibold text-base mb-1">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  </div>
);
export default function SideUI() {
  return (
    <>
    <div className="flex flex-col gap-10">
          {features.map((feature) => (
            <FeatureRow key={feature.title} {...feature} />
          ))}
        </div>
    </>
   
  )
}
