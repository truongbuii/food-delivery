import React, { FC } from "react";
import Image from "next/image";
import clsx from "clsx";

interface CategoryItemProps {
  type: "category" | "filter";
  image: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryItem: FC<CategoryItemProps> = ({
  type,
  image,
  title,
  isSelected,
  onClick,
}) => {
  const renderByType = {
    category: (
      <div className="h-28">
        <div
          className={clsx(
            "flex flex-col w-[58px] h-[90px] p-1 items-center gap-2 rounded-[40px] cursor-pointer transition-all",
            isSelected
              ? "bg-primary shadow-[0px_10px_30px_0px_rgb(254,114,76,.25)]"
              : "bg-secondary shadow-[0px_10px_20px_-4px_rgb(0,0,0,.06)]"
          )}
          onClick={onClick}
        >
          <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <Image
              src={image}
              alt={title}
              sizes="100%"
              fill
              priority
              className="w-full h-full"
              style={{ objectFit: "cover" }}
            />
          </div>

          <p
            className={`text-xs text-center font-normal ${
              isSelected ? "text-white" : ""
            }`}
          >
            {title}
          </p>
        </div>
      </div>
    ),
    filter: (
      <div
        className={clsx(
          "flex items-center w-auto h-10 p-1 mb-2 rounded-[40px] cursor-pointer",
          isSelected
            ? "bg-primary shadow-[16px_16px_50px_0px_rgb(254,114,76,.25)] z-20"
            : "bg-secondary shadow-[0px_10px_25px_0px_rgb(0,0,0,.06)]"
        )}
        onClick={onClick}
      >
        <div className="relative w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
          <Image
            src={image}
            alt={title}
            sizes="100%"
            fill
            priority
            className="w-full h-full"
            style={{ objectFit: "cover" }}
          />
        </div>
        <p className="text-xs text-center px-3">{title}</p>
      </div>
    ),
  };

  return renderByType[type];
};

export default CategoryItem;
