import { useEventListStore_globalClick } from "@/app/zustand/eventList_globalClick";
import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { motion } from "motion/react";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export const Body_header = () => {
  return (
    <section className="container">
      <MenuBtn />
    </section>
  );
};

const MenuBtn = () => {
  const list = ["popular", "New & Noteworthy"];

  const [open, setOpen] = useState(false);

  return (
    <Menu data-open={open}>
      <div>
        <MenuButton
          className={"flex items-center outline-0"}
          onClick={(e) => {
            setOpen((v) => !v);
          }}
        >
          Popular
          <motion.div
            animate={{ rotate: open ? "180deg" : "0" }}
            transition={{ bounce: 0 }}
          >
            <ChevronDownIcon className="w-3" />
          </motion.div>
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          className={"flex flex-col outline-0"}
          modal={false}
        >
          {list.map((v, idx) => (
            <MenuItem key={idx}>
              <button>{v}</button>
            </MenuItem>
          ))}
        </MenuItems>
      </div>
    </Menu>
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
