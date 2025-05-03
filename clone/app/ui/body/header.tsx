import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSection,
  Select,
} from "@headlessui/react";

import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import useQuerySelected from "@/app/hooks/useQuerySelected";
import { SearchToggleImg } from "@/public/searchToggleImg";
import { useFilteredNumENg } from "@/app/hooks/useFilteredNumEng";
import { ColorSearch_icon } from "@/public/colorSearch";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const Body_header = () => {
  const menu: { title: string; href: string }[] = [
    { title: "Popular", href: "popular" },
    { title: "New & Noteworthy", href: "recent" },
  ];
  const categories: { title: string; href: string }[] = [
    { title: "Discover", href: "discover" },
    { title: "Animation", href: "animation" },
    { title: "Branding", href: "branding" },
    { title: "Illustration", href: "illustaration" },
    { title: "Mobile", href: "mobile" },
    { title: "Print", href: "print" },
    { title: "Product Design", href: "product-design" },
    { title: "Typography", href: "typography" },
    { title: "Web Design", href: "web-design" },
  ];

  return (
    <header className="pt-4 lg:pt-8">
      <Disclosure>
        <section>
          <div className="relative container flex gap-y-5 pb-5 justify-between flex-wrap lg:flex-nowrap z-10">
            <div className="grow shrink-0 mr-[10px] lg:mr-[30px] xl:mr-[40px]">
              <MenuBtn_link list={menu} search_key="sort" />
            </div>
            <Categories list={categories} search_key="category" />
            <DisclosureButton as={FilterBtn} />
          </div>
          <DisclosurePanel as={FilterSection} static />
        </section>
      </Disclosure>
    </header>
  );
};

const MenuBtn_link = ({
  className_menu,
  className_btn,
  className_container,
  list,
  search_key,
}: {
  className_menu?: string;
  className_btn?: string;
  className_container?: string;
  list: { title: string; href: string }[];
  search_key: string;
}) => {
  const { selected, mkLink } = useQuerySelected(search_key, list[0].href);

  return (
    <Menu>
      <div className={clsx("shrink-0", className_container)}>
        <MenuButton
          className={clsx(
            "flex justify-between items-center gap-4 px-4 py-[0.5rem] text-sm font-bold outline-0 cursor-pointer border border-gray-200 rounded-lg hover:shadow-bottom_s",
            className_btn
          )}
        >
          {({ open }) => (
            <>
              <span>{list.find((v) => v.href === selected)?.title}</span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ bounce: 0 }}
              >
                <ChevronDownIcon className="h-3" />
              </motion.span>
            </>
          )}
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className={clsx(
            "outline-0 translate-y-3 bg-white border border-gray-200 p-3 rounded-lg z-20",
            className_menu
          )}
          modal={false}
        >
          {list.map((v, idx) => (
            <MenuItem key={idx}>
              <Link
                href={mkLink(v.href)}
                className={clsx(
                  "flex w-full justify-between text-xs text-left p-3 rounded-lg hover:bg-gray-100/50 cursor-pointer",
                  selected === v.href && "bg-gray-200/50 "
                )}
              >
                <span className="pr-4">{v.title}</span>
                <span hidden={selected !== v.href}>
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

const Categories = ({
  list,
  search_key,
}: {
  list: { href: string; title: string }[];
  search_key: string;
}) => {
  const { selected, mkLink } = useQuerySelected(search_key, list[0].href);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    watchDrag: false,
    inViewThreshold: 1,
  });

  const [position, setPosition] = useState(-2);
  useEffect(() => {
    if (emblaApi) {
      const ev = (e: UseEmblaCarouselType[1]) => {
        if (e?.slidesNotInView().length === 0) return setPosition(-2);
        if (e?.slidesInView().includes(0)) return setPosition(-1);
        if (e?.slidesInView().includes(list.length - 1)) return setPosition(1);
        return setPosition(0);
      };
      ev(emblaApi);
      emblaApi?.on("slidesInView", ev);
      return () => {
        emblaApi?.off("slidesInView", ev);
      };
    }
  }, [emblaApi]);

  return (
    <div className="relative flex min-w-0 grow-1 shrink-1 w-full mx-[-15px] lg:w-fit order-3 lg:order-none bg-white pt-5 lg:pt-0 border-gray-200 border-t lg:border-t-0 z-10 px-[15px]">
      <div className="relative grow-1 shrink-1 w-full">
        <nav
          ref={emblaRef}
          className="relative flex grow h-full overflow-hidden px-4"
        >
          <ul className="flex gap-2 w-full h-full text-nowrap text-sm font-bold shrink-0 grow-0 basis-full">
            {list.map((v, idx) => (
              <li
                key={idx}
                className={clsx("block grow-0 shrink-0 basis-fit ")}
              >
                <Link
                  href={mkLink(v.href)}
                  className={clsx(
                    "flex items-center justify-center shrink-0 grow-0 h-full w-fit hover:text-black/50 transition-colors py-1 px-4 rounded-3xl",
                    selected === v.href &&
                      "hover:text-black! hover:bg-zinc-200/75 bg-zinc-200/50"
                  )}
                >
                  {v.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="absolute top-1/2 left-0 -translate-y-1/2 flex justify-center items-center h-full aspect-square cursor-pointer"
          onClick={() => {
            emblaApi?.scrollTo(0);
            setPosition(1);
          }}
          hidden={position === -1 || position === -2}
          style={{
            background:
              "linear-gradient(to left, rgba(255, 255, 255, 0.5), rgba(255,255,255,1),rgba(255,255,255,1))",
          }}
        >
          <ChevronLeftIcon className="w-4" strokeWidth={3} />
        </button>
        <button
          className="absolute top-1/2 right-0 -translate-y-1/2 flex justify-center items-center h-full aspect-square cursor-pointer"
          onClick={() => {
            emblaApi?.scrollTo(list.length - 1);
            setPosition(-1);
          }}
          hidden={position === 1 || position === -2}
          style={{
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0.5),rgba(255,255,255,1), rgba(255,255,255,1),rgba(255,255,255,1))",
          }}
        >
          <ChevronRightIcon className="w-4" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

const FilterBtn = ({}: // setOpen,
{}) => {
  const searchs = useSearchParams();
  const cnt = useMemo(() => {
    let cnt = 0;
    if (searchs.get("color") !== null) cnt++;
    if (searchs.get("tag") !== null) cnt++;
    if (searchs.get("timeframe") !== null) cnt++;
    return cnt;
  }, [searchs]);
  return (
    <DisclosureButton
      className={
        "flex justify-center items-center gap-2 ml-20 py-1 px-4 border border-gray-200 rounded-3xl cursor-pointer"
      }
    >
      {cnt === 0 ? (
        <ListBulletIcon className="w-4 h-4" />
      ) : (
        <div className="flex justify-center items-center w-4 h-4 rounded-full bg-pink-300 text-[0.6rem] text-white">
          {cnt}
        </div>
      )}
      <span className="text-sm">Filters</span>
    </DisclosureButton>
  );
};

const FilterSection = () => {
  return (
    <DisclosurePanel static>
      {({ open }: { open: boolean }) => (
        <motion.section
          initial={{ height: 0 }}
          animate={{
            height: open ? "auto" : "0",
            translateY: open ? 0 : "-100%",
          }}
          className="w-full overflow-hidden"
          hidden={false}
          transition={{
            height: { duration: 0.1 },
            translateY: { duration: 0.1, bounce: 0 },
          }}
        >
          <Fieldset
            className={"container grid lg:grid-cols-3 gap-10 pt-8 pb-4"}
          >
            <Field as={Tags_search} />
            <Field as={Colors_search} />
            <Field as={Timeframe_select} />
          </Fieldset>
        </motion.section>
      )}
    </DisclosurePanel>
  );
};

const Tags_search = () => {
  const router = useRouter();

  const { mkLink, selected } = useQuerySelected("tag", "");
  const { mkAlphabetStr, value } = useFilteredNumENg(selected);

  const submit = useCallback(
    (value: string) => {
      router.push(mkLink(value));
    },
    [mkLink, router]
  );
  const clear = useCallback(() => {
    router.push(mkLink(""));
    mkAlphabetStr("");
  }, [mkLink, router]);

  return (
    <Field>
      <div className="w-full text-sm">
        <div className="flex justify-between pb-2">
          <Legend className={"font-bold"}>Tags</Legend>
          <button
            className={clsx(
              selected === "" ? "hidden" : "block text-xs cursor-pointer"
            )}
            onClick={clear}
          >
            Clear
          </button>
        </div>
        <Label className={clsx("relative block")}>
          <span
            className={
              "absolute top-1/2 -translate-y-1/2 left-3 w-[1.1rem] *:w-full text-gray-500"
            }
          >
            <SearchToggleImg />
          </span>
          <Input
            autoComplete={"off"}
            className={clsx(
              "w-full h-full outline-none transition-all duration-250 border border-gray-200 pl-10 pr-6 py-4 rounded-xl",
              "hover:shadow-pink",
              "focus:shadow-pink focus:border-pink-200"
            )}
            placeholder=""
            value={value}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                submit(value);
              }
            }}
            onChange={(e) => {
              mkAlphabetStr(e.currentTarget.value);
              // e.currentTarget.value = mkAlphabetStr(e.currentTarget.value);
            }}
            onBlur={(e) => {
              submit(value);
            }}
          />
        </Label>
      </div>
    </Field>
  );
};

const Colors_search = () => {
  const router = useRouter();

  const { mkLink, selected } = useQuerySelected("color", "");
  const { mkAlphabetStr, value } = useFilteredNumENg(selected, 6);
  const [isFocus, setIsFocus] = useState(false);

  const isBlank = useMemo(() => !isFocus && !value, [isFocus, value]);
  const submit = useCallback(
    (value: string) => {
      const upper = value.toUpperCase();
      mkAlphabetStr(upper);
      router.push(mkLink(upper));
    },
    [mkLink, router]
  );
  const clear = useCallback(() => {
    router.push(mkLink(""));
    mkAlphabetStr("");
  }, [mkLink, router]);

  const colors = useMemo(() => {
    const set = new Set<string>();
    for (let i = 0; i < 105; i++) {
      let result = Math.round(Math.random() * 1000000);
      while (result < 100000) {
        result *= 10;
      }

      set.add(String(result));
    }
    while (set.size !== 105) {
      let result = Math.round(Math.random() * 1000000);
      while (result < 100000) {
        result *= 10;
      }
      set.add(String(result));
    }
    return [...set.values()];
  }, []);

  return (
    <div>
      <Field>
        <div className="w-full text-sm relative">
          <div className="flex justify-between pb-2">
            <Legend className={"font-bold"}>Color</Legend>
            <button
              className={clsx(
                selected === "" ? "hidden" : "block text-xs cursor-pointer"
              )}
              onClick={clear}
            >
              Clear
            </button>
          </div>
          <Label className={clsx("relative block")}>
            <span
              className={
                "absolute top-1/2 -translate-y-1/2 left-3 w-[1.1rem] *:w-full"
              }
              hidden={selected.length > 0}
            >
              <ColorSearch_icon />
            </span>
            <span
              className={
                "absolute top-1/2 -translate-y-1/2 left-3 w-[1.1rem] h-[1.1rem] rounded-full"
              }
              style={{ backgroundColor: "#" + selected }}
              hidden={!selected}
            >
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-white rounded-full"></span>
            </span>
            <span
              hidden={isBlank}
              className={"absolute top-1/2 -translate-y-1/2 left-10 w-[1.1rem]"}
            >
              #
            </span>

            <Input
              autoComplete={"off"}
              className={clsx(
                "w-full h-full outline-none border border-gray-200 pr-6 py-4 rounded-xl",
                "hover:shadow-pink",
                "focus:shadow-pink focus:border-pink-200",
                isBlank ? "pl-10" : "pl-12"
              )}
              style={{
                transitionProperty: "box-shadow, border-color",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDuration: "250ms",
              }}
              placeholder="Enter hex or select"
              value={value}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  submit(value);
                }
              }}
              onChange={(e) => {
                mkAlphabetStr(e.currentTarget.value);
                // e.currentTarget.value = mkAlphabetStr(e.currentTarget.value);
              }}
              onFocus={() => setIsFocus(true)}
              onBlur={(e) => {
                setIsFocus(false);
                submit(value);
              }}
            />
          </Label>
        </div>
      </Field>
      <Palette
        isFocus={isFocus}
        colors={colors}
        mkAlphabetStr={mkAlphabetStr}
        router={router}
        mkLink={mkLink}
      />
    </div>
  );
};

const Palette = ({
  isFocus,
  colors,
  mkAlphabetStr,
  router,
  mkLink,
}: {
  isFocus: boolean;
  colors: string[];
  mkAlphabetStr: (str: string) => void;
  router: AppRouterInstance;
  mkLink: (str: string) => string;
}) => {
  return (
    <Menu>
      <div className="h-0">
        <MenuButton className={"w-full"}></MenuButton>
        <MenuItems
          anchor={"bottom start"}
          className={clsx(
            "translate-y-[0px] w-[var(--button-width)] h-32 overflow-hidden border border-gray-300 rounded-lg bg-white"
          )}
          modal={false}
          static
          unmount={false}
          hidden={!isFocus}
        >
          {
            <ul className="grid grid-cols-15 w-full h-32 px-4 pt-4 pb-1">
              {colors.map((v, idx) => (
                <MenuItem key={idx}>
                  <li
                    className="cursor-pointer hover:scale-150"
                    style={{ backgroundColor: "#" + v }}
                    onPointerDown={(e) => {
                      mkAlphabetStr(v);
                      router.push(mkLink(v));
                    }}
                  ></li>
                </MenuItem>
              ))}
            </ul>
          }
        </MenuItems>
      </div>
    </Menu>
  );
};

const Timeframe_select = () => {
  const router = useRouter();

  const { mkLink, selected } = useQuerySelected("timeframe", "");

  const clear = useCallback(() => {
    router.push(mkLink(""));
  }, [mkLink, router]);

  return (
    <div className="flex flex-col w-full text-sm">
      <div className="flex justify-between pb-2">
        <h2 className={"font-bold"}>Timeframe</h2>
        <button
          className={clsx(
            selected === "" ? "hidden" : "block text-xs cursor-pointer"
          )}
          hidden={selected === ""}
          onClick={clear}
        >
          Clear
        </button>
      </div>
      <MenuBtn_link
        search_key="timeframe"
        className_container="grow"
        className_btn="w-full h-full !rounded-xl"
        className_menu="w-[var(--button-width)]"
        list={[
          { href: "", title: "NOW" },
          { href: "week", title: "This Past Week" },
          { href: "month", title: "This Past Month" },
          { href: "year", title: "This Past Year" },
          { href: "ever", title: "All Time" },
        ]}
      ></MenuBtn_link>
    </div>
  );
};
