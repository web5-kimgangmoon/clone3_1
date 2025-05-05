"use client";

import { Header } from "./ui/header/index";
import { useEventListStore_globalClick } from "./zustand/eventList_globalClick";
import { TanstackProvider } from "./components/tanstackProvider";
import useBreakpointProvider from "./hooks/useBreakpointProvider";
import { BodyContainer } from "./container/body";

export default function Home() {
  useBreakpointProvider();
  const execute = useEventListStore_globalClick((state) => state.execute);

  return (
    <TanstackProvider>
      <body onClick={execute} className="min-h-screen">
        <Header />
        <BodyContainer />
      </body>
    </TanstackProvider>
  );
}
