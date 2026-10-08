import { FolderCode } from 'lucide-react'
import { Outlet } from 'react-router'
import SideUI from './side-ui'


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

         <SideUI/>

      </div>



    </section>
    {/* //AuthPage */}
    <main className="flex min-h-128 flex-col justify-center bg-white px-6 py-10 sm:px-10 lg:min-h-screen lg:px-12">
      <Outlet/>
    </main>
    </div>
  )
}
