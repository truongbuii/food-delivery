"use client";

import { Button } from "@/components/ui/button";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores";
import Image from "next/image";
import { FC, useRef } from "react";
import { Camera } from "lucide-react";
import { IMAGES_CONST } from "@/configs";

interface AvatarProps {
  className?: string;
  avatarURL?: string;
}

interface AvatarUploadProps {
  className?: string;
  currentAvatar?: string;
  onAvatarChange: (newAvatarFile: File) => void;
  fullName: string;
}

const Avatar: FC<AvatarProps> = ({ className, avatarURL }) => {
  return (
    <div
      className={cn(
        "relative w-10 h-10 rounded-full overflow-hidden",
        className
      )}
    >
      <Image
        src={avatarURL || IMAGES_CONST.common.defaultAvatar.src}
        alt="Avatar"
        fill
        sizes="100vw"
        priority
        className="w-full h-full object-cover"
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
  onAvatarChange,
  fullName,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onAvatarChange(selectedFile);
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-background">
        <Avatar
          avatarURL={currentAvatar}
          className="w-24 h-24 rounded-full shadow-avatarShadow"
        />
        <Button
          type="button"
          onClick={handleUploadClick}
          className="absolute bottom-2 right-2 w-7 h-7 p-0 rounded-full bg-background hover:bg-background"
        >
          <Camera size={15} className="text-lightGray" />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />
      </div>
      <div className="text-center">
        <p className="text-xl font-semibold">{fullName}</p>
        <p className="text-xs text-lightGray">Edit profile</p>
      </div>
    </div>
  );
};

const HeaderSideMenu: FC = () => {
  const { userInfo } = useUserStore.getState();

  return (
    <SheetHeader className="flex flex-col gap-1 pl-6 mt-10">
      <Avatar avatarURL={userInfo?.avatarUrl} className="w-[85px] h-[85px]" />
      <div className="flex flex-col gap-2">
        <SheetTitle className="text-xl text-left">
          {userInfo?.fullName}
        </SheetTitle>
        <SheetDescription className="text-xs text-left">
          {userInfo?.email}
        </SheetDescription>
      </div>
    </SheetHeader>
  );
};

export { HeaderSideMenu, Avatar, AvatarUpload };
