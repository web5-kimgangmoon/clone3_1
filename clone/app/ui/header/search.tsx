import { GetSearchResult } from "@/app/components/getSearchResult";
import { Menu2_icon1 } from "@/public/menu2_icon1";
import clsx from "clsx";
import Link from "next/link";

import { motion } from "motion/react";
import { useEventListStore_globalClick } from "@/app/zustand/eventList_globalClick";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const Search = ({
  menu,
  setMenu,
  search,
  setSearch,
  autofillMenu,
}: {
  menu: string;
  setMenu: (str: string) => void;
  search: string;
  setSearch: (str: string) => void;
  autofillMenu: { title: string; href: string }[];
}) => {
  const push = useEventListStore_globalClick((state) => state.push);
  const prevent = useEventListStore_globalClick((state) => state.prevent);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isOnAutofill, setIsOnAutofill] = useState(false);
  const [isOnSelect, setIsOnSelect] = useState(false);

  const autofillId = useId();
  const selectId = useId();

  const selectEv = useMemo(
    () => ({ func: () => setIsOnSelect(false), id: selectId }),
    []
  );
  const autofillEv = useMemo(
    () => ({ func: () => setIsOnAutofill(false), id: autofillId }),
    []
  );

  useEffect(() => {
    push(selectEv);
    push(autofillEv);
  }, []);
  return (
    // <div className="absolute md:relative top-full left-0 md:static md:ml-6 py-2 md:py-0 flex items-center shrink-1 grow-1 w-full bg-white h-[60px]">
    <form className="flex relative shrink-1 grow-1 px-4 md:px-0 md:ml-6 pb-2 md:py-0 flex items-center shrink-1 grow-1 w-full bg-white ">
      <search
        className={clsx(
          "group flex items-center w-full pl-6 pr-1 bg-gray-100 rounded-4xl h-[48px] md:h-[60px]",
          "border-3 border-gray-100 hover:border-pink-100 hover:bg-white transition-all",
          "focus-within:border-pink-100 focus-within:bg-white"
        )}
      >
        <div
          className="flex h-full grow gap-4 items-center cursor-none pr-4"
          onClick={(e) => {
            inputRef.current!.focus();
            prevent(autofillId);
            setIsOnAutofill(true);
          }}
        >
          <input
            placeholder="What are you looking for?"
            className="h-full shrink-1 outline-0 placeholder group-hover:truncate peer"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.currentTarget.value);
              setIsOnAutofill(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
              if (e.key === "Escape") {
                if (isOnAutofill) setIsOnAutofill(false);
                else setSearch("");
              }
            }}
            ref={inputRef}
          />
          <button
            className={clsx(
              "w-7 text-gray-100 group-hover:text-gray-400 peer-focus:text-gray-400 hover:text-black cursor-pointer",
              search ? "visible" : "invisible"
            )}
            aria-hidden={search ? false : true}
            type="button"
            onClick={(e) => {
              setSearch("");
            }}
          >
            <XMarkIcon strokeWidth={1.5} />
          </button>
        </div>
        <Select
          menuArr={["Shots", "Designers", "Services"]}
          selectedMenu={menu}
          setMenu={setMenu}
          prevent={() => prevent(selectId)}
          setIsOn={setIsOnSelect}
          isOn={isOnSelect}
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
          search={search}
          prevent={() => prevent(autofillId)}
        />
      </search>
    </form>
    // </div>
  );
};

const Select = ({
  menuArr,
  setMenu,
  selectedMenu,
  prevent,
  setIsOn,
  isOn,
}: {
  menuArr: string[];
  setMenu: (str: string) => void;
  selectedMenu: string;
  prevent: () => void;
  setIsOn: Dispatch<SetStateAction<boolean>>;
  isOn: boolean;
}) => {
  return (
    <>
      <div
        className="relative cursor-default mr-4"
        onClick={(e) => {
          prevent();
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
          className={clsx(
            "absolute bottom-auto right-0 md:left-0 w-max h-max select-none"
          )}
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
          aria-hidden={!isOn}
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

const AutofillBox = ({
  menuArr,
  isOn,
  search,
  prevent,
}: {
  menuArr: { title: string; href: string }[];
  isOn: boolean;
  search: string;

  prevent: () => void;
}) => {
  return (
    <div
      className={clsx(
        "absolute top-full translate-y-4 md:translate-y-1 left-0 w-full h-max select-none transition-all",
        "text-sm bg-white border-2 border-gray-100/50 rounded-lg shadow-bottom cursor-default"
      )}
      onClick={(e) => {
        prevent();
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
                  "group-hover/autofill:opacity-50 text-nowrap truncate whitespace-prewrap",
                  search === "" && "font-semibold"
                )}
              >
                <GetSearchResult search={search} title={v.title} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
