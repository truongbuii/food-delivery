"use client";

import FoodAddons from "@/components/features/food/food-addons";
import { HeartButton } from "@/components/molecule/CardItem";
import { IconBag, IconStar } from "@/components/molecule/svgs";
import { Button } from "@/components/ui/button";
import { PATHNAME } from "@/configs";
import { useAddons } from "@/contexts/AddonsContext";
import { useMessage } from "@/hooks/useMessage";
import { IApiErrorResponse } from "@/interfaces";
import { MapperFood } from "@/mapping/food.mapping";
import {
  QUERIES_KEY,
  useAddCartItem,
  useGetFoodBySlug,
  useToggleFavoriteFoodMutation,
} from "@/queries";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";

const FoodProfile = () => {
  const param = useParams();
  const message = useMessage();
  const [quantity, setQuantity] = useState<number>(1);
  const { data: food } = useGetFoodBySlug(param.slug as string);
  const _food = food?.data ? MapperFood(food.data) : null;
  const { selectedAddons } = useAddons();
  const { mutateAsync, isPending } = useAddCartItem();
  const { mutateAsync: toggleFavoriteFoodMutation } =
    useToggleFavoriteFoodMutation();

  const handleAddToCart = useCallback(() => {
    if (!_food) return;

    const _selectedAddons = selectedAddons.map((addon) => ({
      id: addon.id,
      name: addon.name,
      price: addon.price,
    }));
    mutateAsync(
      { foodId: _food.id, quantity: quantity, selectedAddons: _selectedAddons },
      {
        onSuccess: () => {
          message.success("Item added to cart");
        },
        onError: (err: IApiErrorResponse) => {
          message.warning(err?.message);
        },
      }
    );
  }, [_food, quantity, selectedAddons, mutateAsync, message]);

  const queryClient = useQueryClient();
  const handleToggleFavorite = useCallback(() => {
    if (!_food) return;

    queryClient.setQueryData([QUERIES_KEY.FOOD.GET_BY_SLUG], (oldData: any) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        data: {
          ...oldData.data,
          favorite: !_food.favorite,
        },
      };
    });
    toggleFavoriteFoodMutation(_food.id);
  }, [toggleFavoriteFoodMutation, _food, queryClient]);

  return (
    <div className="flex flex-col w-full gap-4">
      {_food && (
        <div className="flex flex-col gap-6">
          <div className="relative">
            <div className="relative w-full h-36 rounded-2xl overflow-hidden">
              <Image
                src={_food.imageUrl}
                alt={_food.name}
                fill
                sizes="100%"
                priority
                className="object-cover"
              />
            </div>
            <HeartButton
              onClick={handleToggleFavorite}
              favorite={_food.favorite}
            />
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-3xl">{_food.name}</h1>
            <div className="flex items-center gap-2 text-sm">
              <IconStar width={15} height={15} />
              <span>{_food.totalStars}</span>
              <span className="text-lightGray">({_food.totalReviews}+)</span>
              <Link
                href={`${PATHNAME.FOOD}/${param.slug}/reviews`}
                className="text-primary text-xs underline"
              >
                See Review
              </Link>
            </div>

            <div className="flex justify-between">
              <div>
                $<span className="font-medium text-3xl">{_food.price}</span>
              </div>
              <div className="flex gap-2 h-9">
                <Button
                  variant={"outline"}
                  className="rounded-full border-lightGray w-9 h-9 p-0 hover:bg-primary"
                  onClick={() => {
                    if (quantity > 0) setQuantity(quantity - 1);
                  }}
                >
                  <span className="text-lightGray">-</span>
                </Button>
                <span className="!leading-9 h-full text-base text-center font-semibold min-w-5">
                  {quantity}
                </span>
                <Button
                  variant={"outline"}
                  className="rounded-full border-lightGray w-9 h-9 hover:bg-primary"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <span className="text-lightGray">+</span>
                </Button>
              </div>
            </div>
            <p className="text-lightGray text-base leading-[1.5]">
              {_food.description}
            </p>

            <FoodAddons addons={_food.addons} />
          </div>
        </div>
      )}
      <Button
        size={"lg"}
        className="w-auto m-auto mt-2 rounded-[40px] px-3 text-left hover:bg-primary shadow-primaryBtnShadow"
        onClick={handleAddToCart}
        disabled={isPending}
        loading={isPending}
      >
        <div className="flex justify-center items-center w-10 h-10 bg-white rounded-full">
          <IconBag />
        </div>
        ADD TO CART
      </Button>
    </div>
  );
};

export default FoodProfile;
