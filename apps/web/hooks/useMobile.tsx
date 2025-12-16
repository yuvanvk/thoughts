import { useEffect, useState } from "react";

export const useMobile = (breakpoint = 768) => {
  const [isMobile, setisMobile] = useState(false);

  useEffect(() => {
    const check = () => setisMobile(window.innerWidth <= breakpoint);

    check();
    document.addEventListener("resize", check);

    return () => document.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
};
