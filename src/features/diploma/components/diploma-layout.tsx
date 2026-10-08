import NavbarSide from '@/shared/components/navbar/navbar-side'
import { GraduationCap } from 'lucide-react'
import HeaderHero from '@/shared/components/header/header-hero'
import { Outlet } from 'node_modules/react-router/dist/production/lib/components'
export default function DiplomaLayout() {
  return (
    <section className="flex h-screen overflow-hidden bg-slate-50">
      <NavbarSide />
      <main className="w-full flex-1 overflow-y-auto p-5 md:p-8">
        <HeaderHero icon={GraduationCap}>
          Diplomas
        </HeaderHero>
        
        <Outlet/>
      </main>
    </section>
  )
}
