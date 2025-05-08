import { InstagramIcon } from "@/public/Instagram_icon";
import { Logo } from "@/public/Logo";
import clsx from "clsx";
import Link from "next/link";
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TelegramIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

export const Footer = () => {
  return (
    <footer className="pt-24 pb-12 mx-4 md:mx-5">
      <div className="flex flex-col xl:flex-row justify-center items-center flex-wrap">
        <h2 className="flex justify-center">
          <Link href={"/"} className="*:w-24 *:text-black">
            <Logo />
          </Link>
        </h2>
        <nav className="grow">
          <ul className="flex justify-center gap-2 xl:gap-6 flex-wrap text-sm font-bold">
            {[
              "For designers",
              "Hire talent",
              "Inspiration",
              "Advertising",
              "Blog",
              "About",
              "Careers",
              "Support",
            ].map((v, idx) => (
              <Link key={idx} href={"/"}>
                {v}
              </Link>
            ))}
          </ul>
        </nav>
        <ul className="flex justify-center items-center py-3">
          <li className="px-1">
            <TwitterShareButton url="/">
              <TwitterIcon
                bgStyle={{ fill: "transparent" }}
                iconFillColor="black"
                size={35}
              />
            </TwitterShareButton>
          </li>
          <li className="pr-3 pl-1">
            <FacebookShareButton hashtag="#cloneCoding" url="/">
              <FacebookIcon
                size={20}
                bgStyle={{
                  fill: "black",
                }}
              />
            </FacebookShareButton>
          </li>
          <li className="px-1 pb-1">
            <Link href={"/"} className="block w-[20px]">
              <InstagramIcon />
            </Link>
          </li>
          <li className="px-1">
            <PinterestShareButton url="/" media="/">
              <PinterestIcon
                bgStyle={{ fill: "white" }}
                iconFillColor="black"
                size={35}
              />
            </PinterestShareButton>
          </li>
        </ul>
      </div>
      <div className="w-full pt-12 flex gap-y-2 items-center lg:justify-between flex-col lg:flex-row text-sm text-gray-500">
        <nav className="flex gap-3">
          <h3 className="inline-block">© 2025 Dribbble</h3>
          {["Terms", "Privacy", "Cookies"].map((v, idx) => (
            <Link href={"/"} key={idx}>
              {v}
            </Link>
          ))}
        </nav>
        <nav className="flex gap-3">
          {[
            "Jobs",
            "Designers",
            "Freelancers",
            "Tags",
            "Places",
            "Resources",
          ].map((v, idx) => (
            <Link href={"/"} key={idx}>
              {v}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
