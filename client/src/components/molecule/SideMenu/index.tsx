"use client";

import LogOut from "@/components/features/user/log-out";
import { SwitchMode } from "@/components/molecule";
import { HeaderSideMenu } from "@/components/molecule/Avatar";
import { SheetContent } from "@/components/ui/sheet";
import { PATHNAME, VIEWER_CONTAINER_ID } from "@/configs";
import {
  CircleHelp,
  FileText,
  Mail,
  MapPin,
  Settings,
  UserRound,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const SideMenu = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setContainer(document.getElementById(VIEWER_CONTAINER_ID));
  }, []);

  return (
    <SheetContent
      side={"left"}
      container={container}
      className="w-[55%] h-screen border-none shadow-none"
    >
      <HeaderSideMenu />
      <div className="flex flex-col gap-7 px-6 mt-8 text-sm">
        <div className="flex gap-4">
          <FileText size={20} className="text-lightGray" />
          <Link href="" className="flex-1">
            <p
              style={{
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              My Orders
            </p>
          </Link>
        </div>
        <div className="flex gap-4">
          <UserRound className="text-lightGray w-6 h-6" />
          <Link href={PATHNAME.PROFILE} className="flex-1">
            <p
              style={{
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              My Profile
            </p>
          </Link>
        </div>
        <div className="flex gap-4">
          <MapPin size={20} className="text-lightGray" />
          <Link href={PATHNAME.DELIVERY_ADDRESS} className="flex-1">
            <p
              style={{
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              Delivery Address
            </p>
          </Link>
        </div>
        <div className="flex gap-4">
          <Wallet size={20} className="text-lightGray" />
          <Link href="" className="flex-1">
            <p
              style={{
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              Payment Methods
            </p>
          </Link>
        </div>
        <div className="flex gap-4">
          <Mail size={20} className="text-lightGray" />
          <Link href="" className="flex-1">
            <p
              style={{
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              Contact Us
            </p>
          </Link>
        </div>
        <div className="flex gap-4">
          <Settings size={20} className="text-lightGray" />
          <Link href="" className="flex-1">
            <p
              style={{
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              Settings
            </p>
          </Link>
        </div>
        <div className="flex gap-4">
          <CircleHelp size={20} className="text-lightGray" />
          <Link href="" className="flex-1">
            <p
              style={{
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              Help & FAQs
            </p>
          </Link>
        </div>
        <SwitchMode />
      </div>
      <LogOut />
    </SheetContent>
  );
};

export default SideMenu;
