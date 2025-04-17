import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export const TanstackProvider = ({ children }: { children: ReactNode }) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchInterval: 6000 } },
      })
  );
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
