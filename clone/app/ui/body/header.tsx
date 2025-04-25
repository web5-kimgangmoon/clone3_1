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
  Input,
  Label,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSection,
} from "@headlessui/react";

import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import useQuerySelected from "@/app/hooks/useQuerySelected";

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
    <section className="container pt-8">
      <Disclosure>
        <header>
          <div className="flex gap-10 justify-between">
            <MenuBtn_link list={menu} search_key="sort" />
            <Categories list={categories} search_key="category" />
            <DisclosureButton as={FilterBtn} />
          </div>
          <DisclosurePanel as={FilterSection} static />
        </header>
      </Disclosure>
    </section>
  );
};

const MenuBtn_link = ({
  className_menu,
  list,
  search_key,
}: {
  className_menu?: string;
  list: { title: string; href: string }[];
  search_key: string;
}) => {
  const { selected, mkLink } = useQuerySelected(search_key, list[0].href);

  return (
    <Menu>
      <div className="shrink-0">
        <MenuButton
          className={
            "flex items-center gap-4 px-4 py-[0.5rem] text-sm font-bold outline-0 cursor-pointer border border-gray-200 rounded-lg hover:shadow-bottom_s"
          }
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
            "outline-0 translate-y-3 bg-white border border-gray-200 p-3 rounded-lg",
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
                <span>{v.title}</span>
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
    <div className="relative min-w-0">
      <nav
        ref={emblaRef}
        className="relative flex grow h-full overflow-hidden px-4"
      >
        <ul className="flex gap-2 w-full h-full text-nowrap text-sm font-bold shrink-0 grow-0 basis-full">
          {list.map((v, idx) => (
            <li key={idx} className={clsx("block grow-0 shrink-0 basis-auto ")}>
              <Link
                href={mkLink(v.href)}
                className={clsx(
                  "flex items-center justify-center shrink-0 grow-0 h-full w-auto hover:text-black/50 transition-colors py-1 px-4 rounded-3xl",
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
  );
};

const FilterBtn = ({}: // setOpen,
{}) => {
  return (
    <DisclosureButton
      className={
        "flex justify-center items-center gap-1 ml-20 py-1 px-4 border border-gray-200 rounded-3xl cursor-pointer"
      }
    >
      <ListBulletIcon className="w-4 h-4" />
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
          className="w-full h-40 overflow-hidden"
          hidden={false}
          transition={{
            height: { duration: 0.1 },
            translateY: { duration: 0.1, bounce: 0 },
          }}
        >
          <Tags_search />
        </motion.section>
      )}
    </DisclosurePanel>
  );
};

const Tags_search = () => {
  const router = useRouter();
  const { mkLink } = useQuerySelected("tag", "");
  const submit = useCallback(
    (value: string) => {
      router.push(mkLink(value));
    },
    [mkLink, router]
  );
  return (
    <Field>
      <Label>Tags</Label>
      <Input
        placeholder=""
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            submit(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
        onChange={(e) => {
          if (e.currentTarget.value.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/) !== null)
            e.currentTarget.value = e.currentTarget.value.substring(
              0,
              e.currentTarget.value.length - 1
            );
        }}
      ></Input>
    </Field>
  );
};
