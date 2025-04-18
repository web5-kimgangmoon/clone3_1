import { useEffect } from "react";
import { useBreakpointStore } from "../zustand/breakpoint";

export default function () {
  const setBreakpoint = useBreakpointStore((state) => state.setBreakpoint);
  useEffect(() => {
    setBreakpoint(window.innerWidth);
    const onResize = (e: UIEvent) => {
      setBreakpoint(window.innerWidth);
    };
    window.addEventListener("resize", onResize);
    return window.removeEventListener("resize", onResize);
  }, []);
}
