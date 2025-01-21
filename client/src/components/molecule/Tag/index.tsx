import { cva } from "class-variance-authority";
import { FC } from "react";

interface TagProps {
  title: string;
  size?: "default" | "sm";
}

const tagVariants = cva(
  "flex items-center justify-center h-[22px] rounded-md",
  {
    variants: {
      variant: {
        default: "bg-tag",
      },
      size: {
        default: "text-xs",
        sm: "text-[11px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Tag: FC<TagProps> = ({ title, size }) => {
  return (
    <div className={tagVariants({ size })}>
      <span className="font-medium uppercase py-[2px] px-2 text-lightGray">
        {title}
      </span>
    </div>
  );
};

export default Tag;
