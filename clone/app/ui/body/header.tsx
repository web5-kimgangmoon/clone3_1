import {
  CheckIcon,
  ChevronDownIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSection,
} from "@headlessui/react";

import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export const Body_header = () => {
  const menu: { title: string; href: string }[] = [
    { title: "Popular", href: "popular" },
    { title: "New & Noteworthy", href: "recent" },
  ];
  const categories: { title: string; href: string }[] = [
    { title: "Discover", href: "?category=Discover" },
    { title: "Animation", href: "?category=Animation" },
    { title: "Branding", href: "?category=Branding" },
    { title: "Illustration", href: "?category=Illustaration" },
    { title: "Mobile", href: "?category=Mobile" },
    { title: "Print", href: "?category=Print" },
    { title: "Product Design", href: "?category=Product Design" },
    { title: "Typography", href: "?category=Typography" },
    { title: "Web Design", href: "?category=Web Design" },
  ];

  // const queryState = useQueryStore((state) => state.query);

  return (
    <section className="container pt-8">
      <header className="flex gap-10 justify-between">
        <MenuBtn_link list={menu} search_key="sort" />
        <Categories list={categories} />
        <Filters />
      </header>
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
  const query = useSearchParams();
  const [open, setOpen] = useState(false);

  const url = useMemo(() => {
    return new URLSearchParams(query);
  }, [query]);
  const selectedMenu = query.get(search_key) ?? list[0].href;

  return (
    <Menu data-open={open}>
      <div className="shrink-0">
        <MenuButton
          className={
            "flex items-center gap-4 px-4 py-[0.5rem] text-sm font-bold outline-0 cursor-pointer border border-gray-200 rounded-lg hover:shadow-bottom_s"
          }
          onClick={(e) => {
            setOpen((v) => !v);
          }}
        >
          {list.find((v) => v.href === selectedMenu)?.title}
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
          {list.map((v, idx) => {
            url.set(search_key, v.href);
            return (
              <MenuItem key={idx}>
                <Link
                  href={`?${url.toString()}`}
                  className={clsx(
                    "flex w-full justify-between text-xs text-left p-3 rounded-lg hover:bg-gray-100/50 cursor-pointer",
                    selectedMenu === v.href && "bg-gray-200/50 "
                  )}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <span>{v.title}</span>
                  <span hidden={selectedMenu !== v.href}>
                    <CheckIcon className="w-3 text-black" />
                  </span>
                </Link>
              </MenuItem>
            );
          })}
        </MenuItems>
      </div>
    </Menu>
  );
};

const Categories = ({ list }: { list: { href: string; title: string }[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    watchDrag: false,
    inViewThreshold: 1,
  });

  const [position, setPosition] = useState(-2);
  useEffect(() => {
    const ev = (e: UseEmblaCarouselType[1]) => {
      if (e?.slidesNotInView().length === 0) return setPosition(-2);
      if (e?.slidesInView().includes(0)) return setPosition(-1);
      if (e?.slidesInView().includes(list.length - 1)) return setPosition(1);
      return setPosition(0);
    };
    if (emblaApi) ev(emblaApi);
    emblaApi?.on("slidesInView", ev);
    // emblaApi?.on("reInit", ev);
    return () => {
      emblaApi?.off("slidesInView", ev);
      // emblaApi?.off("reInit", ev);
    };
  }, [emblaApi]);

  // main
  // viewport
  // container
  // slide
  return (
    <div className="relative min-w-0">
      <nav
        ref={emblaRef}
        className="relative flex grow max-w-[800px] h-full overflow-hidden px-4"
      >
        <ul className="flex gap-8 w-full h-full text-nowrap text-xs font-bold shrink-0 grow-0 basis-full">
          {list.map((v, idx) => (
            <li
              key={idx}
              className="flex items-center justify-center grow-0 shrink-0 basis-auto"
            >
              <Link href={v.href} className="shrink-0 grow-0">
                {v.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="absolute top-1/2 left-0 -translate-y-1/2"
        onClick={() => emblaApi?.scrollTo(0)}
        hidden={position === -1 || position === -2}
      >
        prev
      </button>
      <button
        className="absolute top-1/2 right-0 -translate-y-1/2"
        onClick={() => emblaApi?.scrollTo(list.length - 1)}
        hidden={position === 1 || position === -2}
      >
        next
      </button>
    </div>
  );
};

// const Categories = ({ list }: { list: { title: string; href: string }[] }) => {
//   return (
//     <Swiper
//       modules={[Navigation]}
//       slidesPerView={"auto"}
//       loop
//       spaceBetween={32}
//       wrapperClass="!w-fit text-xs font-bold"
//       // navigation
//       allowTouchMove={false}
//     >
//       {list.map((v, idx) => (
//         <SwiperSlide
//           key={idx}
//           className="!w-fit !flex justify-center items-center"
//         >
//           <Link href={v.href}>{v.title}</Link>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

const Filters = () => {
  const [open, setOpen] = useState(false);
  return (
    <Menu data-oepn={open}>
      <div>
        <MenuButton>
          <ListBulletIcon className="w-4 h-4" />
        </MenuButton>
        <MenuSection></MenuSection>
      </div>
    </Menu>
  );
};
