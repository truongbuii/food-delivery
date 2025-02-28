"use client";

import { Avatar } from "@/components/molecule";
import OrderItem from "@/components/molecule/OrderItem";
import { Button } from "@/components/ui/button";
import { PATHNAME } from "@/configs";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const MyOrders = () => {
  const router = useRouter();

  return (
    <>
      <div className="relative py-6 flex items-center z-[50] w-full">
        <Button
          className="bg-secondary w-10 h-10 rounded-[12px] shadow-backBtnShadow hover:bg-primary"
          onClick={() => router.push(PATHNAME.HOME)}
        >
          <ChevronLeft size={18} className="text-foreground" />
        </Button>
        <p className="flex-1 w-full text-center leading-10 text-lg font-medium">
          My Orders
        </p>
        <Avatar className="w-10 h-10 rounded-xl" />
      </div>
      <div className="flex flex-col gap-6 mt-4">
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </div>
    </>
  );
};

export default MyOrders;
