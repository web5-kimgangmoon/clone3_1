"use client";

import { Header } from "./ui/header/index";
import { useEventListStore_globalClick } from "./zustand/eventList_globalClick";
import { TanstackProvider } from "./components/tanstackProvider";
import useBreakpointProvider from "./hooks/useBreakpointProvider";
import { BodyContainer } from "./container/body";
import { ReactLenis } from "lenis/react";

export default function Home() {
  useBreakpointProvider();
  const execute = useEventListStore_globalClick((state) => state.execute);

  return (
    <TanstackProvider>
      <ReactLenis root options={{ autoRaf: true }}>
        <body onClick={execute} className="min-h-screen">
          <Header />
          <BodyContainer />
        </body>
      </ReactLenis>
    </TanstackProvider>
  );
}
