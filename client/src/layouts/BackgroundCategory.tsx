import { IMAGES_CONST } from "@/configs";
import Image from "next/image";
import { FC, ReactNode } from "react";

const BackgroundCategory: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full relative">
        <Image
          src={IMAGES_CONST.common.pizzaCategoryBackground}
          alt={IMAGES_CONST.common.pizzaCategoryBackground.toString()}
          width={335}
          height={300}
          className="absolute top-[-70px] -right-20 z-1"
        />
      </div>
      {children}
    </div>
  );
};

export default BackgroundCategory;
