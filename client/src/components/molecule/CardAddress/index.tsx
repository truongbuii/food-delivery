"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SheetTrigger } from "@/components/ui/sheet";
import { IMAGES_CONST } from "@/configs";
import { Ellipsis, PencilLine, Trash2 } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";

interface CartAddressProps {
  deliveryAddress?: string;
  setTitle?: (title: boolean) => void;
}

const CartAddress: FC<CartAddressProps> = ({ setTitle }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleButtonClick = () => {
    setOpen(!open);
    if (setTitle) {
      setTitle(false);
    }
  };
  return (
    <div className="flex gap-5 w-full p-5 bg-cardItem rounded-[19px] shadow-cardItemShadow">
      {/* avatar */}
      <div
        className="relative flex justify-center items-center w-16 h-16
        rounded-2xl shadow-[11px_17px_23px_rgb(0,0,0,0.1)] bg-white"
      >
        <Image
          src={IMAGES_CONST.common.defaultAvatar}
          alt=""
          className="w-11 h-11 rounded-full"
          style={{ objectFit: "cover" }}
        />
      </div>
      {/* content */}
      <div className="flex flex-1 ">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="text-base font-semibold">Home</span>
          </div>
          <div className="flex flex-col text-[13px] text-lightGray">
            <p>523-213-1212</p>
            <p>4261 Kembery Drive, Chicago, LSA</p>
          </div>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="p-0 h-fit">
              <Ellipsis strokeOpacity={1} className="text-lightGray" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-24 p-0 bg-background">
            <SheetTrigger asChild>
              <div>
                <Button
                  variant="ghost"
                  size={"md"}
                  className="w-full"
                  onClick={handleButtonClick}
                >
                  <div className="flex items-center gap-1 text-xs text-secondary-foreground">
                    Update
                    <PencilLine size={14} strokeWidth={1} />
                  </div>
                </Button>
              </div>
            </SheetTrigger>
            <Button
              variant="ghost"
              size={"md"}
              className="w-full"
              onClick={() => setOpen(false)}
            >
              <div className="flex items-center gap-1 text-xs text-secondary-foreground">
                Delete
                <Trash2 size={14} strokeWidth={1} />
              </div>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CartAddress;
