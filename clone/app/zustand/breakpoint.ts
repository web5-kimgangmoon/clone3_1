import { create } from "zustand";

type breakpointState = {
  breakpoint: "xl" | "lg" | "md" | "sm" | "xs";
};

type breakpointAction = { setBreakpoint: (size: number) => void };

type breakpointStore = breakpointState & breakpointAction;

export const useBreakpointStore = create<breakpointStore>()((set, state) => ({
  breakpoint: "xl",
  setBreakpoint: (size) => {
    let result: breakpointState["breakpoint"] = "xl";
    if (size < 1200) result = "lg";
    if (size < 960) result = "md";
    if (size < 790) result = "sm";
    if (size < 615) result = "xs";
    set({ breakpoint: result });
  },
}));
