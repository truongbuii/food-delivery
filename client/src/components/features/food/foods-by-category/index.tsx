"use client";

import { FilterForm, HorizontalCard } from "@/components/molecule";
import { ShortByOptions } from "@/components/molecule/FilterForm/data";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { IFoodResponse } from "@/interfaces";
import { MapperFood } from "@/mapping/food.mapping";
import { useGetFoodsByParams } from "@/queries";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const FoodsByCategory = () => {
  const param = useSearchParams();
  const category = param.get("category");
  const categoryId = category ? parseInt(category, 10) : null;

  const { ref, inView } = useInView();

  const [filters, setFilters] = useState({
    categoryId,
    rating: null,
    popular: null,
    sortAsc: null,
    priceValues: [0, 200],
    size: 3,
  });

  const {
    data: foods,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFoodsByParams(
    filters.categoryId,
    null,
    filters.rating,
    null,
    filters.popular,
    filters.sortAsc,
    filters.priceValues[0],
    filters.priceValues[1],
    filters.size
  );

  useEffect(() => {
    setFilters((prev) => ({ ...prev, categoryId }));
  }, [categoryId]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const listFoods: IFoodResponse[] =
    foods?.pages.flatMap(
      (page) => page?.data?.values?.map((food) => MapperFood(food)) || []
    ) || [];

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <Sheet key="right">
      <div className="w-full">
        <div className="flex flex-col gap-14">
          <div className="flex flex-col text-lightGray">
            <div className="font-bold text-primary">
              <p className="text-[43px] leading-10">Food</p>
              <p className="text-[43px]">Delivery</p>
            </div>
            <div>
              <span className="text-xl text-lightGray">
                {listFoods?.length} types of food
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between h-5">
              <div className="flex w-full h-5 gap-2">
                <span className="text-sm">Short by: </span>
                <Select
                  onValueChange={(selected) => {
                    const value = {
                      popular: selected.includes("popular"),
                      sortAsc: selected.includes("sortBy"),
                    };
                    handleFilterChange(value);
                  }}
                >
                  <SelectTrigger className="flex justify-center items-center w-full h-5 text-sm max-w-24 border-none shadow-none focus:ring-0 focus:ring-none text-primary">
                    <SelectValue
                      placeholder="Select..."
                      className="text-primary"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ShortByOptions.map((option) => (
                        <SelectItem key={option.key} value={option.key}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <SheetTrigger asChild>
                <Button
                  className="inline-flex items-center justify-center w-5 h-5 [&_svg]:pointer-events-none "
                  variant={"link"}
                >
                  <SlidersHorizontal
                    strokeWidth={2}
                    size={20}
                    style={{ color: "hsl(var(--primary))" }}
                  />
                </Button>
              </SheetTrigger>
            </div>

            <div className="flex flex-col gap-3">
              {listFoods?.map((food) => (
                <HorizontalCard
                  type="food"
                  key={food.id}
                  item={food}
                  className="w-full py-1"
                  variant="lg"
                />
              ))}
            </div>
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
      </div>
      <FilterForm onFilterChange={handleFilterChange} />
    </Sheet>
  );
};

export default FoodsByCategory;
