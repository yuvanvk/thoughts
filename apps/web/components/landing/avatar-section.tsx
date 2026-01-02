import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

export const AvatarSection = () => {
  const avatarIcons = [
    { id: 1, src: "https://github.com/shadcn.png" },
    { id: 2, src: "https://github.com/shadcn.png" },
    { id: 3, src: "https://github.com/shadcn.png" },
    { id: 4, src: "https://github.com/shadcn.png" },
    { id: 5, src: "https://github.com/shadcn.png" },
    { id: 6, src: "https://github.com/shadcn.png" },
    { id: 7, src: "https://github.com/shadcn.png" },
    { id: 8, src: "https://github.com/shadcn.png" },
    { id: 9, src: "https://github.com/shadcn.png" },
    { id: 10, src: "https://github.com/shadcn.png" },
    { id: 11, src: "https://github.com/shadcn.png" },
    { id: 12, src: "https://github.com/shadcn.png" },
    { id: 13, src: "https://github.com/shadcn.png" },
    { id: 14, src: "https://github.com/shadcn.png" },
    { id: 15, src: "https://github.com/shadcn.png" },
    { id: 16, src: "https://github.com/shadcn.png" },
    { id: 17, src: "https://github.com/shadcn.png" },
    { id: 18, src: "https://github.com/shadcn.png" },
    { id: 19, src: "https://github.com/shadcn.png" },
    { id: 20, src: "https://github.com/shadcn.png" },
    { id: 21, src: "https://github.com/shadcn.png" },
    { id: 22, src: "https://github.com/shadcn.png" },
    { id: 23, src: "https://github.com/shadcn.png" },
    { id: 24, src: "https://github.com/shadcn.png" },
    { id: 25, src: "https://github.com/shadcn.png" },
    { id: 26, src: "https://github.com/shadcn.png" },
    { id: 27, src: "https://github.com/shadcn.png" },
    { id: 28, src: "https://github.com/shadcn.png" },
    { id: 29, src: "https://github.com/shadcn.png" },
    { id: 30, src: "https://github.com/shadcn.png" },
    { id: 31, src: "https://github.com/shadcn.png" },
    { id: 32, src: "https://github.com/shadcn.png" },
    { id: 33, src: "https://github.com/shadcn.png" },
    { id: 34, src: "https://github.com/shadcn.png" },
    { id: 35, src: "https://github.com/shadcn.png" },
    { id: 36, src: "https://github.com/shadcn.png" },
    { id: 37, src: "https://github.com/shadcn.png" },
    { id: 38, src: "https://github.com/shadcn.png" },
    { id: 39, src: "https://github.com/shadcn.png" },
    { id: 40, src: "https://github.com/shadcn.png" },
  ];
  return (
    <div className="w-full my-10 ">
      <div className="grid grid-cols-10 mask-t-from-50% px-4">
        {avatarIcons.map((a) => (
          <div
            key={a.id}
            className="py-2 cursor-pointer hover:scale-150 transition-all duration-200"
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={a.src} />
              <AvatarFallback>I</AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-neutral-400 font-medium mt-5">
        50,000+ writers and counting...
      </div>
    </div>
  );
};
