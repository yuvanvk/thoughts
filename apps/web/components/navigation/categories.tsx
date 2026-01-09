export const Categories = () => {
  return (
    <div className="flex flex-col w-full text-xs px-5 py-5 gap-y-1.5">
      <div className="flex items-center justify-between">
        <div className="text-white font-sans">All</div>
        <div className="px-2.5 py-1 bg-neutral-800 rounded-[8px] font-mono text-[10px]">
          121
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-neutral-500 font-sans">Engineering</div>
        <div className="px-2.5 py-1 bg-neutral-800 rounded-[8px] font-mono text-[10px]">
          20
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-neutral-500 font-sans">Design</div>
        <div className="px-2.5 py-1 bg-neutral-800 rounded-[8px] font-mono text-[10px]">
          40
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-neutral-500 font-sans">Tech</div>
        <div className="px-2.5 py-1 bg-neutral-800 rounded-[8px] font-mono text-[10px]">
          50
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-neutral-500 font-sans">Software</div>
        <div className="px-2.5 py-1 bg-neutral-800 rounded-[8px] font-mono text-[10px]">
          10
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-neutral-500 font-sans">Tools</div>
        <div className="px-2.5 py-1 bg-neutral-800 rounded-[8px] font-mono text-[10px]">
          1
        </div>
      </div>
    </div>
  );
};
