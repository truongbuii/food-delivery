"use client";

import CategoryItem from "@/components/molecule/CategoryItem";
import { ShortByOptions } from "@/components/molecule/FilterForm/data";
import { IconStar } from "@/components/molecule/svgs";
import { Button } from "@/components/ui/button";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { VIEWER_CONTAINER_ID } from "@/configs";
import { cn } from "@/lib/utils";
import { MapperCategory } from "@/mapping/category.mapping";
import { useGetCategories } from "@/queries";
import { ChevronLeft } from "lucide-react";
import { FC, useEffect, useState } from "react";

const FilterForm: FC<{ onFilterChange?: (filters: any) => void }> = ({
  onFilterChange,
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [filters, setFilters] = useState<{
    categoryId: number | null;
    rating: number | null;
    priceValues: number[];
    selectedSortOptions: string[];
  }>({
    categoryId: null,
    rating: null,
    priceValues: [0, 200],
    selectedSortOptions: [],
  });

  useEffect(() => {
    setContainer(document.getElementById(VIEWER_CONTAINER_ID));
  }, []);

  const { data: category } = useGetCategories();
  const _categories = category?.data?.map((category) =>
    MapperCategory(category)
  );
  const handleSelectCategory = (id: number) => {
    setFilters((prev) => ({ ...prev, categoryId: id }));
  };

  const handleSelectRating = (rating: number) => {
    setFilters((prev) => ({ ...prev, rating }));
  };

  const handleValueChange = (newValues: any) => {
    setFilters((prev) => ({ ...prev, priceValues: newValues }));
  };

  const handleSortByChange = (selected: string[]) => {
    setFilters((prev) => ({ ...prev, selectedSortOptions: selected }));
  };

  const handleApplyFilter = () => {
    const value = {
      categoryId: filters.categoryId,
      rating: filters.rating,
      freeDelivery: filters.selectedSortOptions.includes("freeDelivery"),
      popular: filters.selectedSortOptions.includes("popular"),
      priceValues: filters.priceValues,
    };
    onFilterChange?.(value);
  };

  const handleResetFilter = () => {
    setFilters({
      priceValues: [0, 200],
      rating: null,
      categoryId: null,
      selectedSortOptions: [],
    });
    onFilterChange?.({
      categoryId: null,
      rating: null,
      freeDelivery: null,
      popular: null,
      priceValues: [0, 200],
    });
  };

  return (
    <SheetContent
      side={"right"}
      container={container}
      className="w-full z-[150]"
    >
      <SheetHeader>
        <SheetTitle>
          <div className="relative p-6 flex items-center z-[50] w-full">
            <SheetClose asChild>
              <Button className="bg-secondary w-10 h-10 rounded-[12px] shadow-backBtnShadow hover:bg-primary ">
                <ChevronLeft size={18} className="text-foreground" />
              </Button>
            </SheetClose>
            <h2 className="flex-1 w-full text-center leading-10 text-lg font-medium">
              Filter
            </h2>
          </div>
        </SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
      <div className="flex flex-col px-6 gap-10">
        <div className="flex flex-col gap-5">
          <p className="text-lg font-semibold">Cuisines</p>
          <div className="flex flex-wrap gap-3">
            {_categories?.map((category) => (
              <CategoryItem
                key={category.id}
                type="filter"
                image={category.imageUrl}
                title={category.name}
                isSelected={filters.categoryId === category.id}
                onClick={() => {
                  handleSelectCategory(category.id);
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-lg font-semibold">Short by</p>
          <div className="flex flex-wrap gap-3">
            <ToggleGroup
              type="multiple"
              value={filters.selectedSortOptions}
              onValueChange={handleSortByChange}
            >
              {ShortByOptions.map((option) => (
                <ToggleGroupItem
                  key={option.key}
                  value={option.key}
                  className="flex items-center w-auto h-10 p-1 rounded-[40px] cursor-pointer px-3 bg-secondary shadow-[0px_10px_20px_-4px_rgb(0,0,0,.06)]"
                >
                  <p className="text-xs text-center">{option.value}</p>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-lg font-semibold">Rating</p>
          <div className="flex flex-wrap justify-between">
            {[5, 4, 3, 2, 1].map((star) => (
              <Button
                key={star}
                className={cn(
                  "text-xs text-center px-2 bg-secondary w-14 h-10 p-1 rounded-[40px]",
                  filters.rating === star
                    ? "bg-primary text-white shadow-[0px_10px_30px_0px_rgb(254,114,76,.25)]"
                    : "bg-secondary shadow-[0px_10px_20px_-4px_rgb(0,0,0,.06)]"
                )}
                variant={"ghost"}
                onClick={() => handleSelectRating(star)}
              >
                <span className="text-accent-foreground">{star}</span>
                <IconStar size={13} />
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Price Range</p>
            <p className="text-base font-light">
              {`$${filters.priceValues[0]} - $${filters.priceValues[1]}`}{" "}
            </p>
          </div>
          <Slider
            defaultValue={filters.priceValues}
            value={filters.priceValues}
            minStepsBetweenThumbs={10}
            max={200}
            min={0}
            step={1}
            onValueChange={handleValueChange}
            className={cn("w-full")}
          />
        </div>
        <div className="flex">
          <Button
            size={"md"}
            variant={"outline"}
            className="m-auto w-36 h-14 mt-2 rounded-[40px] hover:bg-secondary bg-secondary border-primary"
            onClick={handleResetFilter}
          >
            <span className="text-primary">Reset</span>
          </Button>
          <Button
            size={"md"}
            className="m-auto w-36 h-14 mt-2 rounded-[40px] hover:bg-primary shadow-primaryBtnShadow"
            onClick={handleApplyFilter}
          >
            Apply
          </Button>
        </div>
      </div>
    </SheetContent>
  );
};

export default FilterForm;
