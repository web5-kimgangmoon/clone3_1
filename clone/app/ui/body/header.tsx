import { useEventListStore_globalClick } from "@/app/zustand/eventList_globalClick";
import {
  ArrowDownIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { motion } from "motion/react";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import calcBoundMove from "calc-bound-move";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";

export const Body_header = () => {
  const list: string[] = ["Popular", "New & Noteworthy"];
  const categories: { title: string; href: string }[] = [
    { title: "Discover", href: "/" },
    { title: "Animation", href: "/" },
    { title: "Branding", href: "/" },
    { title: "Illustration", href: "/" },
    { title: "Mobile", href: "/" },
    { title: "Print", href: "/" },
    { title: "Product Design", href: "/" },
    { title: "Typography", href: "/" },
    { title: "Web Design", href: "/" },
  ];

  const [selectedMenu, setSelectedMenu] = useState(list[0]);

  return (
    <section className="container pt-8">
      <header className="flex justify-between">
        {/* <MenuBtn
          title={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          list={list}
          selectedMenu={selectedMenu}
        />
        <Categories /> */}
        <div></div>
        <div></div>
      </header>
    </section>
  );
};

const MenuBtn = ({
  className_menu,
  title,
  list,
  selectedMenu,
  setSelectedMenu,
}: {
  className_menu?: string;
  title: string;
  list: { title: string; href: string }[];
  setSelectedMenu: (str: string) => void;
  selectedMenu: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Menu data-open={open}>
      <div>
        <MenuButton
          className={
            "flex items-center gap-4 px-4 py-[0.5rem] text-sm font-bold outline-0 cursor-pointer border border-gray-200 rounded-lg hover:shadow-bottom_s"
          }
          onClick={(e) => {
            setOpen((v) => !v);
          }}
        >
          {title}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ bounce: 0 }}
          >
            <ChevronDownIcon className="h-3" />
          </motion.span>
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className={clsx(
            "outline-0 translate-y-3 bg-white border border-gray-200 p-3 rounded-lg",
            className_menu
          )}
          modal={false}
        >
          {list.map((v, idx) => (
            <MenuItem key={idx}>
              <Link
                className={clsx(
                  "flex w-full justify-between text-xs text-left p-3 rounded-lg hover:bg-gray-100/50 cursor-pointer",
                  selectedMenu === v.title && "bg-gray-200/50 "
                )}
                href={v.href}
                onClick={() => setSelectedMenu(v.title)}
              >
                <span>{v.title}</span>
                <span hidden={selectedMenu !== v.title}>
                  <CheckIcon className="w-3 text-black" />
                </span>
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </div>
    </Menu>
  );
};

const Categories = ({ list }: { list: { title: string; href: string }[] }) => {
  return (
    <Swiper modules={[Navigation]}>
      {list.map((v, idx) => (
        <SwiperSlide key={idx}>
          <Link href={v.href}>{v.title}</Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

// const MenuBtn = () => {
//   const [open, setOpen] = useState(false);
//   return (
//     <Menu.Root
//       modal={false}
//       open={open}
//       onOpenChange={() => setOpen((v) => !v)}
//     >
//       <Menu.Trigger className={"flex"}>
//         Popular
//         <ChevronDownIcon className="w-4 h-4" fillRule="evenodd" />
//       </Menu.Trigger>
//       <Menu.Portal>
//         <Menu.Positioner>
//           <Menu.Popup>
//             <Menu.Arrow className={"w-4 h-4"}></Menu.Arrow>
//             <Menu.Item>그냥</Menu.Item>
//             <Menu.Item>그냥</Menu.Item>
//             <Menu.Item>그냥</Menu.Item>
//             <Menu.Item>그냥</Menu.Item>
//             <Menu.Item>그냥</Menu.Item>
//           </Menu.Popup>
//         </Menu.Positioner>
//       </Menu.Portal>
//     </Menu.Root>
//   );
// };

// const MenuBtn = () => {
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
//   const isOpen = useMemo(() => Boolean(anchorEl), [anchorEl]);
//   const handleClick = useCallback(
//     (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget),
//     []
//   );
//   const close = useCallback(() => setAnchorEl(null), []);
//   return (
//     <>
//       <Button
//         sx={{ backgroundColor: "white", minWidth: "0px" }}
//         id="basic-button"
//         onClick={handleClick}
//         aria-controls={isOpen ? "basic-menu" : undefined}
//         aria-haspopup="true"
//         aria-expanded={isOpen ? "true" : undefined}
//         disableFocusRipple
//         disableTouchRipple
//         disableElevation
//       >
//         아아
//       </Button>
//       <Menu
//         disableScrollLock
//         id="basic-menu"
//         open={isOpen}
//         onClose={close}
//         slotProps={{ list: { "aria-labelledby": "basic-button" } }}
//         anchorEl={anchorEl}

//       >
//         <MenuList>
//           <MenuItem onClick={close}>아아</MenuItem>
//         </MenuList>
//         <MenuList>
//           <MenuItem onClick={close}>나나</MenuItem>
//         </MenuList>
//       </Menu>
//     </>
//   );
// };

const Acorrdion = ({
  menuArr,
  setMenu,
  selectedMenu,
}: // setIsOn,
// isOn,
{
  menuArr: string[];
  setMenu: (str: string) => void;
  selectedMenu: string;
  // setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
  // isOn: boolean;
}) => {
  const push = useEventListStore_globalClick((state) => state.push);
  const prevent = useEventListStore_globalClick((state) => state.prevent);

  const id = useId();
  const [isOn, setIsOn] = useState(false);

  const menuEv = useMemo(() => ({ func: () => setIsOn(false), id }), []);

  useEffect(() => {
    push(menuEv);
  }, []);
  return (
    <>
      <div
        className="relative cursor-default mr-4"
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
