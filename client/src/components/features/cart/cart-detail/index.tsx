"use client";

import CartItem from "@/components/features/cart/cart-item";
import { BadgeNumber } from "@/components/molecule";
import { IconBag } from "@/components/molecule/svgs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PATHNAME } from "@/configs";
import { MapperCartItem } from "@/mapping/cartItem.mapping";
import { useGetCartItems } from "@/queries/cart";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const CartDetail = () => {
  const router = useRouter();

  const { data: cartItems } = useGetCartItems();
  const _cartItems = useMemo(
    () => cartItems?.data?.map((category) => MapperCartItem(category)) ?? [],
    [cartItems]
  );

  const subtotal = useMemo(() => {
    return _cartItems.reduce((total, item) => {
      const addonsTotal =
        item.selectedAddons?.reduce((sum, addon) => sum + addon.price, 0) || 0;
      return total + (item.foodPrice + addonsTotal) * item.quantity;
    }, 0);
  }, [_cartItems]);

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
          Cart
        </p>
        <div className="relative w-10 h-10 flex items-center justify-center bg-secondary rounded-[12px] shadow-backBtnShadow">
          <IconBag />
          <BadgeNumber
            number={4}
            className="absolute -top-1 -right-1 w-[15px] h-[15px] text-[10px] leading-[15px] rounded-md"
          />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <CartItem cartItems={_cartItems} />
        <div className="flex items-center h-16 p-2 bg-secondary rounded-[40px] shadow-cardItemShadow">
          <Input
            placeholder="Promo code"
            className="border-none focus-visible:ring-none focus-visible:ring-0 shadow-none"
          />
          <Button className="h-12 w-28 rounded-[40px] hover:bg-primary  ">
            Apply
          </Button>
        </div>
        <div>
          <div className="px-2">
            <div className="flex justify-between py-4">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Separator />
          </div>
          <div className="px-2">
            <div className="flex justify-between py-4">
              <span>Discount</span>
              <span>10 %</span>
            </div>
            <Separator />
          </div>
          <div className="px-2">
            <div className="flex justify-between py-4">
              <span>Total</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">({_cartItems.length} items)</span>
                <span className="font-bold">$60.02</span>
              </div>
            </div>
            <Separator />
          </div>
        </div>
        <div className="w-full text-center">
          <Button
            size={"lg"}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
          >
            CHECK OUT
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartDetail;
