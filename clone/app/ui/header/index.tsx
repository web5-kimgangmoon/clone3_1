import { Logo } from "@/public/logo";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useId, useMemo, useState } from "react";
import { Menu1_icon } from "@/public/menu1_icon1";
import { Menu1_icon2 } from "@/public/menu1_icon2";
import { Menu2_icon1 } from "@/public/menu2_icon1";
import { Menu2_icon2 } from "@/public/menu2_icon2";
import { Menu2_icon3 } from "@/public/menu2_icon3";
import { Menu2_icon4 } from "@/public/menu2_icon4";
import { Search } from "./search";
import { useEventListStore_globalClick } from "@/app/zustand/eventList_globalClick";

import { motion } from "motion/react";
import useLockScreen from "@/app/hooks/useLockScreen";

export const Header = () => {
  const textMenu1 = [
    { title: "Product Design", href: "Product Design" },
    { title: "Web Design", href: "Web Design" },
    { title: "Animation", href: "Design" },
    { title: "Branding", href: "Branding" },
    { title: "Illustration", href: "Illustration" },
    { title: "Mobile", href: "Mobile" },
    { title: "Typography", href: "Typography" },
    { title: "Print", href: "Print" },
  ];

  const imgMenu1 = [
    { img: <Menu1_icon />, title: "Popular", href: "Popular" },
    {
      img: <Menu1_icon2 />,
      title: "New and Noteworthy",
      href: "new and noteworthy",
    },
  ];

  const imgMenu2 = [
    {
      img: <Menu2_icon1 />,
      title: "Browse Freelancers",
      href: "Browse Freelancers",
    },
    {
      img: <Menu2_icon2 />,
      title: "Purchase Services",
      href: "Purchase Services",
    },
    {
      img: <Menu2_icon3 />,
      title: "Submit a Project Brief",
      href: "Submit a Project Brief",
    },
    {
      img: <Menu2_icon4 />,
      title: "Post a Full-Time Job",
      href: "Post a Full-Time Job",
    },
  ];

  const autofillMenu = [
    { title: "Product Design", href: "Product Design" },
    { title: "Web Design", href: "Web Design" },
    { title: "Animation", href: "Design" },
    { title: "Branding", href: "Branding" },
    { title: "Illustration", href: "Illustration" },
    { title: "Mobile", href: "Mobile" },
    { title: "Typography", href: "Typography" },
    { title: "Print", href: "Print" },
  ];

  const [menu, setMenu] = useState("Shots");
  const [search, setSearch] = useState("");

  return (
    <header className="fixed top-0 left-0 flex items-center gap-[16px] w-full h-[100px] py-5 px-[40px] bg-white">
      <MenuNav_m />
      <Link href={"/"} className="w-[89px] *:w-full *:h-full shrink-0">
        <Logo />
      </Link>
      <Search
        menu={menu}
        setMenu={setMenu}
        search={search}
        setSearch={setSearch}
        autofillMenu={autofillMenu}
      />
      <div className="hidden xl:flex items-center shrink-0 ml-3">
        <MenuNav textMenuArr={textMenu1} menuArr={imgMenu1} title="Explore" />
        <MenuNav menuArr={imgMenu2} title="Hire a Designer" />
        <Link
          href={"/"}
          className="block px-3 py-5 shrink-0 text-sm font-semibold hover:opacity-50"
        >
          Find Jobs
        </Link>
        <Link
          href={"/"}
          className="block px-3 py-5 shrink-0 text-sm font-semibold hover:opacity-50"
        >
          Blog
        </Link>
      </div>
      <div className="flex items-center justify-end grow shrink-0">
        <Link
          href={"/"}
          className="block px-3 py-5 shrink-0 text-sm font-semibold hover:opacity-50 transition-opacity"
        >
          Sign up
        </Link>
        <Link
          href={"/"}
          className="flex items-center px-5 py-3 h-max shrink-0 text-sm text-white bg-black font-semibold hover:opacity-50 transition-opacity rounded-3xl"
        >
          Log in
        </Link>
      </div>
    </header>
  );
};

const MenuNav_m = () => {
  const prevent = useEventListStore_globalClick((state) => state.prevent);
  const push = useEventListStore_globalClick((state) => state.push);

  const [isOn, setIsOn] = useState(false);
  const id = useId();
  const ev = useMemo(() => ({ id, func: () => setIsOn(false) }), []);
  push(ev);

  useLockScreen(isOn);
  return (
    <>
      <button
        className="relative w-6 aspect-square mt-1 mr-1 cursor-pointer overflow-hidden"
        onClick={() => {
          prevent(id);
          setIsOn((v) => !v);
        }}
      >
        <motion.div
          className={clsx(
            "absolute left-0 w-full border-b-3 rounded-full transition-all",
            {
              "top-0": !isOn,
              "rotate-45 top-3": isOn,
            }
          )}
        ></motion.div>
        <motion.div
          className={clsx(
            "absolute top-2 left-0 w-full border-b-3 rounded-full transition-transform",
            {
              "-translate-x-1/4": !isOn,
              "-translate-x-full": isOn,
            }
          )}
        ></motion.div>
        <motion.div
          className={clsx(
            "absolute w-full  left-0 border-b-3 rounded-full transition-all",
            {
              "-translate-x-1/2 top-4": !isOn,
              "-rotate-45 top-3": isOn,
            }
          )}
        ></motion.div>
      </button>
      <div
        className="fixed top-[100px] left-0 bg-black/50 w-full h-full"
        hidden={!isOn}
      ></div>
    </>
  );
};

const MenuNav = ({
  title,
  menuArr,
  textMenuArr,
}: {
  title: string;
  menuArr: { img: React.ReactNode; href: string; title: string }[];
  textMenuArr?: { title: string; href: string }[];
}) => {
  return (
    <div className="relative group/root">
      <button
        type="button"
        className="flex items-center gap-1 px-3 py-5 cursor-pointer group/btn"
      >
        <span className="text-sm font-semibold group-hover/btn:opacity-50">
          {title}
        </span>
        <span className="*:w-full *:h-full w-[12px] text-black">
          <ChevronDownIcon fillRule="evenodd" />
        </span>
      </button>
      <div
        className={clsx(
          "absolute bottom-auto -left-3 min-w-[228px] h-max select-none transition-all",
          "group-hover/root:visible group-hover/root:translate-y-0",
          "-translate-y-[5px] invisible",
          "text-sm bg-white border-2 border-gray-100/50 rounded-lg shadow-bottom"
        )}
      >
        <ul className={clsx("px-6", textMenuArr ? "pt-3" : "py-3")}>
          {menuArr.map((v, idx) => (
            <li className="block group" key={idx}>
              <Link
                className="flex items-center gap-2 w-full py-3 font-bold"
                href={v.href}
              >
                <div className="w-6 shrink-0">{v.img}</div>
                <span className="group-hover:opacity-50 text-nowrap">
                  {v.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {textMenuArr && <NavTextMenu textMenuArr={textMenuArr} />}
      </div>
    </div>
  );
};

const NavTextMenu = ({
  textMenuArr,
}: {
  textMenuArr: { title: string; href: string }[];
}) => {
  return (
    <ul
      className={clsx(
        "flex flex-col px-6 py-3 *:cursor-pointer",
        "before:content-[''] before:block before:pb-3 before:w-full before:border-t before:border-gray-300"
      )}
    >
      {textMenuArr.map((v, idx) => (
        <li
          className={clsx("block w-full py-3 rounded-lg hover:opacity-50")}
          key={idx}
        >
          <Link href={v.href}>{v.title}</Link>
        </li>
      ))}
    </ul>
  );
};
