"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SheetTrigger } from "@/components/ui/sheet";
import { IMAGES_CONST } from "@/configs";
import {
  IApiErrorResponse,
  IDeliveryAddress,
  IDeliveryAddressResponse,
} from "@/interfaces";
import { Ellipsis, PencilLine, Trash2 } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import { formatNumber } from "libphonenumber-js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteDeliverAddrMutation } from "@/queries";
import { useMessage } from "@/hooks/useMessage";

interface CartAddressProps {
  address?: IDeliveryAddressResponse;
  setStatus?: (title: boolean) => void;
  setAddress?: (address: IDeliveryAddress) => void;
  refetchList?: () => void;
}

const CartAddress: FC<CartAddressProps> = ({
  address,
  setStatus,
  setAddress,
  refetchList,
}) => {
  const message = useMessage();
  const [popOverOpen, setPopOverOpen] = useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { mutateAsync, isPending } = useDeleteDeliverAddrMutation();

  const handleOpenUpdateForm = (address: IDeliveryAddress) => {
    setPopOverOpen(!open);
    if (setStatus) setStatus(true);

    if (setAddress) {
      setAddress(address);
    }
  };

  const handleDelete = async (addressId: number) => {
    mutateAsync(addressId, {
      onSuccess: () => {
        message.success("Address deleted successfully");
        setDialogOpen(false);
        refetchList?.();
      },
      onError: (error: IApiErrorResponse) => {
        message.error(error.message);
      },
    });
  };

  return (
    <div className="flex gap-5 w-full p-5 bg-cardItem rounded-[19px] shadow-cardItemShadow">
      <div
        className="relative flex justify-center items-center w-16 h-16
        rounded-2xl shadow-[11px_17px_23px_rgb(0,0,0,0.1)] bg-white"
      >
        <div className="flex justify-center items-center w-11 h-11 rounded-full bg-primary">
          <Image
            src={IMAGES_CONST.common.buildingIcon}
            alt=""
            className="w-5 h-6"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="flex-1 ">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <p className="w-full text-base font-semibold">{address?.name}</p>
            <Popover open={popOverOpen} onOpenChange={setPopOverOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="p-0 h-fit">
                  <Ellipsis strokeOpacity={1} className="text-lightGray" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-24 p-0 bg-background">
                <SheetTrigger asChild>
                  <div>
                    <Button
                      variant="ghost"
                      size={"md"}
                      className="w-full"
                      onClick={() => handleOpenUpdateForm(address!)}
                    >
                      <div className="flex items-center gap-1 text-xs text-secondary-foreground">
                        Update
                        <PencilLine size={14} strokeWidth={1} />
                      </div>
                    </Button>
                  </div>
                </SheetTrigger>

                <Button
                  variant="ghost"
                  size={"md"}
                  className="w-full"
                  onClick={() => setDialogOpen(true)}
                >
                  <div className="flex items-center gap-1 text-xs text-secondary-foreground">
                    Delete
                    <Trash2 size={14} strokeWidth={1} />
                  </div>
                </Button>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col text-[13px] text-lightGray">
            <p>
              {address?.phoneNumber
                ? formatNumber(address.phoneNumber, "NATIONAL")
                : ""}
            </p>
            <p>{address?.fullAddress}</p>
          </div>
        </div>
      </div>

      {/* Dialog for Delete Address */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-72 p-4">
          <DialogHeader>
            <DialogTitle>Delete address</DialogTitle>
            <DialogDescription>
              Do you want to delete this address?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="m-auto">
            <Button
              disabled={isPending}
              loading={isPending}
              variant={"outline"}
              className="bg-destructive"
              onClick={() => handleDelete(address!.id)}
            >
              <span className="text-lightGray">Yes</span>
            </Button>
            <DialogClose asChild>
              <Button
                disabled={isPending}
                loading={isPending}
                className="hover:bg-primary"
              >
                No
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartAddress;
