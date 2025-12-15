import { Navbar } from "@/components/landing/navbar";

export default function Page() {

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="w-full h-full max-w-6xl mx-auto py-40">
        <div className="flex flex-col items-center space-y-5">
          <button className="px-8 py-3 bg-neutral-700 text-neutral-100 uppercase font-medium font-mono text-sm">
            A minimal Blogging platform
          </button>
          <h1 className="font-sans text-7xl font-medium text-center max-w-xl">
            Simple words. Endless impact.
          </h1>
          <p className="font-mono text-xl text-center text-neutral-400 max-w-2xl">
            A minimal blogging space designed for those who value expression
            over perfection. Share ideas that matter.
          </p>
          <div className="flex items-center gap-x-8">
            <button className="px-8 py-3 bg-white text-black uppercase font-medium font-mono text-sm cursor-pointer">
              Start writing
            </button>

            <button className="px-8 py-3 bg-black text-neutral-400 uppercase font-medium font-mono text-sm border cursor-pointer">
              Read blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
