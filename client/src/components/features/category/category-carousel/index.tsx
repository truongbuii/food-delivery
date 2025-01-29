"use client";

import { CategoryItem } from "@/components/molecule";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ICategory } from "@/interfaces";
import { useGetCategories } from "@/queries";
import { useState } from "react";

const CategoryCarousel = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { data: categories } = useGetCategories();

  return (
    <Carousel
      className="w-full max-w-max"
      opts={{ align: "start", dragFree: true }}
    >
      <CarouselContent>
        {categories?.data?.map((category: ICategory) => (
          <CarouselItem key={category.id} className="basis-5/5 pl-4">
            <div className="px-[2px]">
              <CategoryItem
                key={category.id}
                type="category"
                image={category.imageUrl}
                title={category.name}
                isSelected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CategoryCarousel;
