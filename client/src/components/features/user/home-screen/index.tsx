"use client";

import CategoryCarousel from "@/components/features/category/category-carousel";
import {
  HorizontalCard,
  SearchAndFilter,
  VerticalCard,
} from "@/components/molecule";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { PATHNAME } from "@/configs";
import { MapperFood } from "@/mapping/food.mapping";
import { MapperRestaurant } from "@/mapping/restaurant.mapping";
import { useGetFoodsByParams, useGetRestaurantsByParams } from "@/queries";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const HomeScreen = () => {
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const { data: restaurants } = useGetRestaurantsByParams(categoryId);

  const { data: foods } = useGetFoodsByParams(categoryId, null);

  const _restaurants = restaurants?.data?.map((restaurant) =>
    MapperRestaurant(restaurant)
  );
  const _foods = foods?.data?.map((food) => MapperFood(food));

  return (
    <div className="flex flex-col">
      <SearchAndFilter />
      {/* Category */}
      <div className="flex mt-4">
        <CategoryCarousel onClick={setCategoryId} />
      </div>

      <div className="flex flex-col pb-6">
        {/* Featured restaurants */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Featured restaurants</span>
            <Link
              href={`${PATHNAME.LIST.RESTAURANT_BY}?category=${categoryId}`}
              className="flex gap-[2px] items-center text-xs text-primary font-medium"
            >
              View All
              <ChevronRight size={10} className="mt-[2px]" />
            </Link>
          </div>
          <div className="min-h-[262px]">
            <Carousel
              className="w-full max-w-max"
              opts={{ align: "start", dragFree: true }}
            >
              <CarouselContent>
                {_restaurants?.map((restaurant) => (
                  <CarouselItem key={restaurant.id} className="basis-5/5 pr-4">
                    <div className="pb-8">
                      <HorizontalCard type="restaurant" item={restaurant} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>

        {/* Featured items */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Popular items</span>
            <Link
              href={
                categoryId
                  ? `${PATHNAME.LIST.FOOD_BY}?category=${categoryId}`
                  : PATHNAME.LIST.FOOD_BY
              }
              className="flex gap-[2px] items-center text-xs text-primary font-medium"
            >
              View All
              <ChevronRight size={10} className="mt-[2px]" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {_foods?.map((food) => (
              <VerticalCard key={food.id} type="food" item={food} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
