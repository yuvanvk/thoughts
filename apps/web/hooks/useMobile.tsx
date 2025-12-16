import { useEffect, useState } from "react";

export const useMobile = (breakpoint = 768) => {
  const [isMobile, setisMobile] = useState(false);

  useEffect(() => {
    const check = () => setisMobile(window.innerWidth <= breakpoint);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, [breakpoint, isMobile]);

  return isMobile;
};
