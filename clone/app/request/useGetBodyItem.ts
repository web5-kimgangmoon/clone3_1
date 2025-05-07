import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { axiosSet } from "../lib/axios";
import axios from "axios";

export type ArticleItemTy = {
  id: number;
  img: string;
  icon: string;
  title: string;
  sub: string;
  like: number;
  looks: number;
  href: string;
  href_main: string;
  href_sub: string;
  subscribtion: string;
  img_list: { href: string; src: string }[];
};

export type ResponseData = {
  list: ArticleItemTy[];
  nextPage: number | false;
};

export const useGetBodyItem = (pageSize: number) =>
  useInfiniteQuery<
    ResponseData,
    Error,
    InfiniteData<ResponseData, number>,
    QueryKey,
    number | null
  >({
    queryKey: ["get", "item", pageSize],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await axiosSet.get("/list", {
        withCredentials: process.env.DEPLOY === "true",
        params: {
          start: pageParam !== null ? (pageParam - 1) * pageSize : null,
          limit: pageSize,
        },
      });
      return result.data;
    },
    initialPageParam: 1,
    getNextPageParam: (l, a) => {
      return l.nextPage ? l.nextPage : null;
    },

    // enabled,
    //   getPreviousPageParam: async (f, a) => {
    //     const result = await axiosSet.get("/list", { withCredentials: process.env.DEPLOY === "true",params:{f} });
    // return result
    //   },
  });
