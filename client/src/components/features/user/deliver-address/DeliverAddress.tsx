"use client";

import DeliverAddressForm from "@/components/features/user/deliver-address/DeliverAddressForm";
import { CartAddress } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IDeliveryAddress } from "@/interfaces";
import { useGetAllDeliverAddr } from "@/queries";
import { useUserStore } from "@/stores";
import { useEffect, useMemo, useState } from "react";

const VIEWER_CONTAINER_ID = "address-id";

const DeliverAddress = () => {
  const userId = useUserStore((state) => state.userInfo?.id);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [address, setAddress] = useState<IDeliveryAddress | undefined>(
    undefined
  );
  const { data: listAddress, refetch } = useGetAllDeliverAddr(userId!);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById(VIEWER_CONTAINER_ID));
  }, []);

  const renderedAddresses = useMemo(
    () =>
      listAddress?.data?.map((address) => (
        <CartAddress
          key={address.id}
          address={address}
          setStatus={setIsUpdate}
          setAddress={setAddress}
          refetchList={refetch}
        />
      )),
    [listAddress, refetch]
  );

  return (
    <Sheet>
      <div className="flex flex-col gap-5 px-6" id={VIEWER_CONTAINER_ID}>
        {renderedAddresses}
        <SheetTrigger asChild>
          <div className="w-full text-center">
            <Button
              size={"lg"}
              onClick={() => setIsUpdate(false)}
              className="m-auto mt-4 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
            >
              ADD NEW ADDRESS
            </Button>
          </div>
        </SheetTrigger>
      </div>
      <SheetContent
        side={"right"}
        container={container}
        className="w-full z-[150]"
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <DeliverAddressForm
          status={isUpdate}
          address={isUpdate ? address : undefined}
          refetchList={refetch}
        />
      </SheetContent>
    </Sheet>
  );
};

export default DeliverAddress;
