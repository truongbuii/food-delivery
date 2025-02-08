"use client";
import { BadgeNumber, HorizontalCard } from "@/components/molecule";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useFeaturedFoods } from "@/queries";
import { FC } from "react";

const RestaurantFeaturedItems: FC<{ restaurantSlug: string }> = ({
  restaurantSlug,
}) => {
  const { data: foods } = useFeaturedFoods(restaurantSlug);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <span className="text-lg font-semibold">Featured Items</span>
        {foods?.data && (
          <BadgeNumber
            className="flex justify-center items-center w-[15px] text-xs rounded-md"
            number={foods?.data?.length}
          />
        )}
      </div>
      <div className="">
        <Carousel
          className="w-full max-w-max"
          opts={{ align: "start", dragFree: true }}
        >
          <CarouselContent>
            {foods?.data?.map((food) => (
              <CarouselItem key={food.id} className="basis-5/5 pr-4">
                <div className="pb-8">
                  <HorizontalCard type="food" item={food} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default RestaurantFeaturedItems;
