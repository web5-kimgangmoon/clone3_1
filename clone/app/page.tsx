"use client";

import { Header } from "./ui/header/index";
import { useEventListStore_globalClick } from "./zustand/eventList_globalClick";
import { TanstackProvider } from "./components/tanstackProvider";
import useBreakpointProvider from "./hooks/useBreakpointProvider";
import { Body } from "./ui/body";
export default function Home() {
  useBreakpointProvider();
  const execute = useEventListStore_globalClick((state) => state.execute);

  return (
    <TanstackProvider>
      <body onClick={execute} className="min-h-screen">
        <Header />
        <Body />
        <div className="min-h-screen bg-red-300"></div>
        <div className="min-h-screen bg-blue-300"></div>
        <div className="min-h-screen bg-pink-300"></div>
        <div className="min-h-screen bg-red-300"></div>
      </body>
    </TanstackProvider>
  );
}
