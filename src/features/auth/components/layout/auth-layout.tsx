import { Outlet } from 'react-router'
import { BookOpenCheck, Brain, FolderCode, RectangleEllipsis } from 'lucide-react';
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

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
     {/*Features*/}
    <section className="relative flex w-full justify-center overflow-hidden bg-white">
     <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-300 opacity-40 blur-3xl" />
      <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-blue-400 opacity-30 blur-3xl" />

      <div className="flex w-full max-w-md flex-col px-6 py-10 sm:px-10 lg:py-16">
         <header className="flex items-center gap-2 mb-16 text-blue-600 ">
           <FolderCode />
          <span className="text-blue-600 font-bold text-xl tracking-wide">
            Exam App
          </span>
        </header>

         <div className="mb-14">
          <h1 className="font-heading text-2xl font-bold text-slate-900 leading-snug">
            Empower your learning journey with our smart exam platform.
          </h1>
        </div>

         <div className="flex flex-col gap-10">
          {features.map((feature) => (
            <FeatureRow key={feature.title} {...feature} />
          ))}
        </div>

      </div>



    </section>
    {/* //AuthPage */}
    <main className="flex min-h-128 flex-col justify-center bg-white px-6 py-10 sm:px-10 lg:min-h-screen lg:px-12">
      <Outlet/>
    </main>
    </div>
  )
}
