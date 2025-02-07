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
import { useGetFoods, useGetRestaurants } from "@/queries";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const HomeScreen = () => {
  const { data: restaurants } = useGetRestaurants();
  const { data: foods } = useGetFoods();

  return (
    <div className="flex flex-col">
      <SearchAndFilter />
      {/* Category */}
      <div className="flex mt-4">
        <CategoryCarousel />
      </div>

      <div className="flex flex-col pb-6">
        {/* Featured restaurants */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Featured restaurants</span>
            <Link
              href="/restaurants"
              className="flex gap-[2px] items-center text-xs text-primary font-medium"
            >
              View All
              <ChevronRight size={10} className="mt-[2px]" />
            </Link>
          </div>
          <div className="">
            <Carousel
              className="w-full max-w-max"
              opts={{ align: "start", dragFree: true }}
            >
              <CarouselContent>
                {restaurants?.data?.map((restaurant) => (
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
          <span className="text-lg font-semibold">Popular items</span>
          <div className="grid grid-cols-2 gap-4">
            {foods?.data?.map((food) => (
              <VerticalCard key={food.id} type="food" item={food} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
