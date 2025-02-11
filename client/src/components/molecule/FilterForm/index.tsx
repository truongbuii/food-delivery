"use client";

import CategoryItem from "@/components/molecule/CategoryItem";
import { ShortByOptions } from "@/components/molecule/FilterForm/data";
import { IconStar } from "@/components/molecule/svgs";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { MapperCategory } from "@/mapping/category.mapping";
import { useGetCategories } from "@/queries";
import { ChevronLeft } from "lucide-react";
import { FC, useState } from "react";

interface FilterFormProps {
  categoryId?: number;
  shortBy?: string;
  rating?: number;
  priceRange?: any;
}

const FilterForm: FC<FilterFormProps> = ({}) => {
  const [priceValues, setPriceValues] = useState([0, 500]);
  const [rating, setRating] = useState<number | null>(null);
  const [selectedShortBy, setSelectedShortBy] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: category } = useGetCategories();
  const _categories = category?.data?.map((category) =>
    MapperCategory(category)
  );
  const handleSelectCategory = (id: number) => {
    setSelectedCategory(id);
  };

  const handleSelectShortBy = (shortBy: string) => {
    setSelectedShortBy(shortBy);
  };

  const handleSelectRating = (rating: number) => {
    setRating(rating);
  };

  const handleValueChange = (newValues: any) => {
    setPriceValues(newValues);
  };

  const handleApplyFilter = () => {
    console.log({
      selectedCategory,
      selectedShortBy,
      rating,
      priceValues,
    });
  };

  return (
    <>
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
                isSelected={selectedCategory === category.id}
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
            {ShortByOptions.map((option) => (
              <div
                key={option.key}
                className={cn(
                  "flex items-center w-auto h-10 p-1 rounded-[40px] cursor-pointer px-3",
                  selectedShortBy === option.key
                    ? "bg-primary text-white"
                    : "bg-secondary"
                )}
                onClick={() => handleSelectShortBy(option.key)}
              >
                <p className="text-xs text-center">{option.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-lg font-semibold">Rating</p>
          <div className="flex flex-wrap gap-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <Button
                key={star}
                className={cn(
                  "text-xs text-center px-2 bg-secondary w-14 h-10 p-1 rounded-[40px]",
                  rating === star ? "bg-primary text-white" : ""
                )}
                variant={"ghost"}
                onClick={() => handleSelectRating(star)}
              >
                {star}
                <IconStar size={13} />
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Price Range</p>
            <p className="text-base font-light">
              {`$${priceValues[0]} - $${priceValues[1]}`}{" "}
            </p>
          </div>
          <Slider
            defaultValue={priceValues}
            value={priceValues}
            minStepsBetweenThumbs={10}
            max={500}
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
            className="m-auto w-36 h-14 mt-2 rounded-[40px] hover:bg-primary bg-secondary border-primary"
            onClick={() => {
              setPriceValues([0, 500]);
              setRating(null);
              setSelectedShortBy(null);
              setSelectedCategory(null);
            }}
          >
            Reset
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
    </>
  );
};

export default FilterForm;
