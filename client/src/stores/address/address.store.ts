import { SHIPPING_ADDRESS } from "@/configs";
import { IDeliveryAddressResponse } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAddressState {
  shippingAddress: IDeliveryAddressResponse;
  setAddress: (address: IDeliveryAddressResponse) => void;
  getShippingAddress: () => IDeliveryAddressResponse;
  resetAddress: () => void;
}

export const useAddressStore = create<IAddressState>()(
  persist(
    (set, get) => ({
      shippingAddress: {} as IDeliveryAddressResponse,

      setAddress: (address: IDeliveryAddressResponse) => {
        set(() => ({ shippingAddress: address }));
      },

      getShippingAddress: () => get().shippingAddress,
      resetAddress: () => {
        set(() => ({ shippingAddress: {} as IDeliveryAddressResponse }));
      },
    }),
    { name: SHIPPING_ADDRESS }
  )
);
