import Logo from "@/public/Logo.tsx";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { motion } from "motion/react";
import { useObservableStore_globalClick } from "../zustand/observable_globalClick";
import { Menu1_icon } from "@/public/menu1_icon1";
import { Menu1_icon2 } from "@/public/menu1_icon2";

export const Header = () => {
  const textMenu1 = [
    { title: "Product", href: "Product" },
    { title: "Design", href: "Design" },
    { title: "Web", href: "Web" },
    { title: "Design", href: "Design" },
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

  const [menu, setMenu] = useState("Shots");
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <header className="fixed top-0 left-0 flex items-center gap-[16px] w-full py-5 px-[40px]">
      <Link href={"/"} className="w-[89px] *:w-full *:h-full shrink-0">
        <Logo />
      </Link>
      <form className="ml-6 shrink-1 grow-1 max-w-[520px]">
        <search
          className={clsx(
            "group relative flex items-center gap-4 w-full pl-6 pr-1 py-1 bg-gray-100 rounded-4xl cursor-none",
            "border-3 border-gray-100 hover:border-pink-100 hover:bg-white transition-all"
          )}
          onClick={(e) => inputRef.current!.focus()}
        >
          <input
            placeholder="What are you looking for?"
            className="shrink-1 outline-0 placeholder group-hover:truncate"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            ref={inputRef}
          />
          <button
            className="w-7 text-gray-100 group-hover:text-gray-400 hover:text-black cursor-pointer"
            type="button"
            hidden={search ? false : true}
            onClick={(e) => {
              e.stopPropagation();
              setSearch("");
            }}
          >
            <XMarkIcon strokeWidth={1.5} />
          </button>
          <Select
            menuArr={["Shots", "Designers", "Services"]}
            selectedMenu={menu}
            setMenu={setMenu}
          />
          <button
            className="flex justify-center items-center w-10 shrink-0 p-[0.6rem] rounded-full text-white bg-pink-500/85 cursor-pointer hover:opacity-75 transition-opacity"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MagnifyingGlassIcon />
          </button>
        </search>
      </form>
      <MenuNav textMenuArr={textMenu1} menuArr={imgMenu1} title="Explore" />
      {/* <MenuNav/> */}
      <Link href={"/"} className="shrink-0">
        나나
      </Link>
      <Link href={"/"} className="shrink-0">
        아아
      </Link>
      <div className="flex justify-end grow">
        <button className="shrink-0">Sign up</button>
        <button className="shrink-0">Log in</button>
      </div>
    </header>
  );
};

const Select = ({
  menuArr,
  setMenu,
  selectedMenu,
}: {
  menuArr: string[];
  setMenu: (str: string) => void;
  selectedMenu: string;
}) => {
  return (
    <>
      <Menu menuArr={menuArr} setMenu={setMenu} selectedMenu={selectedMenu} />
      <select
        className="appearance-none outline-none"
        hidden
        name="option"
        onChange={() => {}}
        value={selectedMenu}
      >
        {menuArr.map((v, idx) => (
          <option key={idx}>{v}</option>
        ))}
      </select>
    </>
  );
};

const Menu = ({
  menuArr,
  setMenu,
  selectedMenu,
}: {
  menuArr: string[];
  setMenu: (str: string) => void;
  selectedMenu: string;
}) => {
  const subscribe = useObservableStore_globalClick((state) => state.subscribe);
  const [isOn, setIsOn] = useState(false);
  const setIsOn_false = useCallback(() => setIsOn(false), []);

  subscribe(setIsOn_false);

  return (
    <div
      className="relative"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        type="button"
        className="flex items-center gap-1 py-3 cursor-pointer group"
        onClick={(e) => {
          e.stopPropagation();
          setIsOn((v) => !v);
        }}
      >
        <span className="text-sm font-semibold group-hover:opacity-50">
          {selectedMenu}
        </span>
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
      <motion.div
        className={clsx("absolute -bottom-max left-0 w-max h-max select-none")}
        initial={{ visibility: "hidden" }}
        animate={{
          translateY: isOn ? 0 : -10,
          visibility: isOn ? "visible" : "hidden",
        }}
        transition={{
          delay: 0,
          duration: 0.1,
          bounce: 0,
          display: { delay: 0, duration: 0, bounce: 0 },
        }}
      >
        <ul className="flex flex-col p-3 text-sm bg-white border-2 border-gray-100/50 rounded-lg shadow-bottom *:cursor-pointer">
          {menuArr.map((v, idx) => (
            <li
              className={clsx(
                "block w-[120px] px-3 py-2 rounded-lg hover:bg-gray-100/50",
                v === selectedMenu && "font-bold"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setMenu(v);
                setIsOn_false();
              }}
              key={idx}
            >
              {v}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

const MenuNav = ({
  title,
  menuArr,
  textMenuArr,
}: {
  title: string;
  menuArr?: { img: React.ReactNode; href: string; title: string }[];
  textMenuArr: { title: string; href: string }[];
}) => {
  const subscribe = useObservableStore_globalClick((state) => state.subscribe);
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="relative group/root">
      <button
        type="button"
        className="flex items-center gap-1 py-3 cursor-pointer group/btn"
      >
        <span className="text-sm font-semibold group-hover/btn:opacity-50">
          {title}
        </span>
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
      <div
        className={clsx(
          "absolute -bottom-max left-0 w-[228px] h-max select-none transition-all",
          "group-hover/root:visible group-hover/root:translate-y-0",
          "-translate-y-[5px] invisible"
        )}
      >
        <ul className="flex flex-col p-3 text-sm bg-white border-2 border-gray-100/50 rounded-lg shadow-bottom *:cursor-pointer">
          {textMenuArr.map((v, idx) => (
            <li
              className={clsx(
                "block w-[120px] px-3 py-2 rounded-lg hover:bg-gray-100/50"
              )}
              key={idx}
            >
              {v.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
