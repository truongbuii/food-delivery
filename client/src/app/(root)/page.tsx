import LogOut from "@/components/features/user/log-out";
import HomeScreen from "@/components/features/user/home-screen";
import { FixedFooter, PageHeader, SwitchMode } from "@/components/molecule";
import { HeaderSideMenu } from "@/components/molecule/Avatar";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
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
import { PATHNAME } from "@/configs";
const HomePage = () => {
  return (
    <>
      <Drawer
        setBackgroundColorOnScale={false}
        direction="left"
        aria-hidden={false}
        data-aria-hidden={false}
      >
        <div vaul-drawer-wrapper="">
          <div className="relative min-h-screen">
            <div className="flex flex-col gap-5 px-5 pt-6">
              <PageHeader />
              <div className="flex flex-col text-2xl font-bold ">
                <span>What would you like</span>
                <span>to order</span>
              </div>
              <HomeScreen />
            </div>
            <FixedFooter />
          </div>
        </div>

        <DrawerContent className="">
          <HeaderSideMenu />
          <div className="flex flex-col gap-7 pl-6 pr-10 mt-5 text-sm">
            <div className="flex gap-4">
              <FileText className="text-lightGray w-6 h-6" />
              <Link href="" className="flex-1">
                <p className="">My Orders</p>
              </Link>
            </div>
            <div className="flex gap-4">
              <UserRound className="text-lightGray w-6 h-6" />
              <Link href={PATHNAME.PROFILE} className="flex-1">
                <p className="">My Profile</p>
              </Link>
            </div>
            <div className="flex gap-4">
              <MapPin className="text-lightGray w-6 h-6" />
              <Link href="" className="flex-1">
                <p>Delivery Address</p>
              </Link>
            </div>
            <div className="flex gap-4">
              <Wallet className="text-lightGray w-6 h-6" />
              <Link href="" className="flex-1">
                <p className="">Payment Methods</p>
              </Link>
            </div>
            <div className="flex gap-4">
              <Mail className="text-lightGray w-6 h-6" />
              <Link href="" className="flex-1">
                <p className="">Contact Us</p>
              </Link>
            </div>
            <div className="flex gap-4">
              <Settings className="text-lightGray w-6 h-6" />
              <Link href="" className="flex-1">
                <p className="">Settings</p>
              </Link>
            </div>
            <div className="flex gap-4">
              <CircleHelp className="text-lightGray w-6 h-6" />
              <Link href="" className="flex-1">
                <p className="">Help & FAQs</p>
              </Link>
            </div>
            <SwitchMode />
          </div>
          <LogOut />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HomePage;
