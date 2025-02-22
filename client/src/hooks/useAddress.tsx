import { useGetAllDeliverAddr } from "@/queries";
import { useUserStore } from "@/stores";
import { useAddressStore } from "@/stores/address/address.store";
import { useEffect } from "react";

export const useDeliveryAddresses = () => {
  const userId = useUserStore((state) => state.userInfo?.id);
  const { setAddress } = useAddressStore();

  const { data: listAddress, refetch } = useGetAllDeliverAddr(userId!);

  useEffect(() => {
    if (listAddress?.data?.length) {
      setAddress(listAddress?.data[0]);
    }
  }, [setAddress]);

  return {
    addresses: listAddress?.data ?? [],
    refetch,
  };
};
