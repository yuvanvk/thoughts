import { Logo } from "@/components/branding/logo";
import { BookOpen, Home } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="flex flex-col space-y-5 py-2 px-1 min-w-[200px]">
      <div className="flex items-center gap-x-2 mb-7">
        <Logo />
        <div className="font-serif text-2xl">Thoughts</div>
      </div>

      <div className="flex items-center gap-x-2">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 17H12.009"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          ></path>
          <path
            d="M20 8.5V13.5C20 17.2712 20 19.1569 18.8284 20.3284C17.6569 21.5 15.7712 21.5 12 21.5C8.22876 21.5 6.34315 21.5 5.17157 20.3284C4 19.1569 4 17.2712 4 13.5V8.5"
            stroke="currentColor"
            stroke-width="1.5"
            vector-effect="non-scaling-stroke"
          ></path>
          <path
            d="M22 10.5L17.6569 6.33548C14.9902 3.77849 13.6569 2.5 12 2.5C10.3431 2.5 9.00981 3.77849 6.34315 6.33548L2 10.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
          ></path>
        </svg>
        <div className="font-sans text-sm">Home</div>
      </div>

      <div className="flex items-center gap-x-2">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_22634_9256)">
            <path
              d="M6 22V13.6944C6 12.1287 6 11.3459 6.21454 10.6077C6.42908 9.86948 6.84589 9.21812 7.6795 7.91542L10.3359 3.76419C11.0885 2.58806 11.4648 2 12 2C12.5352 2 12.9115 2.58806 13.6641 3.76419L16.3205 7.91542C17.1541 9.21812 17.5709 9.86948 17.7855 10.6077C18 11.3459 18 12.1287 18 13.6944V22"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
            ></path>
            <path
              d="M7 11C7.63152 11.3231 8.4887 11.9732 9.28009 11.9991C10.2988 12.0324 10.9868 11.1372 12 11.1372C13.0132 11.1372 13.7012 12.0324 14.7199 11.9991C15.5113 11.9732 16.3685 11.3231 17 11"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
            ></path>
            <path
              d="M12 12V22"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
            ></path>
            <path
              d="M10 5H14"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_22634_9256">
              <rect width="24" height="24" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
        <div className="font-sans text-sm">Write</div>
      </div>

      <div className="flex items-center gap-x-2">
        <BookOpen size={22}/>
        <div className="font-sans text-sm">My blogs</div>
      </div>
    </div>
  );
};
