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
import { FC, useRef } from "react";

interface AvatarProps {
  className?: string;
}

interface AvatarUploadProps {
  className?: string;
  currentAvatar: string | undefined;
  onAvatarUpdate: (newAvatarURL: File) => void;
  fullName: string;
}

const Avatar = ({ className }: AvatarProps) => {
  const { userInfo } = useAuthStore();
  return (
    <div
      className={cn(
        "relative w-[40px] h-[40px] rounded-full overflow-hidden",
        className
      )}
    >
      <Image
        src={userInfo?.avatarUrl || IMAGES_CONST.common.defaultAvatar.src}
        alt="Avatar"
        fill
        className="w-full h-full rounded-full object-cover"
        onError={(e) => {
          e.currentTarget.src = IMAGES_CONST.common.defaultAvatar.src;
        }}
      />
    </div>
  );
};

const AvatarUpload: FC<AvatarUploadProps> = ({
  className,
  currentAvatar,
  onAvatarUpdate,
  fullName,
}) => {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileUploadRef.current?.click();
  };

  const uploadImageDisplay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      onAvatarUpdate(uploadedFile);
    }
  };
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-4",
        className
      )}
    >
      <div className="relative flex justify-center items-center w-[110px] h-[110px] rounded-full bg-background ">
        <div className="relative w-[95px] h-[95px] rounded-full shadow-avatarShadow overflow-hidden">
          <Image
            src={currentAvatar || IMAGES_CONST.common.defaultAvatar.src}
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
            className="absolute bottom-2 right-2 w-7 h-7 p-0 rounded-full bg-background hover:bg-background"
          >
            <Camera size={15} className="text-lightGray" />
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
        <p className="text-xl font-semibold">{fullName}</p>
        <p className="text-xs text-lightGray">Edit profile</p>
      </div>
    </div>
  );
};

const HeaderSideMenu = () => {
  const { userInfo } = useAuthStore();
  return (
    <DrawerHeader className="flex flex-col gap-2 px-6 mt-10">
      <Avatar className="w-[90px] h-[90px]" />
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
