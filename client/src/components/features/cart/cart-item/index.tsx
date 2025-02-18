import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { IMAGES_CONST } from "@/configs";
import Image from "next/image";
import { useState } from "react";

const CartItem = () => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <ScrollArea className="h-48">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="py-2 pr-3" key={index}>
          <div className="flex gap-5">
            <div className="relative w-20 h-20 rounded-[18px] overflow-hidden">
              <Image
                src={IMAGES_CONST.common.restaurant}
                alt="food"
                sizes="100%"
                fill
                className="object-cover "
              />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="flex-1 font-semibold text-lg">
                    Red n hot pizza
                  </span>
                  <Button className="w-3 h-full" variant={"ghost"}>
                    <span className="text-primary">x</span>
                  </Button>
                </div>
                <span className="font-light text-xs text-lightGray">
                  with Masroom,Baby spinach, Bell Chili
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">$9.50</span>
                <div className="flex gap-1 h-7">
                  <Button
                    variant={"outline"}
                    className="rounded-full bg-white w-7 h-7 p-0 hover:bg-white"
                    onClick={() => {
                      if (quantity > 0) setQuantity(quantity - 1);
                    }}
                  >
                    <span className="text-black">-</span>
                  </Button>
                  <span className="!leading-7 h-full text-sm text-center font-semibold min-w-5">
                    {quantity}
                  </span>
                  <Button
                    variant={"outline"}
                    className="rounded-full bg-primary w-7 h-7 p-0 hover:bg-primary"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <span className="text-white">+</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default CartItem;
