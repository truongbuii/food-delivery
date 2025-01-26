import HomeScreen from "@/components/features/user/home-screen";
import { FixedFooter, PageHeader, SideMenu } from "@/components/molecule";

import { Sheet } from "@/components/ui/sheet";
const HomePage = () => {
  return (
    <Sheet>
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
      <SideMenu />
    </Sheet>
  );
};

export default HomePage;
