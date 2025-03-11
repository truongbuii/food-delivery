"use client";

import { Avatar } from "@/components/molecule";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  IMAGES_CONST,
  ORDER_STATUS_COLOR,
  PATHNAME,
  PAYMENT_STATUS_COLOR,
} from "@/configs";
import { useMessage } from "@/hooks/useMessage";
import { IApiErrorResponse } from "@/interfaces";
import { MapperOrder, MapperOrderItem } from "@/mapping/order.mapping";
import {
  useGetOrderDetail,
  useGetOrderItemsByOrderId,
  useReOrderMutation,
} from "@/queries";
import { ChevronLeft, ChevronsUpDown, CircleCheck } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

const OrderDetail = () => {
  const router = useRouter();
  const param = useParams();
  const message = useMessage();
  const orderId = parseInt(param.slug as string, 10);
  const { data: order } = useGetOrderDetail(orderId);
  const { data: orderItems } = useGetOrderItemsByOrderId(orderId);
  const { mutateAsync: reOrderMutation, isPending: reOrderPending } =
    useReOrderMutation();
  const _order = order?.data ? MapperOrder(order.data) : null;
  const _orderItems = orderItems?.data
    ? orderItems.data.map((item) => MapperOrderItem(item))
    : [];

  const handleReOrder = useCallback(() => {
    if (!_order) return;
    reOrderMutation(_order.id, {
      onSuccess: () => {
        router.push(PATHNAME.CART);
      },
      onError: (err: IApiErrorResponse) => {
        message.error(err?.message);
      },
    });
  }, [message, _order, reOrderMutation, router]);
  return (
    <>
      {_order && (
        <>
          <div className="relative py-6 flex items-center z-[50] w-full">
            <Button
              className="bg-secondary w-10 h-10 rounded-[12px] shadow-backBtnShadow hover:bg-primary"
              onClick={() => router.push(PATHNAME.ORDER.MY_ORDERS)}
            >
              <ChevronLeft size={18} className="text-foreground" />
            </Button>
            <p className="flex-1 w-full text-center leading-10 text-lg font-medium">
              Orders Details
            </p>
            <Avatar className="w-10 h-10 rounded-xl" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src={_order.restaurantImage}
                  alt={_order.restaurantName}
                  fill
                  sizes="100%"
                  className="w-full h-full rounded-2xl"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between gap-8">
                  <div className="flex items-center text-xs text-lightGray">
                    <span>{_order.updatedAt}</span>
                  </div>
                  <span className="text-[#FFC529] text-lg">#{_order.id}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{_order.restaurantName}</span>
                  {_order.verifiedBadge && (
                    <CircleCheck
                      color="#029094"
                      strokeWidth={2}
                      size={10}
                      className="mt-1"
                    />
                  )}
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    ORDER_STATUS_COLOR[_order.status]
                  }`}
                >
                  <span className="text-base">•</span>
                  <span className="text-xs">ORDER {_order.status}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">Details</p>
              <p className="text-lightGray font-medium text-sm">
                {_order.orderAddress}
              </p>
              <div className="flex gap-4 my-2">
                <div className="relative w-10 h-10">
                  <Image
                    src={IMAGES_CONST.common.defaultAvatar}
                    alt="driver"
                    fill
                    sizes="100%"
                    className="w-full h-full rounded-xl"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-lightGray text-xs">
                    ID: DKS-501F9
                  </p>
                  <p className="font-semibold text-base">Jhon Wick</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold">Orders food</p>
                <ScrollArea className="h-40">
                  {_orderItems.map((item, index) => (
                    <div className="py-2 pr-3" key={index}>
                      <div className="flex gap-5">
                        <div className="relative w-20 h-20 rounded-[18px] overflow-hidden">
                          <Image
                            src={item.foodImage}
                            alt={item.foodName}
                            sizes="100%"
                            fill
                            className="object-cover "
                          />
                        </div>
                        <div className="flex flex-col flex-1 gap-1">
                          <div className="flex flex-col">
                            <span className="flex-1 font-semibold text-lg">
                              {item.foodName}
                            </span>
                            <Collapsible>
                              <CollapsibleTrigger
                                className="text-xs text-lightGray "
                                asChild
                              >
                                <Button
                                  variant="ghost"
                                  size="xs"
                                  className="p-0 hover:bg-background"
                                >
                                  <span className="text-lightGray text-xs font-light ">
                                    with {item.foodAddons.length} addon items
                                  </span>
                                  <ChevronsUpDown className="h-3 w-3 text-lightGray" />
                                </Button>
                              </CollapsibleTrigger>
                              <CollapsibleContent className="">
                                {item.foodAddons.map((addon, index) => (
                                  <div
                                    className="w-36 flex justify-between font-light text-xs text-lightGray"
                                    key={index}
                                  >
                                    <span>{addon.name}</span>
                                    <span className="ml-1">${addon.price}</span>
                                  </div>
                                ))}
                              </CollapsibleContent>
                            </Collapsible>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-lg ">
                                ${item.foodPrice} {""}
                                <span className="text-base">
                                  x{item.quantity}
                                </span>
                              </span>
                              <span className="text-xs text-lightGray">
                                +$
                                {item.foodAddons.reduce(
                                  (sum, addon) => sum + addon.price,
                                  0
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
            <div>
              <div className="px-2">
                <div className="flex justify-between py-3">
                  <span>Payment method</span>
                  <span>{_order.paymentMethod}</span>
                </div>
                <Separator />
              </div>
              <div className="px-2">
                <div className="flex justify-between py-3">
                  <span>Payment status</span>
                  <span
                    className={`${PAYMENT_STATUS_COLOR[_order.paymentStatus]}`}
                  >
                    {_order.paymentStatus}
                  </span>
                </div>
                <Separator />
              </div>
              <div className="px-2">
                <div className="flex justify-between pt-3">
                  <span>Total</span>
                  <span>${_order.totalPrice}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Button
                size={"md"}
                className="w-36 h-14 rounded-[40px] hover:bg-secondary bg-secondary shadow-socialBtnShadow"
                onClick={() =>
                  router.push(
                    `${PATHNAME.RESTAURANT}/rating/${_order.restaurantSlug}`
                  )
                }
              >
                <span className="text-ring font-medium">Rate</span>
              </Button>
              <Button
                size={"md"}
                className="w-36 h-14 rounded-[40px] hover:bg-primary"
                onClick={handleReOrder}
                loading={reOrderPending}
                disabled={reOrderPending}
              >
                Re-Order
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetail;
