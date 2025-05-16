import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 500;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // debounce para evitar múltiplas execuções rápidas
    let timeout: ReturnType<typeof setTimeout>;
    const debounceResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debounceResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, []);

  return isMobile;
}
