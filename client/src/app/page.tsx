"use client";

import HomeScreen from "@/components/features/user/home-screen";
import {
  Avatar,
  ButtonType,
  FixedFooter,
  SideMenu,
} from "@/components/molecule";
import { SelectAddress } from "@/components/molecule/PageHeader";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useAuthActions } from "@/stores";
import { useRef, useState } from "react";

const HomePage = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { userInfo } = useAuthActions();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      ref={parentRef}
      className={`relative w-full h-screen overflow-auto hide-scrollbar transition ease-in-out duration-500 ${
        open
          ? "scale-[0.75] translate-x-1/2 z-[100] shadow-scaleMenuShadow rounded-3xl"
          : ""
      }`}
    >
      <div className="flex flex-col gap-5 px-6 pt-6 h-full">
        <div className="flex justify-between h-10">
          <Sheet open={open} onOpenChange={setOpen} key="left">
            <SheetTrigger>
              <ButtonType type="side-menu" />
            </SheetTrigger>
            <SelectAddress />
            <Avatar
              avatarURL={userInfo?.avatarUrl}
              className="w-10 h-10 rounded-xl"
            />
            <SideMenu />
          </Sheet>
        </div>
        <div className="flex flex-col text-2xl font-bold ">
          <span>What would you like</span>
          <span>to order</span>
        </div>
        <Sheet key="right">
          <HomeScreen />
        </Sheet>
      </div>
      <FixedFooter parentRef={parentRef} />
    </div>
  );
};

export default HomePage;
