import { useEffect, useState } from "react";

export default function (isOn: boolean) {
  const [stopScroll] = useState(() => (e: Event) => {
    e.preventDefault();
  });
  useEffect(() => {
    if (isOn) {
      window.addEventListener("scroll", stopScroll, { passive: false });
      window.addEventListener("wheel", stopScroll, { passive: false });
      window.addEventListener("drag", stopScroll, { passive: false });
      window.addEventListener("touchmove", stopScroll, { passive: false });
      window.document.body.style.scrollbarWidth = "none";
      document.documentElement.style.scrollbarWidth = "none";
    } else {
      window.removeEventListener("scroll", stopScroll);
      window.removeEventListener("wheel", stopScroll);
      window.removeEventListener("drag", stopScroll);
      window.removeEventListener("touchmove", stopScroll);
      document.documentElement.style.scrollbarWidth = "";
    }
  }, [isOn]);
}
