"use client";

import DeliverAddressForm from "@/components/features/user/deliver-address/DeliverAddressForm";
import { CartAddress } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

const DeliverAddress = () => {
  const VIEWER_CONTAINER_ID = "address-id";
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);

  useEffect(() => {
    setContainer(document.getElementById(VIEWER_CONTAINER_ID));
  }, []);

  return (
    <Sheet>
      <div className="flex flex-col gap-5 px-6" id={VIEWER_CONTAINER_ID}>
        <CartAddress setTitle={setIsNew} />
        <CartAddress />
        <SheetTrigger asChild>
          <div className="w-full text-center">
            <Button
              size={"lg"}
              onClick={() => setIsNew(true)}
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
        </SheetHeader>
        <DeliverAddressForm title={isNew} />
      </SheetContent>
    </Sheet>
  );
};

export default DeliverAddress;
