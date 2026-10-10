import { Outlet } from "react-router";
import NavbarSide from "@/shared/components/navbar/navbar-side";
import NavigateTopNav from "@/shared/components/navbar/navigate-top-nav";

export default function DiplomaLayout() {
  return (
    <section className="flex h-screen overflow-hidden bg-slate-50">
      <NavbarSide />
      <main className="w-full flex-1 overflow-y-auto p-4 md:p-6">
        <NavigateTopNav />
        <Outlet />
      </main>
    </section>
  );
}
