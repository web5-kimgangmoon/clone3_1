"use client";

import { Header } from "./ui/header/index";
import { useEventListStore_globalClick } from "./zustand/eventList_globalClick";
import { TanstackProvider } from "./components/tanstackProvider";

export default function Home() {
  const execute = useEventListStore_globalClick((state) => state.execute);

  return (
    <TanstackProvider>
      <body onClick={execute} className="min-h-screen">
        <Header />
        <div className="min-h-screen bg-red-300"></div>
        <div className="min-h-screen bg-blue-300"></div>
        <div className="min-h-screen bg-pink-300"></div>
        <div className="min-h-screen bg-red-300"></div>
      </body>
    </TanstackProvider>
  );
}
