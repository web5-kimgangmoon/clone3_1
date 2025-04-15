"use client";

import { Header } from "./ui/header";
import { useObservableStore_globalClick } from "./zustand/observable_globalClick";

export default function Home() {
  const notify = useObservableStore_globalClick((state) => state.notify);
  return (
    <body onClick={notify} className="min-h-screen">
      <Header />
    </body>
  );
}
