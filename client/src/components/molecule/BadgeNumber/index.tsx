import clsx from "clsx";
import { FC } from "react";

interface BadgeNumberProps {
  className?: string;
  number: number;
}

const BadgeNumber: FC<BadgeNumberProps> = ({ className, number }) => {
  return (
    <span
      className={clsx(
        "text-center bg-[#FFC529] text-white shadow-badgeNumShadow",
        className
      )}
    >
      {number}
    </span>
  );
};

export default BadgeNumber;
