import clsx from "clsx";
import { Body_header } from "./header";
import Image from "next/image";
import { EyeIcon, HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type ArticleItem = {
  img: string;
  icon: string;
  title: string;
  sub: string;
  like: string;
  looks: string;
  href: string;
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
      <section className="container grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
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
}: ArticleItem) => {
  return (
    <article className="aspect-4/3">
      <div className={clsx("relative h-full rounded-xl")}>
        <figure className="w-full h-full relative">
          <Image src={"/" + img} alt={img} fill></Image>
        </figure>
        <Link
          href={href}
          className={clsx(
            "absolute top-0 left-0 w-full h-full",
            "before:block before:content-[''] before:w-full before:h-full before:bg-[image:var(--linear-article)] before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          )}
        >
          <div className="opacity-0 hover:opacity-100 absolute top-0 left-0 w-full h-full flex flex-col justify-end text-white">
            <span>Jobs platform dashboard</span>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-2 grid-rows-1 p-1">
        <div className="text-sm select-none">
          <button className="flex items-center gap-2 cursor-pointer">
            <Image
              src={"/" + icon}
              alt={icon}
              width={24}
              height={24}
              className="rounded-full"
            ></Image>
            <h3 className="font-bold">{title}</h3>
            <span className="block w-auto h-auto text-[0.65rem] font-bold text-white py-[0.1rem] px-[0.2rem] bg-gray-300 hover:bg-black rounded-sm">
              {sub}
            </span>
          </button>
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
      </div>
    </article>
  );
};
