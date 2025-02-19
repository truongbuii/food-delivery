import { ICartItemResponse } from "@/interfaces";

const MapperCartItem = (cartItem: Record<string, any>): ICartItemResponse => {
  return {
    id: cartItem.id ?? "",
    userId: cartItem.userId ?? "",
    foodId: cartItem.foodId ?? "",
    foodName: cartItem.foodName ?? "",
    foodImageUrl: cartItem.foodImageUrl ?? "",
    foodPrice: cartItem.foodPrice ?? "",
    quantity: cartItem.quantity ?? "",
    selectedAddons: cartItem.selectedAddons ?? [],
  };
};

export { MapperCartItem };
