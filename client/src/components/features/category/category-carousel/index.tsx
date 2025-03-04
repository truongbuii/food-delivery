"use client";

import { CategoryItem } from "@/components/molecule";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ICategory } from "@/interfaces";
import { MapperCategory } from "@/mapping/category.mapping";
import { useGetCategories } from "@/queries";
import { FC, useMemo } from "react";

const CategoryCarousel: FC<{
  selectedCategory: number | null;
  onClick: (id: number | null) => void;
}> = ({ selectedCategory, onClick }) => {
  const { data: categories } = useGetCategories();
  const _categories = useMemo(
    () => categories?.data?.map((category) => MapperCategory(category)) ?? [],
    [categories]
  );

  return (
    <Carousel
      className="w-full max-w-max"
      opts={{ align: "start", dragFree: true }}
    >
      <CarouselContent>
        {_categories.map((category: ICategory) => (
          <CarouselItem key={category.id} className="basis-5/5 pl-4">
            <div className="px-[2px]">
              <CategoryItem
                key={category.id}
                type="category"
                image={category.imageUrl}
                title={category.name}
                isSelected={selectedCategory === category.id}
                onClick={() => onClick(category.id)}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CategoryCarousel;
