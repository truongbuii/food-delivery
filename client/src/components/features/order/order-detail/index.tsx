"use client";

import { Avatar } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { IMAGES_CONST, PATHNAME } from "@/configs";
import { ChevronLeft, ChevronsUpDown, CircleCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const OrderDetail = () => {
  const router = useRouter();
  return (
    <>
      <div className="relative py-6 flex items-center z-[50] w-full">
        <Button
          className="bg-secondary w-10 h-10 rounded-[12px] shadow-backBtnShadow hover:bg-primary"
          onClick={() => router.push(PATHNAME.ORDER.MY_ORDERS)}
        >
          <ChevronLeft size={18} className="text-foreground" />
        </Button>
        <p className="flex-1 w-full text-center leading-10 text-lg font-medium">
          Orders Details
        </p>
        <Avatar className="w-10 h-10 rounded-xl" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <Image
              src={IMAGES_CONST.common.restaurant}
              alt="restaurant"
              fill
              sizes="100%"
              className="w-full h-full rounded-2xl"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between gap-8">
              <div className="flex items-center text-xs text-lightGray">
                <span>20 jun, 10.30</span>
              </div>
              <span className="text-[#FFC529] text-lg">#264100</span>
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
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Details</p>
          <p className="text-lightGray font-medium text-sm">
            6391 Elgin St. Celina, Delaware 10299
          </p>
          <div className="flex gap-4 my-2">
            <div className="relative w-10 h-10">
              <Image
                src={IMAGES_CONST.common.defaultAvatar}
                alt="driver"
                fill
                sizes="100%"
                className="w-full h-full rounded-xl"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-lightGray text-xs">
                ID: DKS-501F9
              </p>
              <p className="font-semibold text-base">Jhon Wick</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Orders food</p>
            <ScrollArea className="h-36">
              {Array.from({ length: 3 }).map((_, index) => (
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
                        <span className="flex-1 font-semibold text-lg">
                          Red N Hot Pizza
                        </span>
                        <Collapsible>
                          <CollapsibleTrigger
                            className="text-xs text-lightGray "
                            asChild
                          >
                            <Button
                              variant="ghost"
                              size="xs"
                              className="p-0 hover:bg-background"
                            >
                              <span className="text-lightGray text-xs font-light ">
                                with 3 addon items
                              </span>
                              <ChevronsUpDown className="h-3 w-3 text-lightGray" />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="">
                            {Array.from({ length: 3 }).map((addon, index) => (
                              <div
                                className="w-36 flex justify-between font-light text-xs text-lightGray pr-4"
                                key={index}
                              >
                                <span>name</span>
                                <span className="ml-1">$10</span>
                              </div>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-lg">$20</span>
                          <span className="text-xs text-lightGray">
                            +$
                            {/* {item.selectedAddons.reduce(
                              (sum, addon) => sum + addon.price,
                              0
                            )} */}
                            20
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
        <div>
          <div className="px-2">
            <div className="flex justify-between py-3">
              <span>Payment method</span>
              <span>VNPAY</span>
            </div>
            <Separator />
          </div>
          <div className="px-2">
            <div className="flex justify-between py-3">
              <span>Payment status</span>
              <span>Paid</span>
            </div>
            <Separator />
          </div>
          <div className="px-2">
            <div className="flex justify-between pt-3">
              <span>Total</span>
              <span>$50</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <Button
            size={"md"}
            className="w-36 h-14 rounded-[40px] hover:bg-secondary bg-secondary shadow-socialBtnShadow"
          >
            <span className="text-ring font-medium">Rate</span>
          </Button>
          <Button
            size={"md"}
            className="w-36 h-14 rounded-[40px] hover:bg-primary"
          >
            Re-Order
          </Button>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
