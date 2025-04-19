import { Logo } from "@/public/logo";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
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

import { motion, useScroll } from "motion/react";
import useLockScreen from "@/app/hooks/useLockScreen";
import { SearchToggleImg } from "@/public/searchToggleImg";
import { useBreakpointStore } from "@/app/zustand/breakpoint";

export const Header = () => {
  const navMenuList = [
    {
      title: "Explore",
      href: "/",
      textMenuArr: [
        { title: "Product Design", href: "Product Design" },
        { title: "Web Design", href: "Web Design" },
        { title: "Animation", href: "Design" },
        { title: "Branding", href: "Branding" },
        { title: "Illustration", href: "Illustration" },
        { title: "Mobile", href: "Mobile" },
        { title: "Typography", href: "Typography" },
        { title: "Print", href: "Print" },
      ],
      menuArr: [
        { img: <Menu1_icon />, title: "Popular", href: "Popular" },
        {
          img: <Menu1_icon2 />,
          title: "New and Noteworthy",
          href: "new and noteworthy",
        },
      ],
    },
    {
      title: "Hire a Designer",
      href: "/",
      textMenuArr: undefined,
      menuArr: [
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
      ],
    },
    { title: "Find jobs", href: "/" },
    { title: "Blog", href: "/" },
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

  const [isOnSearch, setIsOnSearch] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const scroll = useScroll();
  const breakpoint = useBreakpointStore((state) => state.breakpoint);

  const isMobile = useMemo(
    () => breakpoint === "xs" || breakpoint === "sm",
    [breakpoint]
  );
  const isSearchAnime = useMemo(
    () => isTop || isOnSearch || (breakpoint !== "xs" && breakpoint !== "sm"),
    [isTop, isOnSearch, breakpoint]
  );

  useEffect(() => {
    if (scroll.scrollY.get() === 0) setIsTop(true);
    else setIsTop(false);
    scroll.scrollY.on("change", (l) => {
      l === 0 ? setIsTop(true) : setIsTop(false);
    });
  }, []);
  return (
    <header
      className={clsx(
        "fixed top-0 left-0 z-100 flex items-center gap-[13px] w-full py-2 md:py-0 px-4 md:py-5 md:px-[40px]",
        "before:absolute before:content-[''] before:blcok before:top-0 before:left-0 before:bg-white before:w-full before:h-full before:z-[-1]"
      )}
    >
      <MenuNav_m navMenuList={navMenuList} />
      <Link href={"/"} className="w-[89px] *:w-full *:h-full shrink-0">
        <Logo />
      </Link>
      <motion.div
        className="flex shrink-1 grow-1 w-full md:max-w-[544px] absolute md:relative top-0 left-0 z-[-2] md:z-0"
        animate={["toggleAnime", "shiftLayout"]}
        variants={{
          toggleAnime: {
            translateY: isSearchAnime ? "0px" : "-10px",
            visibility: isSearchAnime ? "visible" : "hidden",
            opacity: isSearchAnime ? 1 : 0,
          },
          shiftLayout: {
            top: isMobile ? "100%" : "0",
            transition: {
              duration: 0.3,
              bounce: 0,
            },
          },
        }}
        transition={isMobile ? { bounce: 0, duration: 0.2 } : { duration: 0 }}
        aria-hidden={!isSearchAnime}
      >
        <Search
          menu={menu}
          setMenu={setMenu}
          search={search}
          setSearch={setSearch}
          autofillMenu={autofillMenu}
        />
      </motion.div>
      <div className="hidden xl:flex items-center shrink-0 ml-3">
        {navMenuList.map((v, idx) => (
          <MenuNav
            title={v.title}
            href={v.href}
            textMenuArr={v.textMenuArr}
            menuArr={v.menuArr}
            key={idx}
          />
        ))}
      </div>
      <div className="flex items-center justify-end grow shrink-0">
        <button
          className={clsx(
            "inline-block md:hidden mr-4 cursor-pointer transition-opacity",
            isTop && "opacity-0"
          )}
          onClick={() => setIsOnSearch((v) => !v)}
        >
          <SearchToggleImg />
        </button>
        <Link
          href={"/"}
          className="hidden md:block px-3 py-5 shrink-0 text-sm font-semibold hover:opacity-50 transition-opacity"
        >
          Sign up
        </Link>
        <Link
          href={"/"}
          className="flex items-center px-6 md:px-5 py-3 h-max shrink-0 text-[0.85rem] md:text-sm text-white bg-black font-semibold hover:opacity-50 transition-opacity rounded-3xl"
        >
          Log in
        </Link>
      </div>
    </header>
  );
};

const MenuNav_m = ({
  navMenuList,
}: {
  navMenuList: {
    title: string;
    href: string;
    textMenuArr?: { title: string; href: string }[];
    menuArr?: { title: string; img: React.ReactNode; href: string }[];
  }[];
}) => {
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
        className="block xl:hidden relative shrink-0 w-6 aspect-square mt-1 mr-1 cursor-pointer overflow-hidden"
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
      <motion.div
        className={clsx(
          "absolute top-full left-0 block xl:hidden w-full bg-white h-auto max-h-[calc(100vh-100%)] px-7 py-4 border-t border-gray-200 z-10 overflow-y-scroll transition-opacity"
        )}
        onClick={(e) => {
          prevent(id);
        }}
        initial={{ visibility: "hidden", opacity: 0 }}
        animate={{
          visibility: isOn ? "visible" : "hidden",
          opacity: isOn ? 1 : 0,
        }}
        aria-hidden={!isOn}
      >
        <ul>
          {navMenuList.map((v, idx) => (
            <MenuNavItem_m
              textMenuArr={v.textMenuArr}
              title={v.title}
              href={v.href}
              menuArr={v.menuArr}
              idx={idx}
              key={idx}
              isOn={isOn}
            />
          ))}
        </ul>
      </motion.div>
      <motion.div
        className={clsx(
          "absolute top-full left-0 block xl:hidden bg-black/50 w-full h-screen transition-opacity"
        )}
        initial={{ visibility: "hidden", opacity: 0 }}
        animate={{
          visibility: isOn ? "visible" : "hidden",
          opacity: isOn ? 1 : 0,
        }}
        aria-hidden={!isOn}
      ></motion.div>
    </>
  );
};

const MenuNavItem_m = ({
  title,
  href,
  textMenuArr,
  menuArr,
  isOn,
  idx,
}: {
  title: string;
  href: string;
  textMenuArr?: { title: string; href: string }[];
  menuArr?: { title: string; img: React.ReactNode; href: string }[];
  isOn: boolean;
  idx: number;
}) => {
  return (
    <motion.li
      initial={{ translateX: "-45px" }}
      animate={{
        translateX: isOn ? "0px" : "-45px",
      }}
      transition={{ delay: idx * 0.05, duration: 0.2 }}
    >
      {menuArr ? (
        <AccordionItem_m
          title={title}
          menuArr={menuArr}
          textMenuArr={textMenuArr}
        />
      ) : (
        <LinkItem_m title={title} href={href} />
      )}
    </motion.li>
  );
};

const AccordionItem_m = ({
  title,
  textMenuArr,
  menuArr,
}: {
  title: string;
  textMenuArr: { title: string; href: string }[] | undefined;
  menuArr: { title: string; img: React.ReactNode; href: string }[];
}) => {
  const [isOn, setIsOn] = useState(false);
  return (
    <>
      <button
        onClick={(e) => setIsOn((v) => !v)}
        className="flex items-center gap-2 font-extrabold text-lg cursor-pointer py-3 group"
      >
        <h4 className="group-hover:opacity-60">{title}</h4>
        <span className="*:w-full *:h-full w-[12px] text-black">
          <ChevronDownIcon
            fillRule="evenodd"
            className={clsx(isOn && "hidden")}
          />
          <ChevronUpIcon
            fillRule="evenodd"
            className={clsx(isOn || "hidden")}
          />
        </span>
      </button>
      <motion.nav
        initial={{ height: 0 }}
        animate={{ height: isOn ? "auto" : "0" }}
        className="overflow-hidden"
      >
        {menuArr.map((v, idx) => (
          <Link
            className="flex items-center gap-2 py-4 hover:opacity-60"
            href={v.href}
            key={idx}
          >
            <span className="w-[20px] *:w-full *:h-full">{v.img}</span>
            <h4 className="font-bold">{v.title}</h4>
          </Link>
        ))}
        {textMenuArr && <div className="pt-4 mt-3 border-t border-gray-300" />}
        {textMenuArr &&
          textMenuArr.map((v, idx) => (
            <Link
              className={"block text-sm py-4 hover:opacity-60"}
              href={v.href}
              key={idx}
            >
              {v.title}
            </Link>
          ))}
      </motion.nav>
    </>
  );
};

const LinkItem_m = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link className={"block font-extrabold text-lg py-4"} href={href}>
      {title}
    </Link>
  );
};

const MenuNav = ({
  title,
  href,
  menuArr,
  textMenuArr,
}: {
  title: string;
  href: string;
  menuArr?: { img: React.ReactNode; href: string; title: string }[];
  textMenuArr?: { title: string; href: string }[];
}) => {
  return (
    <div className="relative group/root">
      <Link
        href={href}
        className="flex items-center gap-1 px-3 py-5 cursor-pointer group/btn text-sm font-semibold"
      >
        <h4 className="group-hover/btn:opacity-50">{title}</h4>
        {menuArr && (
          <span className="*:w-full *:h-full w-[12px] text-black">
            <ChevronDownIcon fillRule="evenodd" />
          </span>
        )}
      </Link>
      {menuArr && (
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
      )}
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
