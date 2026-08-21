import NavbarSide from "@/shared/components/navbar/navbar-side";

export default function ExamPage() {
  return (
    <section className="flex min-h-screen bg-slate-50">
      <NavbarSide />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-slate-800">Exams</h1>
      </main>
    </section>
  );
}
