"use client";

import CartItem from "@/components/features/cart/cart-item";
import { BadgeNumber } from "@/components/molecule";
import { IconBag } from "@/components/molecule/svgs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PATHNAME } from "@/configs";
import { useCart } from "@/contexts/CartContext";
import { useMessage } from "@/hooks/useMessage";
import { IApiErrorResponse } from "@/interfaces";
import { useGetCouponMutation } from "@/queries/coupon";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";

const CartDetail = () => {
  const router = useRouter();
  const message = useMessage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [code, setCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [discountType, setDiscountType] = useState<string>("PERCENTAGE");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const { totalQuantity, cartItems, subTotal, setTotalPay } = useCart();
  const { mutateAsync } = useGetCouponMutation();

  const handleDiscount = useCallback(() => {
    if (inputRef.current) {
      const couponCode = inputRef.current.value.trim();

      mutateAsync(
        { code: couponCode, subTotal: subTotal },
        {
          onSuccess: (res) => {
            if (res && res.data) {
              setDiscount(res.data.discountValue);
              setDiscountType(res.data.discountType);
              setDiscountAmount(res.data.discountAmount);
              setCode(res.data.code);
            }
          },
          onError: (err: IApiErrorResponse) => {
            message.error(err?.message);
          },
        }
      );
    }
  }, [mutateAsync, message, subTotal]);

  const handleCheckout = () => {
    setTotalPay((subTotal - discountAmount).toFixed(4) as unknown as number);
    router.push(`${PATHNAME.ORDER.CHECKOUT}?discount=${code}`);
  };
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
            number={totalQuantity}
            className="absolute -top-1 -right-1 w-[15px] h-[15px] text-[10px] leading-[15px] rounded-md"
          />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <CartItem cartItems={cartItems} />
        <div className="flex items-center h-16 p-2 bg-secondary rounded-[40px] shadow-cardItemShadow">
          <Input
            placeholder="Promo code"
            className="border-none focus-visible:ring-none focus-visible:ring-0 shadow-none"
            ref={inputRef}
          />
          <Button
            className="h-12 w-28 rounded-[40px] hover:bg-primary"
            onClick={handleDiscount}
          >
            Apply
          </Button>
        </div>
        <div>
          <div className="px-2">
            <div className="flex justify-between py-4">
              <span>Subtotal</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>
            <Separator />
          </div>
          <div className="px-2">
            <div className="flex justify-between py-4">
              <span>Discount</span>
              <span>
                {discount}
                {discountType === "PERCENTAGE" ? "%" : "USD"}
              </span>
            </div>
            <Separator />
          </div>
          <div className="px-2">
            <div className="flex justify-between py-4">
              <span>Total</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">({totalQuantity} items)</span>
                <span className="font-bold">
                  ${(subTotal - discountAmount).toFixed(4)}
                </span>
              </div>
            </div>
            <Separator />
          </div>
        </div>
        <div className="w-full text-center">
          <Button
            size={"lg"}
            className="m-auto mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
            onClick={handleCheckout}
          >
            CHECK OUT
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartDetail;
