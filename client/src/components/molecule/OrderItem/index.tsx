import { Button } from "@/components/ui/button";
import { IMAGES_CONST } from "@/configs";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

const OrderItem = () => {
  return (
    <div className="p-4 bg-secondary shadow-foodShadow rounded-2xl">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <Image
              src={IMAGES_CONST.common.restaurant}
              alt="restaurant"
              fill
              sizes="100%"
              className="w-full h-full rounded-2xl"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between">
              <div className="flex items-center text-xs text-lightGray">
                <span>20 jun, 10.30</span>
                <span className="mx-2 text-base">•</span>
                <span>3 items</span>
              </div>
              <span className="text-[#FFC529] text-lg">$15.30</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Pizza Hut</span>
              <CircleCheck
                color="#029094"
                strokeWidth={2}
                size={10}
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-1 text-[#4EE476]">
              <span className="text-base">•</span>
              <span className="text-xs">Order Delivered</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            size={"md"}
            className="w-32 rounded-[40px] hover:bg-background bg-background shadow-socialBtnShadow"
          >
            <span className="text-ring font-medium">Detail</span>
          </Button>
          <Button size={"md"} className="w-32 rounded-[40px] hover:bg-primary">
            Rate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
