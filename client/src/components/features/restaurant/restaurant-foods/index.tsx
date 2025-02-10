"use client";

import { VerticalCard } from "@/components/molecule";
import { ICategory } from "@/interfaces";
import { useGetFoodsByParams } from "@/queries";
import { FC, useState } from "react";

const RestaurantFoods: FC<{
  categories: ICategory[];
  restaurantSlug: string;
}> = ({ categories, restaurantSlug }) => {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const { data: foods } = useGetFoodsByParams(categoryId, restaurantSlug);

  const handleClick = (id: number) => {
    setCategoryId(id);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1">
        <button
          className={`w-auto h-8 rounded-2xl border border-lightGray ${
            categoryId === null ? "bg-primary border-primary text-white" : ""
          }`}
          onClick={() => setCategoryId(null)}
        >
          <span className="flex items-center w-full h-full font-medium text-sm px-4">
            All
          </span>
        </button>
        {categories.map((category) => (
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
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {foods?.data?.map((food) => (
          <VerticalCard key={food.id} type="food" item={food} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantFoods;
