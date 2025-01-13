import { PageHeader } from "@/components/molecule";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
const HomePage = () => {
  return (
    <>
      <Drawer setBackgroundColorOnScale={false} direction="left">
        <div vaul-drawer-wrapper="">
          <div className="min-h-screen relative bg-background ">
            <div className="flex flex-col gap-7 px-5 pt-8 ">
              <PageHeader />
              <div className="flex flex-col text-3xl font-bold ">
                <span>What would you like</span>
                <span>to order</span>
              </div>
            </div>
          </div>
        </div>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              menu
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HomePage;
