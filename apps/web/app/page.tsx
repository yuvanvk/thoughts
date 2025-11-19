import { Navbar } from "@/components/landing/navbar";


export default function Page() {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="w-full h-full max-w-6xl mx-auto py-40">
        <div className="flex flex-col items-center space-y-5">
          <button className="px-8 py-3 bg-neutral-700 uppercase font-medium font-mono text-sm">
            A minimal Blogging platform
          </button>
          <h1 className="font-sans text-7xl font-medium text-center max-w-xl">
            Simple words. Endless impact.
          </h1>
          <p className="font-mono text-xl text-center text-neutral-400 max-w-2xl">
            A minimal blogging space designed for those who value expression
            over perfection. Share ideas that matter.
          </p>

        </div>
      </div>
    </div>
  );
}
