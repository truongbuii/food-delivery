"use client";

import { Avatar, ButtonType } from "@/components/molecule";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SheetTrigger } from "@/components/ui/sheet";
import { PATHNAME } from "@/configs";
import { IDeliveryAddressResponse } from "@/interfaces";
import { useGetAllDeliverAddr } from "@/queries";
import { useAuthActions, useUserStore } from "@/stores";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const SelectAddress = () => {
  const userId = useUserStore((state) => state.userInfo?.id);
  const { data: addresses } = useGetAllDeliverAddr(userId!);
  const [selectedValue, setSelectedValue] = useState<
    IDeliveryAddressResponse | undefined
  >(undefined);

  useEffect(() => {
    if (addresses?.data?.length) {
      setSelectedValue(addresses.data[0]);
    }
  }, [addresses]);

  const addressOptions = useMemo(() => {
    return addresses?.data?.map((address) => (
      <SelectItem key={address.id} value={address.fullAddress}>
        {address.fullAddress}
      </SelectItem>
    ));
  }, [addresses]);

  const selectedDisplay = useMemo(() => {
    const fullAddress = selectedValue?.fullAddress || "";
    return fullAddress.length > 20
      ? `${fullAddress.slice(0, 20)}...`
      : fullAddress;
  }, [selectedValue]);

  return (
    <div className="flex flex-col h-full font-medium ">
      <Select
        onValueChange={(value) =>
          setSelectedValue(
            addresses?.data?.find((address) => address.fullAddress === value)
          )
        }
      >
        {addresses?.data?.length ? (
          <SelectTrigger className="flex justify-center items-center w-full p-0 text-sm max-w-40 border-none shadow-none focus:ring-0 focus:ring-none">
            <p className="px-1">Deliver to</p>
          </SelectTrigger>
        ) : (
          <Link
            href={PATHNAME.DELIVERY_ADDRESS}
            className="flex items-center h-full "
          >
            <p className="text-sm text-primary px-1">Add new address</p>
            <Plus size={14} className="pt-1" />
          </Link>
        )}
        <SelectContent>
          <SelectGroup>{addressOptions}</SelectGroup>
        </SelectContent>
      </Select>
      <span className="text-sm text-primary">{selectedDisplay}</span>
    </div>
  );
};

const PageHeader = () => {
  const { userInfo } = useAuthActions();

  return (
    <div className="flex justify-between h-10">
      <SheetTrigger>
        <ButtonType type="side-menu" />
      </SheetTrigger>
      <SelectAddress />
      <Avatar
        avatarURL={userInfo?.avatarUrl}
        className="w-10 h-10 rounded-xl"
      />
    </div>
  );
};

export { PageHeader, SelectAddress };
