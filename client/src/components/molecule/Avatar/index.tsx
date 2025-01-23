"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { IMAGES_CONST } from "@/configs";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores";
import { Camera } from "lucide-react";
import Image from "next/image";
import { FC, useRef, useState } from "react";

interface AvatarProps {
  width?: number;
  height?: number;
  className?: string;
}

interface AvatarUploadProps {
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

const AvatarUpload: FC<AvatarUploadProps> = ({ className }) => {
  const { userInfo } = useAuthStore();
  const [avatarURL, setAvatarURL] = useState<string | undefined>(
    userInfo?.avatarUrl
  );

  const fileUploadRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileUploadRef.current?.click();
  };

  const uploadImageDisplay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      setAvatarURL(URL.createObjectURL(uploadedFile));
    }
  };
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-5",
        className
      )}
    >
      <div className="relative flex justify-center items-center w-[108px] h-[108px] rounded-full bg-background ">
        <div className="relative w-[90px] h-[90px] rounded-full shadow-avatarShadow overflow-hidden">
          <Image
            src={
              avatarURL ||
              userInfo?.avatarUrl ||
              IMAGES_CONST.common.defaultAvatar.src
            }
            alt="Avatar"
            fill
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = IMAGES_CONST.common.defaultAvatar.src;
            }}
          />
        </div>

        <form id="form" encType="multipart/form-data">
          <Button
            type="submit"
            onClick={handleImageUpload}
            className="absolute bottom-2 right-0 w-7 h-7 p-0 rounded-full bg-background hover:bg-background"
          >
            <Camera size={18} className="text-lightGray" />
          </Button>
          <input
            type="file"
            id="file"
            ref={fileUploadRef}
            onChange={uploadImageDisplay}
            hidden
          />
        </form>
      </div>
      <div className="flex flex-col text-center gap-2">
        <p className="text-xl font-semibold">{userInfo?.fullName}</p>
        <p className="text-xs text-lightGray">Edit profile</p>
      </div>
    </div>
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

export { HeaderSideMenu, Avatar, AvatarUpload };
