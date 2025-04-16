import { Logo } from "@/public/logo.tsx";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";
import { useObservableStore_globalClick } from "../zustand/observable_globalClick";
import { Menu1_icon } from "@/public/menu1_icon1";
import { Menu1_icon2 } from "@/public/menu1_icon2";
import { Menu2_icon1 } from "@/public/menu2_icon1";
import { Menu2_icon2 } from "@/public/menu2_icon2";
import { Menu2_icon3 } from "@/public/menu2_icon3";
import { Menu2_icon4 } from "@/public/menu2_icon4";

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

  const autofillId = useId();
  const prevent = useObservableStore_globalClick((state) => state.prevent);

  const [isOnAutofill, setIsOnAutofill] = useState(false);

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
            "border-3 border-gray-100 hover:border-pink-100 hover:bg-white transition-all",
            "focus-within:border-pink-100 focus-within:bg-white"
          )}
          onClick={(e) => {
            prevent(autofillId);
            inputRef.current!.focus();
            setIsOnAutofill(true);
          }}
        >
          <input
            placeholder="What are you looking for?"
            className="shrink-1 outline-0 placeholder group-hover:truncate peer"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
              if (e.key === "Escape") {
                setSearch("");
              }
            }}
            ref={inputRef}
          />
          <button
            className={clsx(
              "w-7 text-gray-100 group-hover:text-gray-400 peer-focus:text-gray-400 hover:text-black cursor-pointer",
              search ? "visible" : "invisible"
            )}
            type="button"
            // hidden={search ? false : true}
            onClick={(e) => {
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
            onClick={(e) => {}}
          >
            <MagnifyingGlassIcon />
          </button>
          <AutofillBox
            menuArr={autofillMenu}
            isOn={isOnAutofill}
            setIsOn={setIsOnAutofill}
            isEmpty={search === ""}
            id={autofillId}
          />
        </search>
      </form>
      <div className="flex items-center shrink-0 ml-3">
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
  const prevent = useObservableStore_globalClick((state) => state.prevent);

  const id = useId();
  const [isOn, setIsOn] = useState(false);
  const observer = useMemo(() => ({ func: () => setIsOn(false), id }), []);

  useEffect(() => {
    subscribe(observer);
  }, []);
  return (
    <div
      className="relative cursor-default"
      onClick={(e) => {
        prevent(id);
      }}
    >
      <button
        type="button"
        className="flex items-center gap-1 py-3 cursor-pointer group/option"
        onClick={(e) => {
          setIsOn((v) => !v);
        }}
      >
        <span className="text-[0.9rem] font-semibold group-hover/option:opacity-50">
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
        className={clsx("absolute bottom-auto left-0 w-max h-max select-none")}
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
                setMenu(v);
                setIsOn(false);
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

const AutofillBox = ({
  menuArr,
  isOn,
  setIsOn,
  isEmpty,
  id,
}: {
  menuArr: { title: string; href: string }[];
  isOn: boolean;
  setIsOn: (is: boolean) => void;
  isEmpty: boolean;
  id: string;
}) => {
  const subscribe = useObservableStore_globalClick((state) => state.subscribe);
  const prevent = useObservableStore_globalClick((state) => state.prevent);

  const observer = useMemo(() => ({ func: () => setIsOn(false), id }), []);

  useEffect(() => {
    subscribe(observer);
  }, []);

  return (
    <div
      className={clsx(
        "absolute top-full translate-y-1 left-0 w-full h-max select-none transition-all",
        "text-sm bg-white border-2 border-gray-100/50 rounded-lg shadow-bottom cursor-default"
      )}
      onClick={(e) => {
        prevent(id);
      }}
      hidden={!isOn}
    >
      <ul className={clsx("px-5", "py-3")}>
        {menuArr.map((v, idx) => (
          <li className="block group/autofill" key={idx}>
            <Link className="flex items-center gap-2 w-full py-3" href={v.href}>
              <div className="w-4 shrink-0">
                <Menu2_icon1 />
              </div>
              <span
                className={clsx(
                  "group-hover/autofill:opacity-50 text-nowrap truncate",
                  isEmpty && "!font-normal"
                )}
              >
                {v.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
