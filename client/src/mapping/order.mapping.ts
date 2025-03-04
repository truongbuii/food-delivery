import { IOrderResponse } from "@/interfaces";
const MapperOrder = (order: Record<string, any>): IOrderResponse => {
  return {
    id: order.id ?? "",
    restaurantId: order.restaurantId ?? "",
    restaurantName: order.restaurantName ?? "",
    restaurantImage: order.restaurantImage ?? "",
    verifiedBadge: order.verifiedBadge ?? false,
    totalPrice: order.totalPrice ?? 0.0,
    status: order.status ?? "",
    numberItem: order.numberItem ?? "",
    orderAddress: order.orderAddress ?? "",
    paymentMethod: order.paymentMethod ?? "",
    paymentStatus: order.paymentStatus ?? "",
    discount: order.discount ?? 0.0,
    updatedAt: order.updatedAt ?? "",
  };
};

export { MapperOrder };
