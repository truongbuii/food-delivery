import { SHIPPING_ADDRESS } from "@/configs";
import { IDeliveryAddressResponse } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAddressState {
  shippingAddress: IDeliveryAddressResponse;
  setAddress: (address: IDeliveryAddressResponse) => void;
  resetAddress: () => void;
}

export const useAddressStore = create<IAddressState>()(
  persist(
    (set) => ({
      shippingAddress: {} as IDeliveryAddressResponse,

      setAddress: (address: IDeliveryAddressResponse) =>
        set(() => ({ shippingAddress: address })),
      resetAddress: () => {
        set(() => ({ shippingAddress: {} as IDeliveryAddressResponse }));
      },
    }),
    { name: SHIPPING_ADDRESS }
  )
);
