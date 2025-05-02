import clsx from "clsx";
import { Body_header } from "./header";
import Image from "next/image";
import { DocumentIcon, EyeIcon, HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

type ArticleItem = {
  img: string;
  icon: string;
  title: string;
  sub: string;
  like: string;
  looks: string;
  href: string;
  href_main: string;
  href_sub: string;
};

export const Body = () => {
  const articleList: ArticleItem[] = [
    {
      img: "article1img.webp",
      icon: "article1.png",
      title: "widelab",
      sub: "Team",
      like: "111",
      looks: "20.3k",
      href: "/",
      href_main: "/",
      href_sub: "/",
    },
  ];
  return (
    <div
      className={clsx(
        "w-full h-[40rem]",
        "before:content-[''] before:block before:pt-[120px] before:md:pt-[100px] before:bg-white"
      )}
    >
      <Body_header />
      <section className="container grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-10">
        {articleList.map((v, idx) => (
          <ArticleItem {...v} key={idx} />
        ))}
        {articleList.map((v, idx) => (
          <ArticleItem {...v} key={idx} />
        ))}
        {articleList.map((v, idx) => (
          <ArticleItem {...v} key={idx} />
        ))}
        {articleList.map((v, idx) => (
          <ArticleItem {...v} key={idx} />
        ))}
      </section>
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
}: ArticleItem) => {
  const [hoverBtnLine, setHoverBtnLine] = useState(false);
  const [openHoverCard, setOpenHoverCard] = useState(false);
  useEffect(() => {
    if (!hoverBtnLine) setOpenHoverCard(false);
  }, [hoverBtnLine]);
  return (
    <article className="aspect-4/3">
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
              <span className="inline-block text-black bg-white rounded-full p-3">
                <DocumentIcon className="w-5" />
              </span>
              <span className="inline-block text-black bg-white rounded-full p-3">
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
          className="absolute top-0 -translate-y-full left-0 w-[500px] h-[200px] bg-red-300 rounded-xl z-10 shadow-xl"
          initial={{ display: "none" }}
          animate={{
            display: openHoverCard ? "block" : "none",
            opacity: openHoverCard ? 1 : 0,
          }}
          transition={{ duration: openHoverCard ? 0.1 : 0 }}
          // style={{ transitionBehavior: "allow-discrete" }}
        >
          <div>
            <Link href={href}>
              <Image
                src={"/" + icon}
                alt={icon}
                width={24}
                height={24}
                className="rounded-full"
              ></Image>
            </Link>
            <Link
              href={href_sub}
              className="block w-auto h-auto text-[0.65rem] font-bold text-white py-[0.1rem] px-[0.2rem] bg-gray-300 hover:bg-black rounded-sm cursor-pointer"
            >
              {sub}
            </Link>
          </div>
          <div></div>
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
            className="block w-auto h-auto text-[0.65rem] font-bold text-white py-[0.1rem] px-[0.2rem] bg-gray-300 hover:bg-black rounded-sm cursor-pointer"
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
            <span className="text-xs">{like}</span>
          </span>
          <span className="flex items-center gap-1">
            <EyeIcon className="w-[16px] h-[16px]" />
            <span className="text-xs">{looks}</span>
          </span>
        </div>
      </motion.div>
    </article>
  );
};
