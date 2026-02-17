import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

export const AvatarSection = () => {
  const avatarIcons = Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    // AI-style illustrated human avatars generated from unique seeds
    src: `https://api.dicebear.com/7.x/adventurer/svg?seed=writer-${index + 1}`,
  }));
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
