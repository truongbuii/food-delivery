"use client";

import FoodAddons from "@/components/features/food/food-addons";
import { IconBag, IconStar } from "@/components/molecule/svgs";
import { Button } from "@/components/ui/button";
import { useAddons } from "@/contexts/AddonsContext";
import { MapperFood } from "@/mapping/food.mapping";
import { useGetFoodBySlug } from "@/queries";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const FoodProfile = () => {
  const param = useParams();
  const [quantity, setQuantity] = useState<number>(1);
  const { data: food } = useGetFoodBySlug(param.slug as string);
  const _food = food?.data ? MapperFood(food.data) : null;
  const { selectedAddons } = useAddons();
  console.log(selectedAddons);

  return (
    <div className="flex flex-col w-full gap-4">
      {_food && (
        <div className="flex flex-col gap-6">
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

          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-3xl">{_food.name}</h1>
            <div className="flex items-center gap-2 text-sm">
              <IconStar width={15} height={15} />
              <span>{_food.totalStars}</span>
              <span className="text-lightGray">({_food.totalReviews}+)</span>
              <Link href="" className="text-primary text-xs underline">
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
                  -
                </Button>
                <span className="!leading-9 h-full text-base text-center font-semibold min-w-5">
                  {quantity}
                </span>
                <Button
                  variant={"outline"}
                  className="rounded-full border-lightGray w-9 h-9 hover:bg-primary"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
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
