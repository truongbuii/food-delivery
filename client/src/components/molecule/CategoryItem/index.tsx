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
              ? "bg-primary shadow-[0px_15px_30px_0px_rgb(254,114,76,.25)]"
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
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full bg-primary w-12 h-12 flex items-center justify-center">
          <Image src={image} alt={title} width={24} height={24} />
        </div>
        <p className="text-xs text-center">{title}</p>
      </div>
    ),
  };

  return renderByType[type];
};

export default CategoryItem;
