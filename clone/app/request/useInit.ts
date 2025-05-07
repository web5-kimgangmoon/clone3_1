import { useQuery } from "@tanstack/react-query";
import { axiosSet } from "../lib/axios";

export const useInit = () =>
  useQuery({
    queryKey: ["init", "get"],
    queryFn: () => {
      return axiosSet.get("/init", {
        withCredentials: process.env.DEPLOY === "true",
      });
    },
    refetchInterval: false,
  });
