"use client";

import { useScroll } from "motion/react";
import { useGetBodyItem } from "../request/useGetBodyItem";
import { useInit } from "../request/useInit";
import { Body } from "../ui/body";
import { Suspense, useState } from "react";

// export const BodyContainer = () => {
//   const init = useInit();
//   return <InnterBodyContainer isInit={init.isFetched} />;
// };

// export const InnterBodyContainer = ({ isInit }: { isInit: boolean }) => {
//   const list = useGetBodyItem(10, isInit);
//   const articles = list.data?.pages[0].list ? list.data.pages[0].list : [];

//   return (
//     <Suspense fallback={<div>로딩중입니다</div>}>
//       <Body
//         articleList={articles}
//         nextPage={() => list.fetchNextPage()}
//         isFetchingNextPage={list.isFetchingNextPage}
//         hasNextPage={list.hasNextPage}
//       />
//     </Suspense>
//   );
// };

export const BodyContainer = () => {
  const list = useGetBodyItem(10);
  const articles = list.data?.pages
    ? list.data?.pages.flatMap((v, idx) => v.list)
    : [];
  return (
    <Suspense fallback={<div>로딩중입니다</div>}>
      <Body
        articleList={articles}
        nextPage={() => list.fetchNextPage()}
        isFetchingNextPage={list.isFetchingNextPage}
        hasNextPage={list.hasNextPage}
      />
    </Suspense>
  );
};
