import { create } from "zustand";

type breakpointAction = { setBreakpoint: (size: number) => void };

export const mkBreakpointStore = <T extends { [key: string]: number }>(
  breakpoint: T
) => {
  const breakpointSort = Object.entries(breakpoint).sort((a, b) => {
    return b[1] - a[1];
  });
  const useBreakpointStore = create<
    { breakpoint: keyof T } & breakpointAction
  >()((set, state) => ({
    breakpoint: breakpointSort[0][0],
    setBreakpoint: (size) => {
      let result: keyof T = breakpointSort[0][0];
      for (let i = 0; i < breakpointSort.length - 1; i++) {
        if (size < breakpointSort[i][1]) result = breakpointSort[i][0];
      }
      set({ breakpoint: result });
    },
  }));
  return useBreakpointStore;
};
