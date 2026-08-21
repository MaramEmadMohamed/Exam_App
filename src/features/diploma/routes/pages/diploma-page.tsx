import NavbarSide from "@/shared/components/navbar/navbar-side";
import { GraduationCap } from "lucide-react";
import DiplomaList from "./diploma-list";

export default function DiplomaPage() {
  return (
    <section className="flex h-screen overflow-hidden bg-slate-50">
      <NavbarSide />
      <main className="w-full flex-1 overflow-y-auto p-5 md:p-8">
        <h1 className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-4 text-2xl font-bold text-white shadow-sm md:text-3xl">
          <GraduationCap size={30} className="mr-2" /> Diplomas
        </h1>
        <DiplomaList/>
      </main>
    </section>
  );
}