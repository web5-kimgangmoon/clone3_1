import clsx from "clsx";
import { Body_header } from "./header";
import Image from "next/image";
import {
  ArrowUpIcon,
  ChevronUpIcon,
  DocumentIcon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArticleItemTy } from "@/app/request/useGetBodyItem";
import { unitconvertor } from "@/app/lib/unitconvertor";
import { useBreakpointStore } from "@/app/zustand/breakpoint";
// import { useLenis } from "lenis/react";

export const Body = ({
  articleList,
  nextPage,
  isFetchingNextPage,
  hasNextPage,
}: {
  articleList: ArticleItemTy[];
  nextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}) => {
  const ref = useRef(null);
  const btnRef = useRef<null | HTMLButtonElement>(null);
  const scroll = useScroll({ target: ref });
  // const lenis = useLenis();
  const change = useCallback(
    (l: number) => {
      if (l > 0.8 && !isFetchingNextPage && hasNextPage) {
        nextPage();
      }
    },
    [isFetchingNextPage, hasNextPage, nextPage]
  );
  useMotionValueEvent(scroll.scrollYProgress, "change", change);
  useEffect(() => {
    if (btnRef.current && scroll.scrollYProgress.get() === 0) {
      btnRef.current.style.opacity = "0%";
      btnRef.current.style.visibility = "hidden";
    }
    if (btnRef.current && scroll.scrollYProgress.get() === 1) {
      btnRef.current.style.position = "absolute";
      btnRef.current.style.bottom = "25px";
    }

    scroll.scrollYProgress.on("change", (l) => {
      if (btnRef.current && scroll.scrollYProgress.get() === 0) {
        btnRef.current.style.opacity = "0%";
        btnRef.current.style.visibility = "hidden";
      } else if (btnRef.current && scroll.scrollYProgress.get() !== 0) {
        btnRef.current.style.opacity = "30%";
        btnRef.current.style.visibility = "visible";
      }
      if (l === 1 && btnRef.current) {
        btnRef.current.style.position = "absolute";
        btnRef.current.style.bottom = "25px";
      } else if (l !== 1 && btnRef.current) {
        btnRef.current.style.position = "fixed";
        btnRef.current.style.bottom = "15px";
      }
    });
  }, [btnRef]);
  return (
    <div
      className={clsx(
        "relative w-full h-auto",
        "before:content-[''] before:block before:pt-[120px] before:md:pt-[100px] before:bg-white"
      )}
      ref={ref}
    >
      <Body_header />
      <section className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-10">
        {articleList.map((v, idx) => (
          <ArticleItem {...v} idx={idx + 1} key={v.id} />
        ))}
      </section>
      <div className="flex justify-center w-full h-max pt-12">
        <Link
          href={"/"}
          className="flex items-center px-5 py-[0.6rem] shrink-0 text-[0.85rem] md:text-sm text-white bg-black font-semibold hover:opacity-50 transition-opacity rounded-3xl"
        >
          Sign up to continue
        </Link>
      </div>
      <button
        ref={btnRef}
        className={clsx(
          "right-0 -translate-x-5 p-[0.6rem] bg-black opacity-30 rounded-full cursor-pointer transition-opacity"
        )}
        style={{ position: "absolute" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpIcon className="w-[1.3rem] text-white" />
      </button>
    </div>
  );
};

const ArticleItem = ({
  img,
  icon,
  title,
  sub,
  like,
  looks,
  href,
  href_main,
  href_sub,
  subscribtion,
  img_list,
  idx,
}: ArticleItemTy & { idx: number }) => {
  const [hoverBtnLine, setHoverBtnLine] = useState(false);
  const [openHoverCard, setOpenHoverCard] = useState(false);
  useEffect(() => {
    if (!hoverBtnLine) setOpenHoverCard(false);
  }, [hoverBtnLine]);
  const bp = useBreakpointStore((state) => state.breakpoint);
  const isEnd = useMemo(() => {
    let result: boolean = false;
    if (bp === "xxl" && idx % 4 === 0) result = true;
    if (bp === "xl" && idx % 3 === 0) result = true;
    if (bp === "md" && idx % 2 === 0) result = true;
    return result;
  }, [bp]);
  return (
    <article className={clsx("aspect-4/3")}>
      <div className={clsx("relative h-full rounded-xl")}>
        <figure className="w-full h-full relative">
          <Image src={"/" + img} alt={img} fill className="rounded-xl"></Image>
        </figure>
        <Link
          href={href}
          className={clsx(
            "absolute top-0 left-0 w-full h-full group/link",
            "before:block before:content-[''] before:w-full before:h-full before:bg-[image:var(--linear-article)] before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          )}
        >
          <div className="opacity-0 group-hover/link:opacity-100 absolute top-3/4 left-0 flex gap-2 justify-between items-center w-full h-[25%] p-3 text-white font-bold">
            <span className="truncate">Jobs platform dashboard</span>
            <div className="flex gap-2">
              <span className="inline-block text-black bg-white rounded-full p-3 transition-colors hover:text-black/50">
                <DocumentIcon className="w-5" />
              </span>
              <span className="inline-block text-black bg-white rounded-full p-3 transition-colors hover:text-black/50">
                <HeartIcon className="w-5" />
              </span>
            </div>
          </div>
        </Link>
      </div>
      <motion.div
        className="relative grid grid-cols-2 grid-rows-1 p-1"
        onHoverStart={() => setHoverBtnLine(true)}
        onHoverEnd={() => setHoverBtnLine(false)}
      >
        <motion.div
          className={clsx(
            "absolute top-0 -translate-y-full w-[500px] h-[200px] z-10",
            {
              "left-0": !isEnd,
              "-left-1/2": isEnd,
            }
          )}
          initial={{ display: "none" }}
          animate={{
            display: openHoverCard ? "block" : "none",
            opacity: openHoverCard ? 1 : 0,
          }}
          transition={{ duration: openHoverCard ? 0.1 : 0 }}
        >
          <HoverCardContent
            href={href}
            sub={sub}
            href_main={href_main}
            href_sub={href_sub}
            title={title}
            subscribtion={subscribtion}
            icon={icon}
            img_list={img_list}
          />
        </motion.div>
        <div className="flex items-center gap-2 text-sm select-none">
          <motion.a
            className="flex items-center gap-2 cursor-pointer"
            onHoverStart={() => {
              setOpenHoverCard(true);
            }}
            href={href_main}
          >
            <Image
              src={"/" + icon}
              alt={icon}
              width={24}
              height={24}
              className="rounded-full"
            ></Image>
            <h3 className="font-bold">{title}</h3>
          </motion.a>
          <Link
            href={href_sub}
            className="block w-fit h-fit text-[0.65rem] font-bold text-white py-[0.1rem] px-[0.2rem] bg-gray-300 hover:bg-black rounded-sm cursor-pointer"
          >
            {sub}
          </Link>
        </div>
        <div className="flex justify-end items-center basis-full gap-2">
          <span className="flex items-center gap-1">
            <HeartIcon
              className="w-[16px] h-[16px] text-gray-600/75"
              fill="currentColor"
            />
            <span className="text-xs">{unitconvertor(like)}</span>
          </span>
          <span className="flex items-center gap-1">
            <EyeIcon className="w-[16px] h-[16px]" />
            <span className="text-xs">{unitconvertor(looks)}</span>
          </span>
        </div>
      </motion.div>
    </article>
  );
};

const HoverCardContent = ({
  href,
  icon,
  href_sub,
  href_main,
  sub,
  title,
  subscribtion,
  img_list,
}: {
  href: string;
  icon: string;
  href_sub: string;
  href_main: string;
  sub: string;
  title: string;
  subscribtion: string;
  img_list: { src: string; href: string }[];
}) => {
  return (
    <div
      className="grid w-full h-full p-6 bg-white rounded-xl shadow-xl"
      style={{ gridTemplateRows: "max-content auto" }}
    >
      <div className="flex items-center">
        <div className="relative w-fit h-fit">
          <Link href={href}>
            <Image
              src={"/" + icon}
              alt={icon}
              width={52}
              height={52}
              className="rounded-full"
            ></Image>
          </Link>
          <Link
            href={href_sub}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 block w-fit h-fit text-[0.65rem] font-bold text-white py-[0.1rem] px-[0.2rem] bg-gray-300 hover:bg-black rounded-sm cursor-pointer"
          >
            {sub}
          </Link>
        </div>
        <div className="grow pl-3">
          <Link className="block text-md w-fit" href={href_main}>
            {title}
          </Link>
          <span className="block text-xs text-gray-500">{subscribtion}</span>
        </div>
        <Link
          href={"/"}
          className="flex items-center px-4 py-2 h-max shrink-0 text-[0.85rem] md:text-sm text-black bg-white border border-gray-200 font-semibold hover:border-gray-300 transition-colors rounded-3xl"
        >
          Follow
        </Link>
        <Link
          href={"/"}
          className="flex items-center px-4 py-2 ml-2 h-max shrink-0 text-[0.85rem] md:text-sm text-white bg-black font-semibold hover:opacity-50 transition-opacity rounded-3xl"
        >
          Get in touch
        </Link>
      </div>
      <ul className="flex h-full gap-3 pt-3">
        {img_list.map((v, idx) => (
          <li key={idx} className="w-full h-full rounded-xl">
            <Link
              href={v.href}
              className="block relative w-full h-full rounded-xl"
            >
              <Image fill src={v.src} alt={v.src} className="rounded-xl" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
