import { IMAGES_CONST } from "@/configs";
import Image from "next/image";
import { FC, ReactNode } from "react";

const BackgroundProfile: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full relative h-[100dvh]">
      <div className="w-full relative">
        <Image
          src={IMAGES_CONST.common.profileBackground1}
          alt={IMAGES_CONST.common.profileBackground1.toString()}
          className="absolute top-[-5px] right-0 z-1"
        />
        <Image
          src={IMAGES_CONST.common.profileBackground3}
          alt={IMAGES_CONST.common.profileBackground3.toString()}
          className="absolute top-0 left-24"
        />
        <Image
          src={IMAGES_CONST.common.profileBackground2}
          alt={IMAGES_CONST.common.profileBackground2.toString()}
          className="absolute top-0 left-0 z-2"
        />
      </div>
      {children}
    </div>
  );
};

export default BackgroundProfile;
