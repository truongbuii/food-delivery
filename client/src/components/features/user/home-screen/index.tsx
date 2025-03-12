"use client";

import CategoryCarousel from "@/components/features/category/category-carousel";
import {
  FilterForm,
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
import { useGetFeaturedFoods, useGetFeaturedRestaurants } from "@/queries";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HomeScreen = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    categoryId: null as number | null,
    rating: null,
    freeDelivery: null,
    popular: null,
    priceValues: [0, 100],
  });

  const handleCategoryChange = (id: number | null) => {
    setFilters((prev) => ({ ...prev, categoryId: id }));
  };

  const { data: restaurants } = useGetFeaturedRestaurants();

  const { data: foods } = useGetFeaturedFoods();

  const _restaurants = restaurants?.data?.map((restaurant) =>
    MapperRestaurant(restaurant)
  );
  const _foods = foods?.data?.map((food) => MapperFood(food));
  const handleFilterChange = (newFilters: any) =>
    setFilters((prev) => ({ ...prev, ...newFilters }));

  return (
    <>
      <div className="flex flex-col">
        <SearchAndFilter />
        {/* Category */}
        <div className="flex mt-4">
          <CategoryCarousel
            selectedCategory={filters.categoryId}
            onClick={handleCategoryChange}
          />
        </div>

        <div className="flex flex-col pb-6">
          {/* Featured restaurants */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">
                Featured restaurants
              </span>
              <Link
                href={PATHNAME.LIST.RESTAURANT_BY}
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
                    <CarouselItem
                      key={restaurant.id}
                      className="basis-5/5 mr-4 cursor-pointer"
                      onClick={() =>
                        router.push(`${PATHNAME.RESTAURANT}/${restaurant.slug}`)
                      }
                    >
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
                  filters.categoryId
                    ? `${PATHNAME.LIST.FOOD_BY}?category=${filters.categoryId}`
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
      <FilterForm onFilterChange={handleFilterChange} />
    </>
  );
};

export default HomeScreen;
