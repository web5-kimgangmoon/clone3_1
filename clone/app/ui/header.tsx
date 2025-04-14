import Logo from "@/public/Logo.tsx";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Ref, RefObject, useEffect, useRef, useState } from "react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 flex justify-between items-center gap-[16px] w-full py-5 px-[40px]">
      <Link href={"/"} className="w-[89px] *:w-full *:h-full shrink-0">
        <Logo />
      </Link>
      <search className="pl-6 min-w-0 grow-1">
        <form
          className={clsx(
            "flex w-full max-w-[520px] pl-6 pr-12 bg-gray-100 rounded-4xl",
            "outline-3 outline-gray-100 hover:outline-pink-100 hover:bg-white transition-all"
          )}
        >
          <input
            placeholder="What are you looking for?"
            className="shrink-1 outline-0 placeholder"
            type="text"
          />
          <Select />
          <button>
            <MagnifyingGlassIcon />
          </button>
        </form>
      </search>
      <Select />
      <Select />
      <Select />
      <button className="shrink-0">Sign up</button>
      <button className="shrink-0">Log in</button>
    </header>
  );
};

const Select = () => {
  return (
    <>
      <Menu />
      <select className="appearance-none outline-none" hidden>
        <option>s</option>
        <option>d</option>
        <option>q</option>
      </select>
    </>
  );
};

const Menu = () => {
  const [isOn, setIsOn] = useState(false);
  const selectIdx = 1;
  useEffect(() => {
    document.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOn(false);
    });
  }, []);

  return (
    <div
      className="relative"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <button
        type="button"
        className="flex items-center gap-1 py-3"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsOn((v) => !v);
        }}
      >
        <span className="text-sm">Shots</span>
        <span className="*:w-full *:h-full h-[12px]">
          <ChevronDownIcon fillRule="evenodd" />
        </span>
      </button>
      <div
        className={clsx(
          "absolute -bottom-max left-0 w-max h-max",
          isOn || "hidden"
        )}
      >
        <ul className="flex flex-col p-4 text-sm bg-white gap-1 border border-gray-600">
          {["Shots", "Designers", "Services"].map((v, idx) => (
            <li
              className={clsx(
                "block w-full px-3 py-2 bg-red-300",
                selectIdx === idx && "font-bold"
              )}
              key={idx}
            >
              {v}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
