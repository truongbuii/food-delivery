import { Button } from "@/components/ui/button";
import { ORDER_STATUS_COLOR, PATHNAME } from "@/configs";
import { useMessage } from "@/hooks/useMessage";
import { IApiErrorResponse, IOrderResponse, ORDER_STATUS } from "@/interfaces";
import { useReOrderMutation, useUpdateOrderMutation } from "@/queries";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";

const OrderItem: FC<{ order: IOrderResponse }> = ({ order }) => {
  const router = useRouter();
  const message = useMessage();
  const { mutateAsync, isPending } = useUpdateOrderMutation();
  const { mutateAsync: reOrderMutation, isPending: reOrderPending } =
    useReOrderMutation();

  const handleCancelOrder = useCallback(() => {
    mutateAsync(
      { id: order.id, status: ORDER_STATUS.CANCELLED },
      {
        onSuccess: () => {
          message.success("Order cancelled successfully");
        },
        onError: (err: IApiErrorResponse) => {
          message.error(err?.message);
        },
      }
    );
  }, [mutateAsync, message, order.id]);

  const handleReOrder = useCallback(() => {
    reOrderMutation(order.id, {
      onSuccess: () => {
        router.push(PATHNAME.CART);
      },
      onError: (err: IApiErrorResponse) => {
        message.error(err?.message);
      },
    });
  }, [message, order.id, reOrderMutation, router]);

  return (
    <div className="p-4 bg-secondary shadow-foodShadow rounded-2xl ">
      <div className="flex flex-col gap-4">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => router.push(`${PATHNAME.ORDER.DETAIL}/${order.id}`)}
        >
          <div className="relative w-16 h-16">
            <Image
              src={order.restaurantImage}
              alt="restaurant"
              fill
              sizes="100%"
              className="w-full h-full rounded-2xl"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between">
              <div className="flex items-center text-xs text-lightGray">
                <span>{order.updatedAt}</span>
                <span className="mx-2 text-base">•</span>
                <span>{order.numberItem}</span>
              </div>
              <span className="text-[#FFC529] text-lg">
                ${order.totalPrice}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">{order.restaurantName}</span>
              {order.verifiedBadge === true && (
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
                ORDER_STATUS_COLOR[order.status]
              }`}
            >
              <span className="text-base">•</span>
              <span className="text-xs font-medium">{order.status}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            size={"md"}
            className="w-32 rounded-[40px] hover:bg-background bg-background shadow-socialBtnShadow"
          >
            <span className="text-ring font-medium">Rate</span>
          </Button>
          {order.status === ORDER_STATUS.PENDING ? (
            <Button
              size={"md"}
              className="w-32 rounded-[40px] bg-[#be1201] hover:bg-[#be1201]"
              onClick={handleCancelOrder}
              loading={isPending}
              disabled={isPending}
            >
              CANCEL
            </Button>
          ) : (
            <Button
              size={"md"}
              className="w-32 rounded-[40px] hover:bg-primary"
              onClick={handleReOrder}
              loading={reOrderPending}
              disabled={reOrderPending}
            >
              Re-Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
