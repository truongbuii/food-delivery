import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessage } from "@/hooks/useMessage";

import { IApiErrorResponse, ICartItem, ICartItemResponse } from "@/interfaces";
import { useRemoveCartItem, useUpdateCartItem } from "@/queries/cart";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

const CartItem: FC<{ cartItems: ICartItemResponse[] }> = ({ cartItems }) => {
  const message = useMessage();
  const { mutateAsync } = useRemoveCartItem();
  const { mutateAsync: updateCartItem } = useUpdateCartItem();

  const handleDelete = async (addressId: number) => {
    mutateAsync(addressId, {
      onSuccess: () => {
        message.success("Item removed successfully");
      },
      onError: (error: IApiErrorResponse) => {
        message.error(error.message);
      },
    });
  };

  const handleUpdate = async (item: ICartItem) => {
    console.log(item);

    updateCartItem(item, {
      onError: (error: IApiErrorResponse) => {
        message.error(error.message);
      },
    });
  };
  return (
    <ScrollArea className="h-52">
      {cartItems.map((item, index) => (
        <div className="py-2 pr-3" key={index}>
          <div className="flex gap-5">
            <div className="relative w-20 h-20 rounded-[18px] overflow-hidden">
              <Image
                src={item.foodImageUrl}
                alt="food"
                sizes="100%"
                fill
                className="object-cover "
              />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="flex-1 font-semibold text-lg">
                    {item.foodName}
                  </span>
                  <Button
                    className="w-3 h-full py-0"
                    variant={"ghost"}
                    onClick={() => handleDelete(item.id)}
                  >
                    <span className="text-primary">x</span>
                  </Button>
                </div>
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
                        with {item.selectedAddons.length} addon items
                      </span>
                      <ChevronsUpDown className="h-3 w-3 text-lightGray" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="">
                    {item.selectedAddons.map((addon, index) => (
                      <div
                        className="w-36 flex justify-between font-light text-xs text-lightGray pr-4"
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
                  <span className="font-semibold text-lg">
                    ${item.foodPrice}
                  </span>
                  <span className="text-xs text-lightGray">
                    +$
                    {item.selectedAddons.reduce(
                      (sum, addon) => sum + addon.price,
                      0
                    )}
                  </span>
                </div>
                <div className="flex gap-1 h-7">
                  <Button
                    variant={"outline"}
                    className="rounded-full bg-white w-7 h-7 p-0 hover:bg-white"
                    onClick={() => {
                      if (item.quantity >= 1)
                        handleUpdate({
                          cartItemId: item.id,
                          foodId: item.foodId,
                          quantity: item.quantity - 1,
                        });
                    }}
                  >
                    <span className="text-black">-</span>
                  </Button>
                  <span className="!leading-7 h-full text-sm text-center font-semibold min-w-5">
                    {item.quantity}
                  </span>
                  <Button
                    variant={"outline"}
                    className="rounded-full bg-primary w-7 h-7 p-0 hover:bg-primary"
                    onClick={() => {
                      handleUpdate({
                        cartItemId: item.id,
                        foodId: item.foodId,
                        quantity: item.quantity + 1,
                      });
                    }}
                  >
                    <span className="text-white">+</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default CartItem;
