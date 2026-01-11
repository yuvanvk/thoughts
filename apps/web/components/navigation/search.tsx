import { Searchbar } from "./search-bar";
import { UserProfile } from "./user-profile";

export const Search = () => {
  return (
    <div>
      <div className="px-3 py-[8.2px] border-b flex items-center w-full gap-x-3 relative">
        <Searchbar />
        <UserProfile />
      </div>
    </div>
  );
};
