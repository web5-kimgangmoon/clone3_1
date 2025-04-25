import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export type MenuItem = { title: string; href: string };
export type MenuList = MenuItem[];

export default function (search_key: string, init: string) {
  const query = useSearchParams();
  const url = useMemo(() => {
    return new URLSearchParams(query.toString());
  }, [query]);
  const mkLink = useCallback(
    (href: string) => {
      url.set(search_key, href);
      return "?" + url.toString();
    },
    [url, search_key]
  );
  return { selected: query.get(search_key) ?? init, mkLink };
}
