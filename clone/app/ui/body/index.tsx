import clsx from "clsx";
import { Body_header } from "./header";

export const Body = () => {
  return (
    <div
      className={clsx(
        "w-full h-[40rem]",
        "before:content-[''] before:block before:pt-[120px] before:md:pt-[100px] before:bg-white"
      )}
    >
      <Body_header />
      dsadsa
    </div>
  );
};
