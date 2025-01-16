"use client";

import useScreenMode from "@/hooks/useScreenMode";
import { useEffect, useState, useRef, memo } from "react";
import throttle from "lodash/throttle";
import Link from "next/link";
import { Bell, Compass, Heart, MapPin, ShoppingBag } from "lucide-react";

const FixedFooter = () => {
  const { isMobile } = useScreenMode();
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const threshold = 100;

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;

      if (currentScrollY - lastScrollY.current > threshold) {
        console.log(currentScrollY - lastScrollY.current);

        setIsHidden(true);
      } else if (lastScrollY.current - currentScrollY > threshold) {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    }, 1500);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      className={`fixed bottom-[-3px] w-full h-[65px] bg-background text-lightGray p-4 shadow-lg transition-transform duration-300 ${
        isMobile ? "" : "max-w-[23.4375rem] mx-auto"
      } ${isHidden ? "translate-y-full" : "translate-y-0"}`}
    >
      <div className="flex justify-between items-center h-full px-4">
        <Link href="/">
          <Compass size={23} strokeWidth={2} />
        </Link>
        <Link href="/">
          <MapPin size={23} strokeWidth={2} />
        </Link>
        <Link href="/" className="relative">
          <ShoppingBag size={28} strokeWidth={2} className="text-primary" />
          <span className="absolute -top-1 -right-3 w-[14px] h-[14px] text-[10px] text-center rounded-sm bg-[#FFC529] text-white">
            4
          </span>
        </Link>
        <Link href="/">
          <Heart size={23} strokeWidth={2} />
        </Link>
        <Link href="/">
          <Bell size={23} strokeWidth={2} />
        </Link>
      </div>
    </footer>
  );
};

export default memo(FixedFooter);
