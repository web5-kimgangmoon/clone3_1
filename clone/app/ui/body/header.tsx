import { useEventListStore_globalClick } from "@/app/zustand/eventList_globalClick";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { motion } from "motion/react";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import { Menu, MenuItem, MenuList } from "@mui/material";

export const Body_header = () => {
  const [isOn, setIsOn] = useState(false);
  const toggle = useCallback(() => setIsOn((v) => !v), []);
  return (
    <section>
      <Button
        id="basic-button"
        onClick={toggle}
        aria-controls={isOn ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOn ? "true" : undefined}
      >
        아아
      </Button>
      <Menu
        id="basic-menu"
        open={isOn}
        onClose={() => setIsOn(false)}
        slotProps={{ list: { "aria-labelledby": "basic-button" } }}
      >
        {/* <MenuList> */}
        <MenuItem onClick={toggle}>아아</MenuItem>
        {/* </MenuList> */}
        {/* <MenuList> */}
        <MenuItem onClick={toggle}>나나</MenuItem>
        {/* </MenuList> */}
      </Menu>
    </section>
  );
};

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
