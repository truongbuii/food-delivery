"use client";

import {
  CategoryItem,
  HorizontalCard,
  SearchAndFilter,
  VerticalCard,
} from "@/components/molecule";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { IMAGES_CONST } from "@/configs";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const categories: {
  type: "category" | "filter";
  image: string;
  title: string;
}[] = [
  {
    type: "category",
    image: IMAGES_CONST.common.defaultAvatar.src,
    title: "Burger",
  },
  {
    type: "category",
    image: IMAGES_CONST.common.defaultAvatar.src,
    title: "Burger 2",
  },
  {
    type: "category",
    image: IMAGES_CONST.common.defaultAvatar.src,
    title: "Burger 3",
  },
  {
    type: "category",
    image: IMAGES_CONST.common.defaultAvatar.src,
    title: "Burger 5",
  },
  {
    type: "category",
    image: IMAGES_CONST.common.defaultAvatar.src,
    title: "Burger 6",
  },
  {
    type: "category",
    image: IMAGES_CONST.common.defaultAvatar.src,
    title: "Burger 3",
  },
];

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  return (
    <div className="flex flex-col">
      <SearchAndFilter />
      {/* Category */}
      <div className="flex gap-4 overflow-x-auto mt-4">
        <Carousel className="w-full max-w-max">
          <CarouselContent>
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/5">
                <div className="p-1">
                  <CategoryItem
                    key={categories[index].title}
                    type={categories[index].type}
                    image={categories[index].image}
                    title={categories[index].title}
                    isSelected={selectedCategory === categories[index].title}
                    onClick={() => setSelectedCategory(categories[index].title)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="basis-5/5 pr-4">
                    <div className="pb-8">
                      <HorizontalCard type="item" />
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
            <VerticalCard type="item" />
            <VerticalCard type="item" />
            <VerticalCard type="restaurant" />
            <VerticalCard type="restaurant" />
            <VerticalCard type="item" />
            <VerticalCard type="item" />
            <VerticalCard type="restaurant" />
            <VerticalCard type="restaurant" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
