"use client";

import { VerticalCard } from "@/components/molecule";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { ICategory, IFoodResponse } from "@/interfaces";
import { MapperFood } from "@/mapping/food.mapping";
import { useGetFoodsByParams } from "@/queries";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const RestaurantFoods: FC<{
  categories: ICategory[];
  restaurantSlug: string;
}> = ({ categories, restaurantSlug }) => {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const { ref, inView } = useInView();
  const {
    data: foods,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFoodsByParams(
    categoryId,
    restaurantSlug,
    null,
    null,
    null,
    null,
    null,
    null,
    10
  );

  const _foods: IFoodResponse[] =
    foods?.pages.flatMap(
      (page) => page?.data?.values?.map((food) => MapperFood(food)) || []
    ) || [];

  const handleClick = (id: number) => {
    setCategoryId(id);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col gap-4">
      <Carousel
        className="w-full max-w-max"
        opts={{ align: "start", dragFree: true }}
      >
        <CarouselContent>
          <CarouselItem className="basis-5/5">
            <button
              className={`w-auto h-8 rounded-2xl border border-lightGray ${
                categoryId === null
                  ? "bg-primary border-primary text-white"
                  : ""
              }`}
              onClick={() => setCategoryId(null)}
            >
              <span className="flex items-center w-full h-full font-medium text-sm px-4">
                All
              </span>
            </button>
          </CarouselItem>
          {categories.map((category) => (
            <CarouselItem key={category.id} className="basis-5/5 pl-1">
              <button
                key={category.id}
                className={`w-auto h-8 rounded-2xl border border-lightGray ${
                  categoryId === category.id
                    ? "bg-primary border-primary text-white"
                    : ""
                }`}
                onClick={() => handleClick(category.id)}
              >
                <span className="flex items-center w-full h-full font-medium text-sm px-4">
                  {category.name}
                </span>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="grid grid-cols-2 gap-4">
        {_foods?.map((food) => (
          <VerticalCard key={food.id} type="food" item={food} />
        ))}
        <div ref={ref}>
          {isFetchingNextPage && (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantFoods;
