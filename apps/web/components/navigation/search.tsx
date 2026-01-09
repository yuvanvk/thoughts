import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Searchbar } from "./search-bar";

export const Search = () => {
  return (
    <div>
      <div className="px-3 py-[8.2px] border-b flex items-center w-full gap-x-3">
        <Searchbar />
        <Avatar>
          <AvatarImage src={"https://github.com/shadcn.png"} />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
