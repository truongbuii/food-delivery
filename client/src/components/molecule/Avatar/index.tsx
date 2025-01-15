"use client";

import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { IMAGES_CONST } from "@/configs";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores";
import Image from "next/image";

interface AvatarProps {
  width?: number;
  height?: number;
  className?: string;
}

const Avatar = ({ width = 40, height = 40, className }: AvatarProps) => {
  const { userInfo } = useAuthStore();
  return (
    <Image
      src={userInfo?.avatarUrl || IMAGES_CONST.common.defaultAvatar.src}
      alt="Avatar"
      className={cn("rounded-full object-cover", className)}
      width={width}
      height={height}
      onError={(e) => {
        e.currentTarget.src = IMAGES_CONST.common.defaultAvatar.src;
      }}
    />
  );
};
const HeaderSideMenu = () => {
  const { userInfo } = useAuthStore();
  return (
    <DrawerHeader className="flex flex-col gap-2 px-6 mt-10">
      <Avatar width={90} height={90} />
      <div className="flex flex-col gap-2">
        <DrawerTitle className="text-xl text-left">
          {userInfo?.fullName}
        </DrawerTitle>
        <DrawerDescription className="text-xs text-left">
          {userInfo?.email}
        </DrawerDescription>
      </div>
    </DrawerHeader>
  );
};

export { HeaderSideMenu, Avatar };
