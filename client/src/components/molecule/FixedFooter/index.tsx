"use client";

import useScreenMode from "@/hooks/useScreenMode";
import { useEffect, useState, useRef, memo } from "react";
import throttle from "lodash/throttle";
import Link from "next/link";
import { Bell, Compass, Heart, MapPin, ShoppingBag } from "lucide-react";
import BadgeNumber from "@/components/molecule/BadgeNumber";

import { RefObject } from "react";

interface FixedFooterProps {
  parentRef: RefObject<HTMLDivElement | null>;
}

const FixedFooter = ({ parentRef }: FixedFooterProps) => {
  const { isMobile } = useScreenMode();
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const threshold = 50;

  useEffect(() => {
    if (!parentRef?.current) return;

    const handleScroll = throttle(() => {
      const currentScrollY = parentRef.current
        ? parentRef.current.scrollTop
        : 0;

      if (currentScrollY - lastScrollY.current > threshold) {
        setIsHidden(true);
      } else if (lastScrollY.current - currentScrollY > threshold) {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    }, 200);

    const parentElement = parentRef.current;
    parentElement.addEventListener("scroll", handleScroll);

    return () => {
      parentElement.removeEventListener("scroll", handleScroll);
    };
  }, [parentRef]);

  return (
    <footer
      className={`fixed bottom-[-4px] w-full h-[65px] bg-cardItem text-lightGray p-4 transition-transform duration-300 ${
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
          <ShoppingBag size={23} strokeWidth={2} className="text-primary" />
          <BadgeNumber
            number={4}
            className="absolute -top-2 -right-3 w-[15px] h-[15px] text-[10px] leading-[15px] rounded-md"
          />
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
