"use client";

import { CartAddress } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { IMAGES_CONST, PATHNAME } from "@/configs";
import { useCart } from "@/contexts/CartContext";
import { useDeliveryAddresses } from "@/hooks/useAddress";
import { useMessage } from "@/hooks/useMessage";
import { IApiErrorResponse, IDeliveryAddressResponse } from "@/interfaces";
import { useCheckoutMutation } from "@/queries";
import { useAddressStore } from "@/stores/address/address.store";
import { ChevronLeft, Ellipsis } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const PaymentMethod = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { addresses } = useDeliveryAddresses();
  const { shippingAddress, setAddress } = useAddressStore();
  const { subTotal, totalQuantity } = useCart();
  const discount = parseFloat(params.get("discount") || "0");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const totalPay = parseFloat(
    (subTotal - (subTotal * discount) / 100).toFixed(4)
  );
  const { mutateAsync } = useCheckoutMutation();
  const message = useMessage();

  const handleAddressChange = (address: IDeliveryAddressResponse) => {
    setAddress(address);
  };

  const handleConfirmOrder = useCallback(() => {
    mutateAsync(
      {
        paymentMethod: paymentMethod,
        address: shippingAddress.fullAddress,
        discount,
        totalPrice: totalPay,
        numberItem: totalQuantity,
      },
      {
        onSuccess: (res) => {
          if (res && res.data) {
            window.location.href = res.data;
          }
        },
        onError: (err: IApiErrorResponse) => {
          message.error(err?.message);
        },
      }
    );
  }, [
    paymentMethod,
    shippingAddress,
    discount,
    totalPay,
    totalQuantity,
    mutateAsync,
    message,
  ]);

  return (
    <>
      <div className="relative py-6 flex items-center z-[50] w-full">
        <Button
          className="bg-secondary w-10 h-10 rounded-[12px] shadow-backBtnShadow hover:bg-primary"
          onClick={() => router.push(PATHNAME.CART)}
        >
          <ChevronLeft size={18} className="text-foreground" />
        </Button>
        <p className="flex-1 w-full text-center leading-10 text-lg font-medium">
          Payment
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-4 w-full">
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Shipping to</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="p-0 h-fit">
                <Ellipsis strokeOpacity={1} className="text-lightGray" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[350px]">
              <DialogHeader>
                <DialogTitle>Choose your location</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="mt-1 cursor-pointer"
                  onClick={() => handleAddressChange(address)}
                >
                  <CartAddress key={address.id} address={address} />
                </div>
              ))}
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center gap-8">
          <Image
            src={IMAGES_CONST.common.addressMap}
            alt="address"
            width={87}
            height={87}
          />
          <div className="flex flex-col gap-2 py-2">
            <p className="text-xl font-semibold">{shippingAddress.name}</p>
            <p className="text-sm text-lightGray">
              {shippingAddress.fullAddress}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-lg font-semibold">Payment Method</p>
          <div className="mt-3">
            <ToggleGroup
              type="single"
              className="justify-start"
              onValueChange={(value) => setPaymentMethod(value)}
            >
              <ToggleGroupItem
                className="relative flex items-center w-20 h-[67px] p-1 cursor-pointer border border-lightGray data-[state=on]:bg-secondary data-[state=on]:border-primary"
                value="VNPAY"
              >
                <Image
                  src={IMAGES_CONST.common.IconVnPay}
                  alt="credit card"
                  sizes="100%"
                  fill
                  className="object-contain p-1"
                />
              </ToggleGroupItem>
              <ToggleGroupItem
                className="relative flex items-center w-20 h-[67px] p-1 cursor-pointer border border-lightGray data-[state=on]:bg-secondary data-[state=on]:border-primary"
                value="COD"
              >
                <Image
                  src={IMAGES_CONST.common.IconCod}
                  alt="credit card"
                  sizes="100%"
                  fill
                  className="object-contain p-1"
                />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-lg font-semibold">Total Pay</span>
          <span>${totalPay}</span>
        </div>
        <Button
          size={"lg"}
          className="m-auto mt-10 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
          onClick={handleConfirmOrder}
        >
          CONFIRM ORDER
        </Button>
      </div>
    </>
  );
};

export default PaymentMethod;
