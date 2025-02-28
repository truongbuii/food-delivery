import { useGetAllDeliverAddr } from "@/queries";
import { useUserStore } from "@/stores";
import { useAddressStore } from "@/stores/address/address.store";
import { useEffect } from "react";

export const useDeliveryAddresses = () => {
  const userId = useUserStore((state) => state.userInfo?.id);
  const { setAddress, getShippingAddress } = useAddressStore();

  const { data: listAddress, refetch } = useGetAllDeliverAddr(userId!);

  useEffect(() => {
    if (!listAddress?.data?.length) return;
    const currentAddress = getShippingAddress();
    if (!currentAddress || Object.keys(currentAddress).length === 0) {
      setAddress(listAddress.data[0]);
    }
  }, [setAddress, listAddress, getShippingAddress]);

  return {
    addresses: listAddress?.data ?? [],
    refetch,
  };
};
