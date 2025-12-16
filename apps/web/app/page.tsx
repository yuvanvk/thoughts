import { Navbar } from "@/components/landing/navbar";

export default function Page() {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="w-full h-full xl:max-w-7xl mx-auto py-40 flex items-center justify-between ">
        <div className="flex flex-col items-start space-y-5">
          <button className="px-8 py-3 bg-neutral-700 text-neutral-100 uppercase font-medium font-mono text-xs w-fit">
            A minimal Blogging platform
          </button>
          <h1 className="font-sans text-4xl  md:text-7xl font-medium  max-w-xl">
            Simple words. Endless impact.
          </h1>
          <p className="font-mono text-sm md:text-xl  text-neutral-400 max-w-2xl">
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

        <div
          className="relative w-[500px] h-[500px] hidden md:block animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/[0.1] rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/[0.05] rounded-full"></div>

              <svg
                className="absolute top-0 right-0 w-full h-full text-white/[0.2]"
                viewBox="0 0 400 400"
              >
                <path
                  d="M50,200 Q200,50 350,200 T50,200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <line
                  x1="200"
                  y1="50"
                  x2="200"
                  y2="350"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
                <line
                  x1="50"
                  y1="200"
                  x2="350"
                  y2="200"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />

                <circle cx="200" cy="50" r="2" fill="currentColor" />
                <circle cx="200" cy="350" r="2" fill="currentColor" />
                <circle cx="50" cy="200" r="2" fill="currentColor" />
                <circle cx="350" cy="200" r="2" fill="currentColor" />
              </svg>

              <div className="absolute top-[20%] right-[10%] w-32 h-40 bg-white/[0.03] border border-white/[0.1] backdrop-blur-sm rotate-12 z-10 flex items-center justify-center">
                <span className="font-mono text-[10px] text-white/40">
                  Markdown
                </span>
              </div>

              <div className="absolute bottom-[20%] left-[10%] w-40 h-24 bg-[#111] border border-white/[0.2] -rotate-6 z-20 flex flex-col p-3 gap-2">
                <div className="w-1/2 h-1 bg-white/20"></div>
                <div className="w-3/4 h-1 bg-white/10"></div>
                <div className="w-full h-1 bg-white/10"></div>
              </div>

              <div className="absolute top-[10%] left-[20%]">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white/[0.15]"
                >
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
